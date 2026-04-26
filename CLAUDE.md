# Frontend conventions and gotchas

Stack-specific rules for `next-frontend`. Project-wide conventions live in `../CLAUDE.md`.

## Architecture: domain-driven modules

The top of `src/` is bounded contexts under `src/modules/<domain>/`, not technical layers. Five domains today:

```
src/modules/<domain>/
├── entities/
│   ├── <entity>.ts             # plain TypeScript types (rich entity classes can come later)
│   └── index.ts                # barrel
├── <domain>.api.ts             # RTK Query injected endpoints + auto-generated hooks
├── <domain>.slice.ts           # optional: Redux slice if the domain has client-side state
├── <domain>.thunks.ts          # optional: createAsyncThunk handlers (e.g. auth login/register)
└── index.ts                    # barrel: re-exports entities + api hooks + slice actions
```

Components import from the module barrel:

```ts
import { useGetProductsQuery, type Product } from "@/modules/products"
import { setCartLocal, type CartItem } from "@/modules/cart"
```

`src/app/components/` and `src/app/(shop)/...` consume these. The modules themselves don't import from `src/app/`.

The `filter` slice (sort/limit/page UI state) lives at `src/lib/features/filter/`, not in `modules/`. It's not a domain.

## Architecture: middleware-rewritten API

`src/middleware.ts` matches `/api/:path*`, strips the `/api` prefix, and rewrites to `process.env.API_BASE_URL`. Single source of truth for backend connectivity.

Implications:

- All client code (RTK Query, fetches in thunks) calls `/api/...`. Never hardcode `http://localhost:8080`.
- The backend hostname/port is server-side config. There is no `NEXT_PUBLIC_*` for it on purpose.
- Same-origin from the browser; no CORS work on the client side.
- For staging or alternate envs, set `API_BASE_URL` in the deployment environment. Don't bypass the middleware with direct fetches.

## RTK Query: bare base + injected endpoints

`src/lib/api-slice.ts` defines the bare `apiSlice` (baseUrl `/api`, `prepareHeaders` reads `auth.token`, no endpoints). Each module's `<domain>.api.ts` adds endpoints via `apiSlice.injectEndpoints({...})`. This keeps the base file clean and lets each domain own its surface.

Tag types are global (`["User", "Category", "Cart", "Orders"]`); add a new tag here when introducing a new domain that needs cache invalidation.

## Pure reducers + listener middleware for side effects

Reducers must be pure; localStorage writes live in `src/lib/storageListeners.ts`, registered against `src/app/listenerMiddleware.ts`. The listener reacts to specific actions:

| Trigger | Effect |
|---|---|
| `addCartItemLocal`, `removeCartItemLocal`, `setCartLocal`, `updateCartItemLocal` | write `NextNetShopCart` |
| `resetCartLocal` | clear `NextNetShopCart` |
| `loginUser.fulfilled` | write `signedInNextNetShopUser` |
| `logout` | clear `signedInNextNetShopUser` |

To add a new persisted slice, add a listener block in `storageListeners.ts`. Don't write localStorage from inside a reducer.

## App-level hydration

`src/app/components/app-hydrator.tsx` runs once on first client render, reads localStorage, and dispatches `setCartLocal` + `setCredentials`. Mounted inside `StoreProvider`. Don't duplicate this hydration in individual page components.

## Components live under `src/app/components/`

There is no top-level `src/components/`. Group by feature inside `src/app/components/`:

```
src/app/components/
├── ui/                  # primitives (buttons, inputs)
├── header/, footer/, menu/
├── products/            # product card, list, recommendations
├── cart/, checkout/, account/, order/
├── filter-and-sort/, search-bar/, pagination/
├── loading/, error/
├── app-hydrator.tsx     # mounted under StoreProvider
└── ...
```

A component file owns its types (in the same file) unless they're shared across multiple components.

## Server vs Client Components

App Router defaults: every component is a Server Component unless `'use client'` is at the top.

Add `'use client'` only when one of these applies:

- React hooks (`useState`, `useEffect`, `useContext`, custom hooks)
- Browser APIs (`window`, `localStorage`, etc.)
- Event handlers (`onClick`, `onChange`, ...)
- Context providers
- `next/dynamic` with `ssr: false`

Push `'use client'` down the tree. A page can be a Server Component that renders a small Client Component for interactivity. Don't mark an entire page client-only just to add a button.

`error.tsx` files at any segment **must** be Client Components. The root `app/error.tsx` follows this.

`metadata` exports only work in Server Components. If you need both metadata and interactivity, keep the Server parent and extract the interactive bit into a Client child.

Dynamic-route pages that only need to unwrap `params` should be async Server Components:

