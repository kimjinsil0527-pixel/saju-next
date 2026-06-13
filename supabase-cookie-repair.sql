-- UNMYUNG cookie ledger repair
-- Run once in Supabase Dashboard -> SQL Editor before deploying the matching code.
--
-- This migration:
-- 1. Changes old cookie grant keys to use Lemon Squeezy's stable payment reference.
-- 2. Finds the single deleted test payment grant and subtracts its 35 test cookies.
-- 3. Keeps a compensating ledger entry instead of deleting financial history.

begin;

update public.cookie_transactions as ledger
set idempotency_key =
  'payment-ref:' || ledger.reference || ':monthly-cookies'
where ledger.kind = 'subscription_payment'
  and ledger.reference is not null
  and ledger.idempotency_key like 'payment:%:monthly-cookies'
  and not exists (
    select 1
    from public.cookie_transactions as existing
    where existing.id <> ledger.id
      and existing.idempotency_key =
        'payment-ref:' || ledger.reference || ':monthly-cookies'
  );

do $$
declare
  v_orphan public.cookie_transactions%rowtype;
  v_orphan_count integer;
  v_balance integer;
begin
  select count(*)
  into v_orphan_count
  from public.cookie_transactions as grant_row
  where grant_row.kind = 'subscription_payment'
    and grant_row.amount = 35
    and grant_row.reference is not null
    and not exists (
      select 1
      from public.payments as payment
      where payment.order_id = grant_row.reference
    )
    and not exists (
      select 1
      from public.cookie_transactions as cleanup
      where cleanup.idempotency_key = 'cleanup-orphan:' || grant_row.id::text
    );

  if v_orphan_count = 0 then
    raise notice 'No unrepaired orphan test payment grant was found.';
    return;
  end if;

  if v_orphan_count <> 1 then
    raise exception
      'Expected exactly one orphan test payment grant, found %. No balance was changed.',
      v_orphan_count;
  end if;

  select grant_row.*
  into v_orphan
  from public.cookie_transactions as grant_row
  where grant_row.kind = 'subscription_payment'
    and grant_row.amount = 35
    and grant_row.reference is not null
    and not exists (
      select 1
      from public.payments as payment
      where payment.order_id = grant_row.reference
    )
    and not exists (
      select 1
      from public.cookie_transactions as cleanup
      where cleanup.idempotency_key = 'cleanup-orphan:' || grant_row.id::text
    )
  for update;

  select profile.cookie_balance
  into v_balance
  from public.profiles as profile
  where profile.id = v_orphan.user_id
  for update;

  if v_balance is null then
    raise exception 'The affected user profile was not found. No balance was changed.';
  end if;

  if v_balance < 35 then
    raise exception
      'Cookie balance is %, so the 35-cookie repair was not applied.',
      v_balance;
  end if;

  update public.profiles
  set cookie_balance = v_balance - 35
  where id = v_orphan.user_id;

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
    v_orphan.user_id,
    -35,
    v_balance - 35,
    'test_payment_cleanup',
    'cleanup-orphan:' || v_orphan.id::text,
    v_orphan.reference,
    jsonb_build_object(
      'reason', 'Removed cookies from one manually deleted Lemon Squeezy test payment',
      'original_transaction_id', v_orphan.id
    )
  );
end
$$;

commit;
