# Frontend conventions and gotchas

Stack-specific rules for `next-frontend`. Project-wide conventions live in `../CLAUDE.md`.

## Architecture: middleware-rewritten API

`src/middleware.ts` matches `/api/:path*`, strips the `/api` prefix, and rewrites to `process.env.API_BASE_URL`. This is the single source of truth for backend connectivity.

Implications:

- All client code (RTK Query, fetches, etc.) calls `/api/...` paths. Never hardcode `http://localhost:8080`.
- The backend hostname/port is server-side config. There is no `NEXT_PUBLIC_*` for it on purpose.
- Same-origin from the browser; no CORS work on the client side.

If you need a new backend env (different host, staging, etc.), set `API_BASE_URL` in the deployment environment. Don't bypass the middleware with direct fetches.

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

`error.tsx` files at any segment **must** be Client Components.

`metadata` exports only work in Server Components. If you need both metadata and interactivity, keep the Server parent and extract the interactive bit into a Client child.

## Redux store

- Store factory: `src/lib/store.ts` exports `makeStore()`. The store is created per-request via `StoreProvider` (`src/app/StoreProvider.tsx`). Don't import a singleton store.
- Typed hooks: import `useAppSelector` / `useAppDispatch` from `src/lib/hooks.ts`. Don't use the untyped `useSelector` / `useDispatch`.
- Slices: one folder per feature under `src/lib/features/<feature>/`. Each slice owns its actions, reducers, and selectors.
- RTK Query: `src/lib/features/api/apiSlice.ts`. Add new endpoints there. Use `tagTypes` + `providesTags` / `invalidatesTags` for cache invalidation.

## Forms

React Hook Form + (where added) Zod for validation. Keep validation schemas alongside the form component. Server-side validation is owned by the backend; client-side is for UX only.

## Styling

- Tailwind utilities first. Use `cn()` from `src/lib/utils.ts` for conditional class merging.
- MUI for complex interactive components (dialogs, carousels, dropdowns) where Tailwind would be tedious to assemble.
- Don't use inline `style={{...}}` for layout. Reserve it for genuinely dynamic values (computed positions, server-driven colours).
- Mobile-first responsive breakpoints (`sm:`, `md:`, `lg:`).

## Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`). Use the alias for anything past one level deep:

```ts
import { Header } from "@/app/components/header/header";   // good
import { Header } from "../../components/header/header";   // bad
```

Single-level relative imports are fine for neighbouring files in the same folder.

## Image optimisation

`next.config.ts` declares `remotePatterns` for backend-served images at `localhost:3001/{categories,subcategories,products}/**`. The port (3001) is suspicious and likely stale; the backend runs on 8080. If image loading fails locally, update the patterns to match the actual backend URL.

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

## Scripts and commands

```bash
bun install
bun dev                  # Turbopack on :3000
bun build                # production build
bun start                # serve production build
bun lint
npx tsc --noEmit         # type check
```

Hot reload via Turbopack is reliable; restart only if the dev server itself crashes.

## Things to avoid

- **Don't fetch `http://localhost:8080` directly.** Use `/api/*` and let the middleware handle it.
- **Don't read backend URLs in client components.** The whole point of `API_BASE_URL` (no `NEXT_PUBLIC_`) is to keep it server-side.
- **Don't put `'use client'` at the top of layouts** unless they genuinely need it. Layouts often fan out to many routes; one `'use client'` at the layout level pulls everything below into the client bundle.
- **Don't create `src/components/`** to "tidy up". The convention here is `src/app/components/`. Stay consistent.
- **Don't use `Math.random()` or `Date.now()` directly in render.** They cause hydration mismatches. Compute on the server or in `useEffect`.
- **Don't import a Server Component into a Client Component.** Pass it down via `children` or `props` instead.
