# Modules — domain bounded contexts

Each module is a bounded context that owns its entities, API client (RTK Query injected endpoints), optional Redux slice, and optional thunks. Components consume modules via the barrel. Modules never import from `src/app/`.

For DDD pattern rules, RTK Query conventions, and the `/api/*` middleware-rewrite story, see the parent [`next-frontend/CLAUDE.md`](../../CLAUDE.md).

This file documents only **the cross-module landscape**: which modules exist, which have slices, which have thunks, and which RTK Query tags they own.

## Modules in this codebase

| Module | API hooks | Slice | Thunks | RTK Query tags |
|---|---|---|---|---|
| [categories](categories/CLAUDE.md) | `useGetCategoriesQuery` | none | none | `Category` |
| [products](products/CLAUDE.md) | `useGetProductsQuery`, `useGetTopDealsQuery`, ~10 more | none | none | (no tag — read-only public endpoints) |
| [cart](cart/CLAUDE.md) | `useGetMyCartQuery`, `useAddCartItemMutation`, etc. | `cart` (local state) | none | `Cart` |
| [orders](orders/CLAUDE.md) | `useGetOrdersQuery`, `usePlaceOrderMutation` | none | none | `Orders` |
| [users](users/CLAUDE.md) | `useGetUserByIdQuery` | `auth` (token + user) | `loginUser`, `registerUser` | `User` |

Tags are declared globally in `src/lib/api-slice.ts` (`tagTypes`). When introducing a new module that needs cache invalidation, add a new tag there before referencing it in `providesTags` / `invalidatesTags`.

## Slice ownership

Two modules have client-side state:

- **`cart`** — local cart used for guest browsing before login, and as the source of truth for the in-memory cart UI even when authed (server reconciles on demand). Persisted to localStorage via the listener middleware.
- **`users`** — JWT token + user profile after login. Persisted to localStorage. Hydrated on first client render by `app-hydrator.tsx`.

The other three modules (`categories`, `products`, `orders`) are read-only against the backend and rely entirely on RTK Query's cache.

## Thunks vs RTK Query

`users` has thunks (`auth.thunks.ts`) for login and register; the rest of the app uses RTK Query mutations directly. The reason: login/register both need to write to the auth slice on success (set token + user) and the listener middleware reacts to the thunk's `fulfilled` action to write localStorage. Doing this with a mutation would mean either dispatching a separate slice action from a component (more wiring) or coupling RTK Query cache shape to the slice. Thunks keep the imperative side-effect tidy.

Don't add thunks for things RTK Query handles cleanly. The default is mutations; thunks are for "command that has to dispatch slice actions on success."

## Cross-module dependencies

```
orders   ─── depends on ──► cart (place-order request body comes from cart state)
cart     ─── depends on ──► products (cart items embed product info via the API response)
products ─── depends on ──► categories (filters/queries reference category slugs)
users    ─── independent
```

These are runtime data dependencies, not type imports. Each module imports its own entity types only; cross-module data lands via the API responses, not via shared types.

## Adding a new module

1. Create `src/modules/<domain>/` with `entities/`, `<domain>.api.ts`, `index.ts` barrel.
2. Add a slice + thunks file only if the module has genuine client-side state or imperative side effects.
3. If the slice persists to localStorage: register a listener block in `src/lib/storageListeners.ts`.
4. If the API endpoints need cache invalidation: add a new tag to `tagTypes` in `src/lib/api-slice.ts`.
5. Register the slice's reducer in `src/lib/store.ts` if you added one.
6. Add a CLAUDE.md at `src/modules/<domain>/CLAUDE.md` documenting the module's specifics.
