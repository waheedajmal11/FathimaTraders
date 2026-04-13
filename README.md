# Price Tracker (Provision Store)

Simple, clean, mobile-friendly price tracking web app built with React + Vite + Supabase + Tailwind CSS.

## Features

- Add item
- Update item
- Delete item with confirmation
- Search items by name (case-insensitive)
- View all items
- Loading and empty states
- Success/error messages
- Recently updated row highlight
- Currency formatting

## Tech Stack

- React (Vite)
- Tailwind CSS
- Supabase
- JavaScript

## Project Structure

```text
ProvisionStore/
  .env
  .env.example
  .gitignore
  index.html
  package.json
  postcss.config.js
  README.md
  supabase.sql
  tailwind.config.js
  vite.config.js
  src/
    App.jsx
    index.css
    main.jsx
    components/
      ItemForm.jsx
      ItemList.jsx
      SearchBar.jsx
    lib/
      supabase.js
```

## Environment Setup

Create `.env` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Important:

- Use `VITE_` prefix
- Do not hardcode keys in source files
- Restart dev server after editing `.env`

## Supabase SQL

Run this SQL in Supabase SQL editor:

```sql
create table items (
  id bigint generated always as identity primary key,
  name text not null,
  piece_price numeric not null,
  carton_price numeric not null,
  updated_at timestamp with time zone default now()
);
```

## Installation Commands

```bash
npm install
npm run dev
```

## Tailwind Setup Included

Tailwind is configured via:

- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css` with Tailwind directives

## Run Locally

1. Install dependencies:
   - `npm install`
2. Ensure `.env` exists with correct Supabase values.
3. Run dev server:
   - `npm run dev`
4. Open the local URL shown by Vite.

## Notes

- This app is only for price tracking.
- No authentication included.
- No inventory or billing features included.
