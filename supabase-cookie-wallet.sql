-- UNMYUNG cookie wallet migration
-- Run once in Supabase Dashboard -> SQL Editor.

alter table public.profiles
  add column if not exists cookie_balance integer not null default 0;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_cookie_balance_nonnegative'
  ) then
    alter table public.profiles
      add constraint profiles_cookie_balance_nonnegative
      check (cookie_balance >= 0);
  end if;
end
$$;

create table if not exists public.cookie_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null check (amount <> 0),
  balance_after integer not null check (balance_after >= 0),
  kind text not null,
  idempotency_key text not null unique,
  reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_cookie_transactions_user_created
  on public.cookie_transactions (user_id, created_at desc);

create table if not exists public.reading_unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_key text not null,
  reading_key text not null,
  cookie_cost integer not null check (cookie_cost > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_key, reading_key)
);

create index if not exists idx_reading_unlocks_user_created
  on public.reading_unlocks (user_id, created_at desc);

alter table public.cookie_transactions enable row level security;
alter table public.reading_unlocks enable row level security;

drop policy if exists "own profile" on public.profiles;
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "service only" on public.cookie_transactions;
create policy "service only" on public.cookie_transactions
  for all using (false) with check (false);

drop policy if exists "service only" on public.reading_unlocks;
create policy "service only" on public.reading_unlocks
  for all using (false) with check (false);

create or replace function public.grant_cookies(
  p_user_id uuid,
  p_amount integer,
  p_idempotency_key text,
  p_kind text,
  p_reference text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns table (balance integer, applied boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_balance integer;
begin
  if p_user_id is null or p_amount <= 0 then
    raise exception 'INVALID_COOKIE_GRANT';
  end if;

  if p_idempotency_key is null or length(trim(p_idempotency_key)) = 0 then
    raise exception 'INVALID_IDEMPOTENCY_KEY';
  end if;

  insert into public.profiles (id)
  values (p_user_id)
  on conflict (id) do nothing;

  select cookie_balance
  into v_balance
  from public.profiles
  where id = p_user_id
  for update;

  if exists (
    select 1
    from public.cookie_transactions
    where idempotency_key = p_idempotency_key
  ) then
    return query select v_balance, false;
    return;
  end if;

  v_balance := v_balance + p_amount;

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
    p_amount,
    v_balance,
    p_kind,
    p_idempotency_key,
    p_reference,
    coalesce(p_metadata, '{}'::jsonb)
  );

  return query select v_balance, true;
end;
$$;

create or replace function public.consume_reading_cookies(
  p_user_id uuid,
  p_product_key text,
  p_reading_key text,
  p_cost integer
)
returns table (balance integer, unlocked boolean, charged boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_balance integer;
  v_unlock_id uuid;
begin
  if p_user_id is null or p_cost <= 0 then
    raise exception 'INVALID_COOKIE_CHARGE';
  end if;

  if p_product_key is null or length(trim(p_product_key)) = 0
    or p_reading_key is null or length(trim(p_reading_key)) = 0 then
    raise exception 'INVALID_READING_KEY';
  end if;

  insert into public.profiles (id)
  values (p_user_id)
  on conflict (id) do nothing;

  select cookie_balance
  into v_balance
  from public.profiles
  where id = p_user_id
  for update;

  select id
  into v_unlock_id
  from public.reading_unlocks
  where user_id = p_user_id
    and product_key = p_product_key
    and reading_key = p_reading_key;

  if v_unlock_id is not null then
    return query select v_balance, true, false;
    return;
  end if;

  if v_balance < p_cost then
    raise exception 'INSUFFICIENT_COOKIES';
  end if;

  v_balance := v_balance - p_cost;

  update public.profiles
  set cookie_balance = v_balance
  where id = p_user_id;

  insert into public.reading_unlocks (
    user_id,
    product_key,
    reading_key,
    cookie_cost
  )
  values (
    p_user_id,
    p_product_key,
    p_reading_key,
    p_cost
  );

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
    -p_cost,
    v_balance,
    'reading_unlock',
    'reading:' || p_user_id::text || ':' || p_product_key || ':' || p_reading_key,
    p_reading_key,
    jsonb_build_object('product_key', p_product_key)
  );

  return query select v_balance, true, true;
end;
$$;

revoke all on function public.grant_cookies(uuid, integer, text, text, text, jsonb)
  from public, anon, authenticated;
revoke all on function public.consume_reading_cookies(uuid, text, text, integer)
  from public, anon, authenticated;

grant execute on function public.grant_cookies(uuid, integer, text, text, text, jsonb)
  to service_role;
grant execute on function public.consume_reading_cookies(uuid, text, text, integer)
  to service_role;
