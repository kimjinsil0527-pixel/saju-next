-- Run once in Supabase SQL Editor before deploying the account-payment link code.
alter table public.payments
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists idx_payments_user_id
  on public.payments (user_id);

create index if not exists idx_payments_entitlement
  on public.payments (user_id, plan, status);