```tsx
// app/(shop)/(browse)/(products)/[category]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return <Products endpoint="all" category={category} />
}
```

## RTK Query result rendering

The `useRenderQuery.tsx` helper at `src/hooks/useRenderQuery.tsx` collapses the `if (isLoading)…else if (isSuccess)…else if (isError)…` ladder into one call:

```tsx
const result = useGetOrdersQuery(userId)
return renderQuery(result, {
  loading: <Loading />,
  error: (e) => <p>Failed: {String(e)}</p>,
  empty: <p>No orders yet.</p>,
  success: (orders) => <OrderList orders={orders} />,
})
```

Use it for new code; gradually adopt across older components that still hand-roll the ladder.

## Forms

React Hook Form + (where added) Zod for validation. Keep validation schemas alongside the form component (or in `<domain>/factories.ts` once the schemas grow). Server-side validation is owned by the backend; client-side is for UX only.

## Styling

- Tailwind utilities first. Use `cn()` from `src/lib/utils.ts` for conditional class merging.
- MUI for complex interactive components (dialogs, carousels, dropdowns) where Tailwind would be tedious to assemble.
- Don't use inline `style={{...}}` for layout. Reserve it for genuinely dynamic values (computed positions, server-driven colours).
- Mobile-first responsive breakpoints (`sm:`, `md:`, `lg:`).

## Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`). Always use the alias for module imports:

```ts
import { Header } from "@/app/components/header/header"   // good
import { useGetProductsQuery } from "@/modules/products"  // good
import { Header } from "../../components/header/header"   // bad
```

Single-level relative imports are fine for neighbouring files in the same folder.

## Image optimisation

`next.config.ts` declares `remotePatterns` for backend-served images. Adjust the host/port if the backend image URLs change.

`output: "standalone"` enables the optimised standalone build that the production Dockerfile (`deployments/Dockerfile`) consumes.

## App Router gotchas (Next.js 15)

- `params` and `searchParams` are `Promise<T>` and must be awaited:
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    // ...
  }
  ```
- Don't pass functions, Dates, or class instances from a Server Component to a Client Component as props. Serialise to ISO strings, plain objects, etc.
- `useEffect` is for side effects, not data fetching. Fetch in a Server Component, or use RTK Query in a Client Component.
- `loading.tsx` and `error.tsx` are auto-wrapped at the segment level. Don't manually wrap pages in Suspense for the route's own loading state.
- Don't `dispatch(...)` in the render body of a Client Component. Wrap in `useEffect`, or move the state into URL search params.

## Adding a new domain

1. Create `src/modules/<domain>/`:
   - `entities/<entity>.ts` + `entities/index.ts` (barrel)
   - `<domain>.api.ts` injecting RTK Query endpoints into `apiSlice`
   - `<domain>.slice.ts` if the domain has client-side state
   - `index.ts` barrel re-exporting everything consumers need
2. If the domain has a slice: register the reducer in `src/lib/store.ts`.
3. If the domain persists to localStorage: add listener blocks in `src/lib/storageListeners.ts`.
4. If the domain needs a new RTK Query tag for cache invalidation: add it to `tagTypes` in `src/lib/api-slice.ts`.

## Scripts and commands

```bash
bun install
bun dev                  # Turbopack on :3000
bun build                # production build
bun start                # serve production build
bun lint
npx tsc --noEmit         # type check
```

Hot reload via Turbopack is reliable; restart only if the dev server itself crashes or after a major restructure (Turbopack caches deleted module references in some cases).

## Things to avoid

- **Don't fetch `http://localhost:8080` directly.** Use `/api/*` and let the middleware handle it.
- **Don't read backend URLs in client components.** The whole point of `API_BASE_URL` (no `NEXT_PUBLIC_`) is to keep it server-side.
- **Don't write localStorage from inside a reducer.** Use the listener middleware.
- **Don't put `'use client'` at the top of layouts** unless they genuinely need it. Layouts often fan out to many routes; one `'use client'` at the layout level pulls everything below into the client bundle.
- **Don't put `'use client'` on slice or thunk files.** They're not React components.
- **Don't dispatch during render.** Wrap in `useEffect`, or derive from URL state.
- **Don't create `src/components/`** to "tidy up". The convention here is `src/app/components/`. Stay consistent.
- **Don't expose backend response shapes (snake_case Models) directly to components.** If the backend ever returns snake_case, transform inside the module's API client and only return entity-shape data.
- **Don't import a Server Component into a Client Component.** Pass it down via `children` or `props` instead.
- **Don't reach across modules for entity types.** Import from `@/modules/<domain>` (the barrel), not from internal paths like `@/modules/products/entities/product`.
