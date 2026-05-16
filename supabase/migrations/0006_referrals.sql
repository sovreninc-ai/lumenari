-- ====================================================================
-- Lumenari — referrals (0006_referrals.sql)
--
-- Adds a per-user referral code to `purchases` and a `referrals` table
-- that links a referrer's purchase to a referred purchase. After 3
-- credited referrals we unlock a free kit (Stripe coupon integration is
-- TODO — for now we write a `purchase_credits` row the operator can
-- redeem manually or via a future workflow).
-- ====================================================================

-- 1. Per-purchase referral code (used as the share URL ?ref= parameter).
alter table public.purchases
  add column if not exists referral_code text;

create unique index if not exists purchases_referral_code_idx
  on public.purchases(referral_code)
  where referral_code is not null;

-- 2. Referrals: one row per referred purchase.
create table if not exists public.referrals (
  id                    uuid primary key default gen_random_uuid(),
  referrer_purchase_id  uuid not null references public.purchases(id) on delete cascade,
  referred_purchase_id  uuid not null references public.purchases(id) on delete cascade unique,
  credited              boolean not null default false,
  created_at            timestamptz not null default now()
);

create index if not exists referrals_referrer_idx
  on public.referrals(referrer_purchase_id);

create index if not exists referrals_uncredited_idx
  on public.referrals(referrer_purchase_id)
  where credited = false;

-- 3. Purchase credits — unlockable free-kit rewards.
-- Stripe coupon integration is TODO: when implemented, the redemption
-- side hits Stripe Coupons API; for now this is a manual-redemption row.
create table if not exists public.purchase_credits (
  id            uuid primary key default gen_random_uuid(),
  purchase_id   uuid not null references public.purchases(id) on delete cascade,
  reason        text not null,             -- e.g. "referral_3_paid"
  kit_slug      text,                      -- optional pre-chosen kit
  redeemed_at   timestamptz,
  stripe_coupon text,                      -- populated after the TODO above
  created_at    timestamptz not null default now()
);

create index if not exists purchase_credits_purchase_idx
  on public.purchase_credits(purchase_id, redeemed_at);

-- 4. RLS — same model as the rest of the storefront. Service-role only;
-- a Next.js server route validates the caller's email+token before
-- returning data scoped to that purchase.
alter table public.referrals       enable row level security;
alter table public.purchase_credits enable row level security;

drop policy if exists "referrals service only" on public.referrals;
create policy "referrals service only"
  on public.referrals for all
  using (false)
  with check (false);

drop policy if exists "purchase_credits service only" on public.purchase_credits;
create policy "purchase_credits service only"
  on public.purchase_credits for all
  using (false)
  with check (false);

-- 5. Helper: pretty short referral codes. 8 chars, alphanumeric.
create or replace function public.gen_referral_code(len int default 8)
returns text language sql as $$
  select upper(substring(
    translate(encode(gen_random_bytes(16), 'base64'), '+/=', ''),
    1, len
  ));
$$;

-- 6. Trigger: when a new purchase row is inserted, assign a referral_code
-- if one wasn't provided. Idempotent via WHERE referral_code is null.
create or replace function public.assign_referral_code()
returns trigger language plpgsql as $$
declare
  attempts int := 0;
  candidate text;
begin
  if new.referral_code is not null then
    return new;
  end if;
  loop
    candidate := public.gen_referral_code(8);
    if not exists (
      select 1 from public.purchases where referral_code = candidate
    ) then
      new.referral_code := candidate;
      return new;
    end if;
    attempts := attempts + 1;
    if attempts > 5 then
      -- Give up on uniqueness — extremely unlikely. Caller can update later.
      new.referral_code := candidate || substring(new.id::text, 1, 4);
      return new;
    end if;
  end loop;
end;
$$;

drop trigger if exists purchases_assign_referral_code on public.purchases;
create trigger purchases_assign_referral_code
  before insert on public.purchases
  for each row execute function public.assign_referral_code();
