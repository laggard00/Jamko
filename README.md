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

### Installation

```bash
npm install
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
