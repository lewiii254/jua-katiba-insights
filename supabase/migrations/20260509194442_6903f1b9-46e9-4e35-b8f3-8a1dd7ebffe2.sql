
-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  xp integer not null default 0,
  streak integer not null default 0,
  last_active_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Roles
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select using (auth.uid() = user_id);

create policy "Admins can manage roles"
  on public.user_roles for all using (public.has_role(auth.uid(), 'admin'));

-- Quiz attempts
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_slug text not null,
  score integer not null,
  total integer not null,
  xp_earned integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Users view their own attempts"
  on public.quiz_attempts for select using (auth.uid() = user_id);

create policy "Users insert their own attempts"
  on public.quiz_attempts for insert with check (auth.uid() = user_id);

-- Lesson progress
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  progress integer not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_slug)
);

alter table public.lesson_progress enable row level security;

create policy "Users view their own progress"
  on public.lesson_progress for select using (auth.uid() = user_id);

create policy "Users insert their own progress"
  on public.lesson_progress for insert with check (auth.uid() = user_id);

create policy "Users update their own progress"
  on public.lesson_progress for update using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
