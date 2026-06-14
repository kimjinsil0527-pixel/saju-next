-- UNMYUNG subscription lifecycle and refund handling
-- Run once in Supabase Dashboard -> SQL Editor before deploying matching code.

begin;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'lemonsqueezy',
  external_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_email text,
  product_key text not null,
  variant_id text not null,
  status text not null,
  cancelled boolean not null default false,
  renews_at timestamptz,
  ends_at timestamptz,
  test_mode boolean not null default false,
  last_event_name text not null,
  provider_created_at timestamptz,
  provider_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, external_id)
);

create index if not exists idx_subscriptions_user_updated
  on public.subscriptions (user_id, updated_at desc);

create index if not exists idx_subscriptions_email
  on public.subscriptions (lower(customer_email));

create index if not exists idx_subscriptions_status
  on public.subscriptions (status, ends_at);

create table if not exists public.payment_refund_reviews (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  payment_id uuid references public.payments(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  payment_reference text,
  product_key text,
  refunded_amount integer not null default 0,
  status text not null check (status in ('auto_reversed', 'pending_review')),
  reason text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_refund_reviews_status_created
  on public.payment_refund_reviews (status, created_at desc);

alter table public.subscriptions enable row level security;
alter table public.payment_refund_reviews enable row level security;

drop policy if exists "service only" on public.subscriptions;
create policy "service only" on public.subscriptions
  for all using (false) with check (false);

drop policy if exists "service only" on public.payment_refund_reviews;
create policy "service only" on public.payment_refund_reviews
  for all using (false) with check (false);

create or replace function public.upsert_subscription_state(
  p_external_id text,
  p_user_id uuid,
  p_customer_email text,
  p_product_key text,
  p_variant_id text,
  p_status text,
  p_cancelled boolean,
  p_renews_at timestamptz,
  p_ends_at timestamptz,
  p_test_mode boolean,
  p_event_name text,
  p_provider_created_at timestamptz,
  p_provider_updated_at timestamptz
)
returns table (linked_user_id uuid, applied boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  if p_external_id is null
    or length(trim(p_external_id)) = 0
    or p_product_key is null
    or p_variant_id is null
    or p_status is null then
    raise exception 'INVALID_SUBSCRIPTION_STATE';
  end if;

  insert into public.subscriptions as target (
    provider,
    external_id,
    user_id,
    customer_email,
    product_key,
    variant_id,
    status,
    cancelled,
    renews_at,
    ends_at,
    test_mode,
    last_event_name,
    provider_created_at,
    provider_updated_at,
    updated_at
  )
  values (
    'lemonsqueezy',
    p_external_id,
    p_user_id,
    p_customer_email,
    p_product_key,
    p_variant_id,
    p_status,
    p_cancelled,
    p_renews_at,
    p_ends_at,
    p_test_mode,
    p_event_name,
    p_provider_created_at,
    p_provider_updated_at,
    now()
  )
  on conflict (provider, external_id)
  do update set
    user_id = coalesce(excluded.user_id, target.user_id),
    customer_email = coalesce(excluded.customer_email, target.customer_email),
    product_key = excluded.product_key,
    variant_id = excluded.variant_id,
    status = excluded.status,
    cancelled = excluded.cancelled,
    renews_at = excluded.renews_at,
    ends_at = excluded.ends_at,
    test_mode = excluded.test_mode,
    last_event_name = excluded.last_event_name,
    provider_created_at = coalesce(
      excluded.provider_created_at,
      target.provider_created_at
    ),
    provider_updated_at = coalesce(
      excluded.provider_updated_at,
      target.provider_updated_at
    ),
    updated_at = now()
  where target.provider_updated_at is null
    or (
      excluded.provider_updated_at is not null
      and excluded.provider_updated_at >= target.provider_updated_at
    )
  returning target.user_id into v_user_id;

  if found then
    return query select v_user_id, true;
    return;
  end if;

  select subscription.user_id
  into v_user_id
  from public.subscriptions as subscription
  where subscription.provider = 'lemonsqueezy'
    and subscription.external_id = p_external_id;

  return query select v_user_id, false;
end;
$$;

create or replace function public.reverse_payment_cookies(
  p_user_id uuid,
  p_reference text,
  p_reason text,
  p_metadata jsonb default '{}'::jsonb
)
returns table (balance integer, applied boolean, review_required boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_balance integer;
  v_grant public.cookie_transactions%rowtype;
  v_reversal_key text;
begin
  if p_user_id is null
    or p_reference is null
    or length(trim(p_reference)) = 0 then
    raise exception 'INVALID_PAYMENT_REVERSAL';
  end if;

  select cookie_balance
  into v_balance
  from public.profiles
  where id = p_user_id
  for update;

  if v_balance is null then
    raise exception 'PROFILE_NOT_FOUND';
  end if;

  select grant_row.*
  into v_grant
  from public.cookie_transactions as grant_row
  where grant_row.user_id = p_user_id
    and grant_row.reference = p_reference
    and grant_row.amount > 0
    and grant_row.kind in ('subscription_payment', 'cookie_pack_purchase')
  order by grant_row.created_at desc
  limit 1;

  if v_grant.id is null then
    return query select v_balance, false, true;
    return;
  end if;

  v_reversal_key := 'refund-grant:' || v_grant.id::text;

  if exists (
    select 1
    from public.cookie_transactions
    where idempotency_key = v_reversal_key
  ) then
    return query select v_balance, false, false;
    return;
  end if;

  if v_balance < v_grant.amount then
    return query select v_balance, false, true;
    return;
  end if;

  v_balance := v_balance - v_grant.amount;

  update public.profiles
  set cookie_balance = v_balance
  where id = p_user_id;

  insert into public.cookie_transactions (
    user_id,
    amount,
    balance_after,
    kind,
    idempotency_key,
    reference,
    metadata
  )
  values (
    p_user_id,
    -v_grant.amount,
    v_balance,
    'payment_refund',
    v_reversal_key,
    p_reference,
    coalesce(p_metadata, '{}'::jsonb) || jsonb_build_object(
      'reason', p_reason,
      'original_transaction_id', v_grant.id
    )
  );

  return query select v_balance, true, false;
end;
$$;

revoke all on function public.reverse_payment_cookies(uuid, text, text, jsonb)
  from public, anon, authenticated;
revoke all on function public.upsert_subscription_state(
  text, uuid, text, text, text, text, boolean,
  timestamptz, timestamptz, boolean, text, timestamptz, timestamptz
)
  from public, anon, authenticated;

grant execute on function public.reverse_payment_cookies(uuid, text, text, jsonb)
  to service_role;
grant execute on function public.upsert_subscription_state(
  text, uuid, text, text, text, text, boolean,
  timestamptz, timestamptz, boolean, text, timestamptz, timestamptz
)
  to service_role;

commit;
