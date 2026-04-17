-- ============================================================
-- MINGYUN Supabase 초기 설정 SQL
-- Supabase → SQL Editor → 아래 전체 복사 → Run
-- ============================================================

-- 1. 방문자 페이지뷰 테이블
create table if not exists page_views (
  id          uuid primary key default gen_random_uuid(),
  path        text not null,
  referrer    text,
  user_agent  text,
  created_at  timestamptz default now()
);

-- 방문자 조회 최적화 인덱스
create index if not exists idx_page_views_created_at on page_views (created_at desc);
create index if not exists idx_page_views_path on page_views (path);

-- 2. 결제 내역 테이블
create table if not exists payments (
  id              uuid primary key default gen_random_uuid(),
  order_id        text unique not null,
  payment_key     text,
  amount          integer not null,
  plan            text not null,
  status          text not null default 'pending',  -- pending / done / failed / canceled
  customer_name   text,
  customer_email  text,
  created_at      timestamptz default now()
);

create index if not exists idx_payments_status     on payments (status);
create index if not exists idx_payments_created_at on payments (created_at desc);
create index if not exists idx_payments_order_id   on payments (order_id);

-- 3. 회원 테이블 (Supabase Auth 연동용)
create table if not exists profiles (
  id          uuid primary key references auth.users on delete cascade,
  email       text,
  plan        text default 'free',       -- free / premium / vip
  plan_expires_at timestamptz,
  created_at  timestamptz default now()
);

-- 4. Row Level Security (보안 설정)
alter table page_views enable row level security;
alter table payments   enable row level security;
alter table profiles   enable row level security;

-- page_views: service role만 insert/select 가능 (일반 유저 차단)
create policy "service only" on page_views
  for all using (false);

-- payments: service role만 접근
create policy "service only" on payments
  for all using (false);

-- profiles: 본인 데이터만 접근
create policy "own profile" on profiles
  for all using (auth.uid() = id);

-- ============================================================
-- 완료! 이제 .env.local 키 3개만 채우면 연동 끝.
-- ============================================================
