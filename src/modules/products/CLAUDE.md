# products module

Read-only module wrapping the backend's many product endpoints. No client-side state. Largest API surface in the frontend.

For RTK Query conventions and module structure see the parent [`src/modules/CLAUDE.md`](../CLAUDE.md).

## Files at this level

| File | Purpose |
|---|---|
| `index.ts` | Barrel |
| `products.api.ts` | Injected RTK Query endpoints; ~10 hooks |
| `entities/product.ts` | `Product` type |
| `entities/index.ts` | Entity barrel |

## API surface

| Hook | Endpoint | Notes |
|---|---|---|
| `useGetProductsQuery({ endpoint, params })` | `GET /products/{endpoint}` | Generic; `endpoint` is `"all"` / `"sales"` / `"bestsellers"` |
| `useGetTopDealsQuery()` | `GET /products/top-deals` | No params |
| `useGetOnSaleProductsQuery(params)` | `GET /products/sales` | Paginated |
| `useGetBestSellersQuery(params)` | `GET /products/bestsellers` | Paginated |
| `useSearchProductsQuery({ search })` | `GET /products/search?query=...` | Full-text |
| `useGetProductByIdQuery(id)` | `GET /products/{id}` | |
| `useGetProductBySlugQuery(slug)` | `GET /products/by-slug/{slug}` | Returns `ProductWithHierarchy` (includes category + subcategory inline) |
| `useGetSimilarProductsQuery(id)` | `GET /products/{id}/similar` | |
| `useGetPersonalRecommendationsQuery()` | `GET /products/personal-recommendations` | Backend reads JWT if present, falls back to generic if anonymous |

## Module-specific notes

- **Pagination shape**: paginated endpoints return `{ products: Product[], totalItems: number }`, not an array. The `getProducts`-style hooks decode this; consumers must destructure both fields.
- **Personal recommendations works for anonymous users**. The backend doesn't gate on `[Authorize]`; the handler returns generic recommendations when no JWT is present. The hook is safe to call from any page.
- **No tag invalidation today**. The endpoints are read-only public, and admin product CRUD lives in a separate admin app. If admin CRUD is added here, introduce a `Products` tag and invalidate it from create/update/delete mutations.
- **`Product` type is the source of truth across the app**. Cart items, order items, and product cards all consume `Product`. Don't add fields here that only one consumer needs; create a sub-shape in the consuming module.
- **Image URLs** follow the same pattern as categories: `/products/{id}/image` is the byte-stream endpoint, configured in `next.config.ts` `remotePatterns`.
