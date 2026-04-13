create table if not exists public.items (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null default 'Uncategorized',
  piece_price numeric not null check (piece_price > 0),
  case_price numeric not null check (case_price > 0),
  updated_at timestamp with time zone not null default now()
);

-- Migration: add category to existing table (safe to re-run)
alter table public.items add column if not exists category text not null default 'Uncategorized';

alter table public.items enable row level security;

drop policy if exists "Allow public read access to items" on public.items;
create policy "Allow public read access to items"
on public.items
for select
to anon, authenticated
using (true);

drop policy if exists "Allow public insert access to items" on public.items;
create policy "Allow public insert access to items"
on public.items
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow public update access to items" on public.items;
create policy "Allow public update access to items"
on public.items
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Allow public delete access to items" on public.items;
create policy "Allow public delete access to items"
on public.items
for delete
to anon, authenticated
using (true);

create or replace function public.set_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_items_updated_at on public.items;
create trigger trg_set_items_updated_at
before update on public.items
for each row
execute function public.set_items_updated_at();
