-- UNMYUNG durable API rate limits
-- Run once in Supabase Dashboard -> SQL Editor before deploying matching code.

begin;

create table if not exists public.api_rate_limits (
  scope text not null,
  subject_hash text not null,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (scope, subject_hash, window_start)
);

create index if not exists idx_api_rate_limits_updated
  on public.api_rate_limits (updated_at);

alter table public.api_rate_limits enable row level security;

drop policy if exists "service only" on public.api_rate_limits;
create policy "service only" on public.api_rate_limits
  for all using (false) with check (false);

create or replace function public.consume_api_rate_limit(
  p_scope text,
  p_subject_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns table (
  allowed boolean,
  remaining integer,
  retry_after integer
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_window_start timestamptz;
  v_count integer;
  v_retry_after integer;
begin
  if p_scope is null
    or length(trim(p_scope)) = 0
    or p_subject_hash is null
    or length(trim(p_subject_hash)) = 0
    or p_limit < 1
    or p_limit > 10000
    or p_window_seconds < 1
    or p_window_seconds > 86400 then
    raise exception 'INVALID_RATE_LIMIT_CONFIGURATION';
  end if;

  v_window_start := to_timestamp(
    floor(extract(epoch from v_now) / p_window_seconds) * p_window_seconds
  );

  insert into public.api_rate_limits as rate_limit (
    scope,
    subject_hash,
    window_start,
    request_count,
    updated_at
  )
  values (
    p_scope,
    p_subject_hash,
    v_window_start,
    1,
    v_now
  )
  on conflict (scope, subject_hash, window_start)
  do update set
    request_count = rate_limit.request_count + 1,
    updated_at = v_now
  returning request_count into v_count;

  v_retry_after := greatest(
    1,
    ceil(extract(epoch from (
      v_window_start + make_interval(secs => p_window_seconds) - v_now
    )))::integer
  );

  if random() < 0.02 then
    delete from public.api_rate_limits
    where updated_at < v_now - interval '2 days';
  end if;

  return query select
    v_count <= p_limit,
    greatest(0, p_limit - v_count),
    case when v_count > p_limit then v_retry_after else 0 end;
end;
$$;

revoke all on function public.consume_api_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;

grant execute on function public.consume_api_rate_limit(text, text, integer, integer)
  to service_role;

commit;
