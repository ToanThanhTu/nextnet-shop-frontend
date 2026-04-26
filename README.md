# Next Net Shop Frontend

The Next.js 15 App Router frontend for Next Net Shop. React 19, TypeScript, Tailwind, MUI, Redux Toolkit + RTK Query.

> Project conventions and patterns live in [CLAUDE.md](CLAUDE.md). This file is the user-facing tour.

## Stack

- Next.js 15 (App Router, Turbopack dev server)
- React 19, TypeScript
- Tailwind CSS, Material UI, Radix UI primitives
- Redux Toolkit + RTK Query (`@reduxjs/toolkit`)
- React Hook Form
- Bun (package manager)

## Layout

```
next-frontend/
├── src/
│   ├── app/                         # App Router
│   │   ├── layout.tsx               # root layout (HTML, body, StoreProvider)
│   │   ├── StoreProvider.tsx        # Redux Provider wrapper
│   │   ├── globals.css
│   │   ├── fonts.ts
│   │   ├── (shop)/                  # route group: shop layout
│   │   │   ├── (browse)/            # nested group: browse layout
│   │   │   │   ├── page.tsx         # homepage
│   │   │   │   ├── (products)/      # group for product listing pages
│   │   │   │   ├── account/
│   │   │   │   ├── products/[product]/
│   │   │   │   ├── signin/, register/
│   │   │   │   └── ...static pages
│   │   │   └── checkout/
│   │   ├── components/              # all UI components live here
│   │   │   ├── ui/                  # primitives
│   │   │   ├── header/, footer/, menu/
│   │   │   ├── products/, cart/, checkout/, account/
│   │   │   ├── filter-and-sort/, search-bar/, pagination/
│   │   │   └── ...
│   │   └── data/                    # static data
│   ├── lib/
│   │   ├── store.ts                 # Redux store factory
│   │   ├── hooks.ts                 # typed Redux hooks
│   │   ├── utils.ts                 # cn(), helpers
│   │   └── features/                # Redux slices + RTK Query
│   │       ├── api/apiSlice.ts      # RTK Query, baseUrl /api
│   │       ├── auth/                # auth slice + actions
│   │       ├── cart/                # cart slice
│   │       ├── filter/              # filter slice
│   │       ├── order/, products/    # ...
│   ├── hooks/                       # cross-cutting React hooks
│   └── middleware.ts                # rewrites /api/* to the backend
├── public/                          # static assets
├── deployments/                     # production Dockerfile + entrypoint
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

There is no `src/components/`. Components live under `src/app/components/`.

## Quick start

```bash
bun install
bun dev               # Turbopack on http://localhost:3000
```

The dev server expects the backend reachable at the URL in `.env.local`. Default: `http://localhost:8080`.

## Environment

Two env files, both loaded by Next.js:

- `.env`: shared default (currently points at the prod backend URL, used as a fallback if `.env.local` is missing).
- `.env.local`: gitignored override for local dev. Default value: `API_BASE_URL=http://localhost:8080`.

The variable name is `API_BASE_URL` (no `NEXT_PUBLIC_` prefix). It's read on the server inside `src/middleware.ts` and never exposed to the browser. See [CLAUDE.md](CLAUDE.md) for how the request flow works.

## Routes

App Router structure under `src/app/(shop)/`. Route groups (parentheses) don't add URL segments.

### Browse routes (`(shop)/(browse)/`)

| Path | File |
|---|---|
| `/` | `page.tsx` |
| `/all-products` | `(products)/all-products/page.tsx` |
| `/all-deals` | `(products)/all-deals/page.tsx` |
| `/best-sellers` | `(products)/best-sellers/page.tsx` |
| `/electronics-under-25` | `(products)/electronics-under-25/page.tsx` |
| `/fitness-under-25` | `(products)/fitness-under-25/page.tsx` |
| `/kitchen-under-25` | `(products)/kitchen-under-25/page.tsx` |
| `/[category]` | `(products)/[category]/page.tsx` |
| `/[category]/[subcategory]` | `(products)/[category]/[subcategory]/page.tsx` |
| `/products/[product]` | `products/[product]/page.tsx` |
| `/account` | `account/page.tsx` |
| `/account/orders` | `account/orders/page.tsx` |
| `/signin` | `signin/page.tsx` |
| `/register` | `register/page.tsx` |
| `/contact-me`, `/gift-cards`, `/privacy-policy`, `/terms-and-conditions`, `/track-my-order` | static pages |

### Checkout (`(shop)/checkout/`)

| Path | File |
|---|---|
| `/checkout` | `page.tsx` |

## State management

Redux Toolkit. Store is created per-request via `makeStore()` in `src/lib/store.ts` and provided through `src/app/StoreProvider.tsx`.

| Slice | Purpose |
|---|---|
| `filter` | active filters and sort on listing pages |
| `cart` | client-side cart state |
| `auth` | logged-in user + JWT |
| `api` (RTK Query) | server cache for `/api/*` calls |

`apiSlice` (`src/lib/features/api/apiSlice.ts`) uses `baseUrl: "/api"` and is intercepted by `middleware.ts`, which rewrites to the backend. The browser never knows the backend URL.

## API integration

The frontend never calls the backend directly. Every `/api/*` request is rewritten by `src/middleware.ts`:

```
Browser  →  http://localhost:3000/api/categories
                           ↓ middleware strips /api, rewrites
Backend  ←  http://localhost:8080/categories
```

Effects:
- Same-origin from the browser. No CORS configuration needed on the client side.
- The backend URL is read from a server-side env var (`API_BASE_URL`); not bundled into the client.
- JWT is sent via `Authorization: Bearer <token>` header (set in `apiSlice.prepareHeaders`).

## Build and deploy

### Local production build

```bash
bun run build
bun start
```

`next.config.ts` sets `output: "standalone"` for the Docker image.

### Vercel

Default deployment target. Push to the configured branch triggers an automatic build. Set `API_BASE_URL` in Vercel project env to the production backend URL (`https://nextnetshop-backend.fly.dev`).

### Docker (alternative)

`deployments/Dockerfile` produces a standalone image:

```bash
docker build -f deployments/Dockerfile -t nextnet-frontend .
docker run -p 3000:3000 -e API_BASE_URL=... nextnet-frontend
```

Vercel is the default; the Dockerfile is for self-hosted deploy.

## Troubleshooting

- **`/api/...` returns 404**: verify `API_BASE_URL` is set in `.env.local` and the backend is up. The middleware needs the env var at request time.
- **Hydration errors**: usually mismatched server/client output in a layout or page. Check for `Date.now()`, `Math.random()`, or browser-only APIs in Server Components.
- **`Module not found` after switching submodule branches**: `rm -rf node_modules .next && bun install`.
- **MUI + Tailwind collisions**: keep MUI for complex components (carousels, dialogs); use Tailwind for layout. The `cn()` helper in `src/lib/utils.ts` merges Tailwind classes.

## Scripts

```bash
bun dev               # Turbopack dev server
bun build             # production build
bun start             # serve production build
bun lint              # ESLint
npx tsc --noEmit      # type check
```
