# Next Net Shop Frontend

The Next.js 15 App Router frontend for Next Net Shop. React 19, TypeScript, Tailwind, MUI, Redux Toolkit + RTK Query. Domain-driven layout under `src/modules/`.

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
│   ├── app/                         # App Router only: routes, layouts, page-level UI
│   │   ├── layout.tsx               # root layout (HTML, body, StoreProvider)
│   │   ├── error.tsx                # root error boundary ('use client')
│   │   ├── StoreProvider.tsx        # Redux Provider + AppHydrator + listener registration
│   │   ├── listenerMiddleware.ts    # RTK listener middleware instance + typed startAppListening
│   │   ├── globals.css, fonts.ts
│   │   ├── (shop)/                  # route group: shop layout
│   │   │   ├── (browse)/            # browse layout (Header + Footer)
│   │   │   │   ├── page.tsx         # homepage
│   │   │   │   ├── (products)/      # filterable product listing pages
│   │   │   │   ├── account/, products/[product]/
│   │   │   │   ├── signin/, register/
│   │   │   │   └── ...static pages
│   │   │   └── checkout/
│   │   ├── components/              # all UI components
│   │   │   ├── ui/                  # primitives (shadcn-style)
│   │   │   ├── header/, footer/, menu/
│   │   │   ├── products/, cart/, checkout/, account/, order/
│   │   │   ├── filter-and-sort/, search-bar/, pagination/
│   │   │   ├── app-hydrator.tsx     # mounts under StoreProvider; restores localStorage on first render
│   │   │   └── ...
│   │   ├── data/                    # static UI data (carousel, highlights)
│   │   └── types.ts                 # UI-only types (Highlight, MenuItem, DiscoverCard)
│   ├── modules/                     # DDD: one folder per bounded context
│   │   ├── products/{entities/, products.api.ts, index.ts}
│   │   ├── categories/{entities/, categories.api.ts, index.ts}
│   │   ├── users/{entities/, users.api.ts, auth.slice.ts, auth.thunks.ts, index.ts}
│   │   ├── cart/{entities/, cart.api.ts, cart.slice.ts, index.ts}
│   │   └── orders/{entities/, orders.api.ts, index.ts}
│   ├── lib/
│   │   ├── api-slice.ts             # bare RTK Query base (modules inject endpoints)
│   │   ├── store.ts, hooks.ts, utils.ts
│   │   ├── storageListeners.ts      # localStorage side effects via listener middleware
│   │   └── features/filter/         # UI state (not a domain), stays here
│   ├── hooks/                       # cross-cutting React hooks
│   │   ├── useMediaQuery.ts
│   │   └── useRenderQuery.tsx       # RTK Query loading/success/error renderer
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

## Domains (`src/modules/`)

Each module owns a bounded context. The Redux store imports the slice reducers; components import entities and RTK Query hooks via the module barrel (`@/modules/<domain>`).

| Module | Entities | API endpoints | Slice |
|---|---|---|---|
| `products` | `Product` | get/list/top-deals/sales/bestsellers/search/recommendations/personal-recommendations/by-id/by-slug | none |
| `categories` | `Category`, `SubCategory` | `getCategories` | none |
| `users` | `User`, `UserDTO`, `UserRegistration`, `Auth` | `getUserDetails` | `auth` (login/register thunks + state) |
| `cart` | `CartItem`, `CartItemDTO`, `CartState` | `fetchUserCart`, `add/remove/update/clear/sync` | `cart` (local + extra reducers reacting to API) |
| `orders` | `Order`, `OrderDTO`, `OrderItem`, `OrderItemDTO`, `PaymentDetails` | `getOrders`, `placeOrder` | none |

`filter` lives at `src/lib/features/filter/` because it's UI state (sort/limit/page), not a domain.

## Routes

App Router structure under `src/app/(shop)/`. Route groups (parentheses) don't add URL segments.

### Browse routes (`(shop)/(browse)/`)

| Path | File | Component type |
|---|---|---|
| `/` | `page.tsx` | Server |
| `/[category]` | `(products)/[category]/page.tsx` | async Server |
| `/[category]/[subcategory]` | `(products)/[category]/[subcategory]/page.tsx` | async Server |
| `/products/[product]` | `products/[product]/page.tsx` | async Server |
| `/all-products`, `/all-deals`, `/best-sellers` | `(products)/<name>/page.tsx` | Client |
| `/electronics-under-25`, `/fitness-under-25`, `/kitchen-under-25` | `(products)/<name>/page.tsx` | Client |
| `/account`, `/account/orders` | `account/page.tsx`, `account/orders/page.tsx` | Client |
| `/signin`, `/register` | Client |
| `/contact-me`, `/gift-cards`, `/privacy-policy`, `/terms-and-conditions`, `/track-my-order` | static pages |

### Checkout (`(shop)/checkout/`)

| Path | File |
|---|---|
| `/checkout` | `page.tsx` |

## State management

Redux Toolkit. Store is created per-request via `makeStore()` in `src/lib/store.ts` and provided through `src/app/StoreProvider.tsx`.

| Slice | Module | Purpose |
|---|---|---|
| `filter` | `lib/features/filter` | active filters and sort on listing pages |
| `cart` | `modules/cart` | client-side cart state (pure reducer; localStorage written by listener) |
| `auth` | `modules/users` | logged-in user + JWT (pure reducer; localStorage written by listener) |
| `api` | `lib/api-slice` | RTK Query server cache; per-domain endpoints injected from `modules/*/<domain>.api.ts` |

Persistence is handled by `src/lib/storageListeners.ts` (registers listeners on `app/listenerMiddleware.ts` for cart and auth actions). On first client render, `app/components/app-hydrator.tsx` reads localStorage and dispatches `setCartLocal` / `setCredentials`.

## API integration

The frontend never calls the backend directly. Every `/api/*` request is rewritten by `src/middleware.ts`:

```
Browser  →  http://localhost:3000/api/products/all
                           ↓ middleware strips /api, rewrites
Backend  ←  http://localhost:8080/products/all
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

## CI

GitHub Actions runs [.github/workflows/ci.yml](.github/workflows/ci.yml) on every push to `main` and every PR targeting `main`. Three steps, each surfaced separately in the GitHub UI:

| Step | Command | Catches |
|---|---|---|
| Lint | `bun lint` | ESLint + `eslint-config-next` rules (e.g. `no-html-link-for-pages`) |
| Typecheck | `bunx tsc --noEmit` | type errors that `next build` doesn't surface on its own |
| Build | `bun run build` | the same compile path Vercel uses, with a placeholder `API_BASE_URL` |

`bun install --frozen-lockfile` fails the run if `bun.lockb` is out of sync with `package.json`. Concurrency is keyed on `github.ref` so a fast follow-up push supersedes the in-flight run.

## Troubleshooting

- **`/api/...` returns 404**: verify `API_BASE_URL` is set in `.env.local` and the backend is up. The middleware needs the env var at request time.
- **`/api/...` returns 401**: the user isn't logged in (or the token isn't being sent). Check that `state.auth.token` is set; `apiSlice.prepareHeaders` reads from there.
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
