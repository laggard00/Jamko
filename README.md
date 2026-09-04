# Jamko

A warranty receipt manager built with Vue 3 and Supabase. Store product receipts, track warranty expiry dates, and get at-a-glance status on what's active, expiring soon, or already expired.

## Features

- **Authentication** — email/password login and registration via Supabase Auth
- **Receipt management** — add, edit, and delete product receipts with photo uploads
- **Warranty tracking** — automatic status calculation: Active, Expiring Soon (< 90 days), or Expired
- **Category filtering** — filter receipts by category (Electronics, Car Parts, Furniture, Kitchen Appliances)
- **Status filtering** — filter by warranty status in real time
- **Icon picker** — assign a category icon to each receipt
- **Profile** — upload and display a profile avatar

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Build tool | Vite |
| Routing | Vue Router 4 |
| UI | Bootstrap 5 + custom CSS |
| Icons | Font Awesome 7 |
| Backend | Supabase (Auth, Database, Storage) |

## Project Structure

```
src/
├── views/
│   ├── LoginView.vue       — login & registration
│   ├── DashboardView.vue   — receipt grid with filtering
│   ├── AddReceiptView.vue  — add / edit receipt form
│   └── ProfileView.vue     — profile avatar management
├── components/
│   ├── NavBar.vue          — top navigation with logout
│   ├── ProductCard.vue     — receipt card with status dot
│   └── FilterBarRow.vue    — category and status filter bar
├── assets/icons/
│   └── Ikone.js            — icon name-to-URL map
├── enums/
│   └── enums.js            — Kategorija and Statusi enums
├── router/index.js         — routes with auth guard
├── supabase.js             — Supabase client
└── App.vue
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Supabase Setup

1. Create a `receipts` table:

```sql
create table receipts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  category text,
  purchase_date date,
  warranty_length int,
  store text,
  photo_url text,
  icon_url text,
  created_at timestamp default now()
);

alter table receipts enable row level security;

create policy "Users can manage own receipts" on receipts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

2. Create two storage buckets: `receipts` and `profile-pics`

3. Add an RLS policy on `profile-pics` so each user can only access their own file:
```sql
split_part(storage.filename(name), '.', 1) = auth.uid()::text
```

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

## Warranty Status Logic

Status is calculated from `purchase_date` + `warranty_length` (in years):

| Status | Condition |
|--------|-----------|
| **Active** | More than 90 days remaining |
| **Expiring Soon** | 0–90 days remaining |
| **Expired** | Past expiry date |

## Categories

- Elektronika (Electronics)
- Auto Dijelovi (Car Parts)
- Namještaj (Furniture)
- Kuhinjski Aparati (Kitchen Appliances)
