-- ARCADIA x MEMAAR DEGLA — Database blueprint v0.1
-- PostgreSQL / Supabase. NOT a production-ready migration.
-- IMPORTANT: RLS is enabled without permissive policies by design.
-- Do not connect real staff until policies, authentication flows, audit, backups,
-- approval workflows and end-to-end tests are implemented and reviewed.

create extension if not exists pgcrypto;

create table public.management_groups (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 created_at timestamptz not null default now()
);
create table public.companies (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.management_groups(id),
 name text not null,
 name_ar text,
 code text not null unique,
 logo_path text,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.sites (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.management_groups(id),
 name text not null,
 site_type text not null check (site_type in ('mall','compound','office','mixed','other')),
 city text,
 address text,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.site_companies (
 site_id uuid not null references public.sites(id) on delete cascade,
 company_id uuid not null references public.companies(id) on delete cascade,
 responsibility text not null check (responsibility in ('owner','operator','service_provider')),
 primary key (site_id,company_id,responsibility)
);
create table public.buildings (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 name text not null
);
create table public.floors (
 id uuid primary key default gen_random_uuid(),
 building_id uuid not null references public.buildings(id),
 name text not null,
 floor_number integer
);
create table public.zones (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 floor_id uuid references public.floors(id),
 name text not null,
 zone_type text,
 active boolean not null default true
);
create table public.departments (
 code text primary key,
 name_ar text not null
);
insert into public.departments(code,name_ar) values
 ('security','الأمن'),('cleaning','النظافة'),('maintenance','الصيانة');

-- Employee records are separate from application auth accounts.
create table public.employees (
 id uuid primary key default gen_random_uuid(),
 employer_company_id uuid not null references public.companies(id),
 employee_code text not null,
 full_name text not null,
 department_code text references public.departments(code),
 job_title text,
 status text not null default 'active' check (status in ('active','inactive','leave')),
 created_at timestamptz not null default now(),
 unique (employer_company_id,employee_code)
);
create table public.user_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 employee_id uuid unique references public.employees(id),
 display_name text not null,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.role_grants (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.user_profiles(user_id) on delete cascade,
 role_code text not null check (role_code in ('group_admin','company_manager','site_manager','supervisor','worker')),
 group_id uuid references public.management_groups(id),
 company_id uuid references public.companies(id),
 site_id uuid references public.sites(id),
 granted_by uuid references public.user_profiles(user_id),
 granted_at timestamptz not null default now(),
 revoked_at timestamptz,
 constraint role_grants_one_scope check
  ((group_id is not null)::int + (company_id is not null)::int + (site_id is not null)::int = 1)
);
create index idx_role_grants_user on public.role_grants(user_id) where revoked_at is null;
create table public.employee_site_assignments (
 id uuid primary key default gen_random_uuid(),
 employee_id uuid not null references public.employees(id),
 site_id uuid not null references public.sites(id),
 start_date date not null,
 end_date date,
 is_primary boolean not null default false,
 check(end_date is null or end_date >= start_date)
);
create index idx_staff_site on public.employee_site_assignments(site_id,employee_id);

create table public.shift_templates (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.management_groups(id),
 name text not null,
 start_local_time time not null,
 end_local_time time not null
);
create table public.shifts (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 department_code text not null references public.departments(code),
 starts_at timestamptz not null,
 ends_at timestamptz not null,
 required_staff integer not null default 1 check (required_staff >= 0),
 check (ends_at > starts_at)
);
create table public.shift_assignments (
 shift_id uuid not null references public.shifts(id) on delete cascade,
 employee_id uuid not null references public.employees(id),
 status text not null default 'planned' check (status in ('planned','confirmed','cancelled')),
 primary key(shift_id,employee_id)
);
create table public.attendance_events (
 id uuid primary key default gen_random_uuid(),
 shift_id uuid not null references public.shifts(id),
 employee_id uuid not null references public.employees(id),
 event_type text not null check(event_type in ('check_in','check_out','manual_adjustment')),
 occurred_at timestamptz not null default now(),
 source text not null check(source in ('mobile','web','supervisor','device')),
 recorded_by uuid references public.user_profiles(user_id),
 note text
);

create table public.task_templates (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.management_groups(id),
 department_code text not null references public.departments(code),
 title text not null,
 description text,
 recurrence_rule text,
 active boolean not null default true
);
create table public.tasks (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 zone_id uuid references public.zones(id),
 department_code text not null references public.departments(code),
 template_id uuid references public.task_templates(id),
 title text not null,
 description text,
 priority text not null default 'medium' check(priority in ('low','medium','high','critical')),
 status text not null default 'new' check(status in ('new','assigned','accepted','in_progress','blocked','review','completed','cancelled')),
 due_at timestamptz,
 created_by uuid references public.user_profiles(user_id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 closed_at timestamptz
);
create index idx_tasks_site_status_due on public.tasks(site_id,status,due_at);
create table public.task_assignments (
 task_id uuid not null references public.tasks(id) on delete cascade,
 employee_id uuid not null references public.employees(id),
 assigned_by uuid references public.user_profiles(user_id),
 assigned_at timestamptz not null default now(),
 primary key(task_id,employee_id)
);
create table public.task_events (
 id bigint generated always as identity primary key,
 task_id uuid not null references public.tasks(id) on delete cascade,
 actor_user_id uuid references public.user_profiles(user_id),
 event_type text not null,
 old_status text,
 new_status text,
 note text,
 occurred_at timestamptz not null default now()
);
create index idx_task_events_task on public.task_events(task_id,occurred_at desc);
create table public.task_checklist_items (
 id uuid primary key default gen_random_uuid(),
 task_id uuid not null references public.tasks(id) on delete cascade,
 label text not null,
 required boolean not null default true,
 completed_at timestamptz,
 completed_by uuid references public.user_profiles(user_id),
 display_order integer not null default 0
);
create table public.task_files (
 id uuid primary key default gen_random_uuid(),
 task_id uuid not null references public.tasks(id) on delete cascade,
 storage_path text not null,
 mime_type text not null,
 uploaded_by uuid references public.user_profiles(user_id),
 uploaded_at timestamptz not null default now()
);

create table public.security_posts (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 zone_id uuid references public.zones(id),
 name text not null
);
create table public.patrol_routes (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 name text not null
);
create table public.patrol_checkpoints (
 id uuid primary key default gen_random_uuid(),
 patrol_route_id uuid not null references public.patrol_routes(id) on delete cascade,
 zone_id uuid not null references public.zones(id),
 qr_token_hash text not null,
 sequence_number integer not null
);
create table public.patrol_runs (
 id uuid primary key default gen_random_uuid(),
 patrol_route_id uuid not null references public.patrol_routes(id),
 employee_id uuid not null references public.employees(id),
 started_at timestamptz,
 completed_at timestamptz
);
create table public.checkpoint_scans (
 id uuid primary key default gen_random_uuid(),
 patrol_run_id uuid not null references public.patrol_runs(id),
 checkpoint_id uuid not null references public.patrol_checkpoints(id),
 scanned_at timestamptz not null default now()
);
create table public.security_incidents (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 zone_id uuid references public.zones(id),
 reported_by uuid references public.user_profiles(user_id),
 title text not null,
 incident_type text not null,
 severity text not null check(severity in ('low','medium','high','critical')),
 details text,
 reported_at timestamptz not null default now()
);

create table public.cleaning_plans (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 name text not null,
 active boolean not null default true
);
create table public.cleaning_plan_items (
 id uuid primary key default gen_random_uuid(),
 plan_id uuid not null references public.cleaning_plans(id) on delete cascade,
 zone_id uuid not null references public.zones(id),
 title text not null,
 recurrence_rule text
);
create table public.cleaning_inspections (
 id uuid primary key default gen_random_uuid(),
 task_id uuid references public.tasks(id),
 site_id uuid not null references public.sites(id),
 inspector_user_id uuid references public.user_profiles(user_id),
 inspected_at timestamptz not null default now(),
 score numeric(5,2) check(score between 0 and 100),
 notes text
);

create table public.assets (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 zone_id uuid references public.zones(id),
 asset_code text not null,
 asset_type text not null,
 name text not null,
 status text not null default 'active',
 unique(site_id,asset_code)
);
create table public.maintenance_tickets (
 id uuid primary key default gen_random_uuid(),
 site_id uuid not null references public.sites(id),
 zone_id uuid references public.zones(id),
 asset_id uuid references public.assets(id),
 reported_by uuid references public.user_profiles(user_id),
 title text not null,
 description text,
 priority text not null default 'medium' check(priority in ('low','medium','high','critical')),
 reported_at timestamptz not null default now(),
 status text not null default 'open'
);
create table public.work_orders (
 id uuid primary key default gen_random_uuid(),
 ticket_id uuid references public.maintenance_tickets(id),
 task_id uuid unique references public.tasks(id),
 assigned_employee_id uuid references public.employees(id),
 diagnosis text,
 resolution text,
 estimated_cost numeric(12,2),
 actual_cost numeric(12,2),
 requires_permit boolean not null default false
);
create table public.inventory_items (
 id uuid primary key default gen_random_uuid(),
 group_id uuid not null references public.management_groups(id),
 sku text not null,
 item_name text not null,
 unit text not null default 'piece',
 unique(group_id,sku)
);
create table public.stock_movements (
 id uuid primary key default gen_random_uuid(),
 item_id uuid not null references public.inventory_items(id),
 site_id uuid not null references public.sites(id),
 work_order_id uuid references public.work_orders(id),
 qty_change numeric(12,3) not null check(qty_change <> 0),
 recorded_at timestamptz not null default now()
);
create table public.notifications (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.user_profiles(user_id),
 title text not null,
 body text,
 created_at timestamptz not null default now(),
 read_at timestamptz
);
create table public.audit_logs (
 id bigint generated always as identity primary key,
 user_id uuid references public.user_profiles(user_id),
 action text not null,
 entity_table text not null,
 entity_id uuid,
 details jsonb not null default '{}'::jsonb,
 logged_at timestamptz not null default now()
);

-- DENY BY DEFAULT until reviewed tenant/site/role policies are implemented.
-- Enabling RLS without policies blocks direct access for regular clients.
do $$
declare tab record;
begin
  for tab in
    select tablename from pg_tables where schemaname='public'
      and tablename not in ('departments')
  loop
    execute format('alter table public.%I enable row level security',tab.tablename);
  end loop;
end $$;
alter table public.departments enable row level security;
-- Department names are public taxonomy only; permit reading them.
create policy departments_read on public.departments for select to authenticated using(true);
-- NOTE: service_role and table owners bypass RLS. Do not expose service-role keys to browsers.
-- Required for production: restrictive tenant-scoped SELECT/INSERT/UPDATE/DELETE policies,
-- security-definer authorization helpers, server-side workflow transitions, audit triggers,
-- and tests for cross-company/site access (both positive and negative cases).
