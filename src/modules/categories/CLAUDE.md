# categories module

Read-only module exposing the category and subcategory taxonomy. No client-side state, no slice, no thunks. Just RTK Query hooks against the public `/categories` and `/subcategories` endpoints.

For RTK Query conventions and module structure see the parent [`src/modules/CLAUDE.md`](../CLAUDE.md).

## Files at this level

| File | Purpose |
|---|---|
| `index.ts` | Barrel: re-exports entities + RTK Query hooks |
| `categories.api.ts` | Injected RTK Query endpoint: `useGetCategoriesQuery` |
| `entities/category.ts` | `Category` type |
| `entities/sub-category.ts` | `SubCategory` type |
| `entities/index.ts` | Entity barrel |

## API surface

| Hook | Endpoint | Returns |
|---|---|---|
| `useGetCategoriesQuery()` | `GET /categories` | `Category[]` |

## Module-specific notes

- **`SubCategory` is an entity here, not in its own module.** The frontend doesn't have a separate `subcategories` module because both are pure read-only taxonomy and the backend's `/subcategories` endpoint returns flat data that the UI joins to categories by `categoryId`. Consolidating both in this module keeps the import surface small.
- **No mutations**: the admin dashboard for category CRUD lives in a separate admin app (not in this codebase). If admin CRUD is added here later, introduce mutations + invalidation against the `Category` tag.
- **Image URLs** are constructed by appending `/categories/{id}/image` to the API base path. The `<img src>` value goes through Next.js `<Image>` after `remotePatterns` is configured in `next.config.ts`.
