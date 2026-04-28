# users module

The auth module. Owns the JWT, the current user profile, login/register flows, and the auth slice that the rest of the app consumes via `prepareHeaders` in `apiSlice`. The only frontend module with thunks.

For RTK Query conventions, slice rules, listener middleware, and the hydration pattern see the parent [`src/modules/CLAUDE.md`](../CLAUDE.md) and [`next-frontend/CLAUDE.md`](../../../CLAUDE.md).

## Files at this level

| File | Purpose |
|---|---|
| `index.ts` | Barrel: hooks, slice actions, thunks, entities |
| `users.api.ts` | RTK Query endpoints (currently `useGetUserByIdQuery`) |
| `auth.slice.ts` | Auth state: `user`, `token`, `loading`, `error`, `success` |
| `auth.thunks.ts` | `loginUser`, `registerUser` (createAsyncThunk) |
| `entities/user.ts` | `User`, `UserDTO`, `UserRegistration`, `Auth` types |
| `entities/index.ts` | Entity barrel |

## API surface

| Hook | Endpoint | Method | Auth |
|---|---|---|---|
| `useGetUserByIdQuery(id)` | `/users/{id}` | GET | required |

Login and register are thunks, not RTK Query mutations:

| Thunk | Endpoint | Method | Auth |
|---|---|---|---|
| `loginUser({ email, password })` | `/users/login` | POST | public |
| `registerUser(userRegistration)` | `/users/register` | POST | public |

## Slice surface

| Action | Effect |
|---|---|
| `logout()` | Clear `user`, `token`, status flags |
| `setCredentials({ user, token })` | Restore auth from localStorage on hydration |
| `loginUser.pending` / `.fulfilled` / `.rejected` | Drive `loading` / `error` / `success` (extraReducers) |
| `registerUser.pending` / `.fulfilled` / `.rejected` | Same |

State shape: `{ user: UserDTO | null, token: string | null, loading: boolean, error: string | null, success: boolean }`.

## Why thunks instead of RTK Query mutations for login/register

RTK Query is great when the response just needs to land in cache. Login and register are different: their fulfillment must dispatch slice actions (set credentials) and trigger localStorage writes via the listener middleware. Doing that with a mutation would mean wiring `onQueryStarted` callbacks or dispatching slice actions from components, which is uglier than a `createAsyncThunk` that owns the imperative side-effect chain.

This module is the only place that uses thunks. Don't introduce them elsewhere unless the use case is similarly imperative.

## Persistence

The listener middleware (`src/lib/storageListeners.ts`) writes `signedInNextNetShopUser` to localStorage on `loginUser.fulfilled` and clears it on `logout`. `app-hydrator.tsx` reads this on first client render and dispatches `setCredentials`.

## prepareHeaders integration

`src/lib/api-slice.ts` reads `state.auth.token` in `prepareHeaders` and attaches it as `Authorization: Bearer <token>` on every RTK Query request. Mutations and queries across the app rely on this; don't replicate the bearer injection elsewhere.

## Module-specific notes

- **`logout` is a pure reducer**. It clears the slice. The localStorage clear happens in the listener middleware. Don't add `localStorage.removeItem(...)` to the reducer.
- **`UserDTO` is what the slice stores**, not `User`. The DTO doesn't include `passwordHash` (the backend never returns it anyway). Treat `User` as the input shape (registration), `UserDTO` as the output shape.
- **Token expiry isn't auto-refreshed**. When the access token expires, RTK Query mutations will start returning 401 and components need to handle it (typically by dispatching `logout`). Adding a refresh-token flow = a new thunk + listener.
- **No password reset / email verification flow** today. The UI hooks exist on registration but the backend doesn't yet implement them; treat as deferred work.
- **`success` flag is set on register-fulfilled**, used by the registration form to navigate to the login page. Reset it on `logout` and on subsequent register attempts to avoid a stale "you signed up!" toast.
