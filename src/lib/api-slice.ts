import type { RootState } from "@/lib/store"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/**
 * Bare RTK Query base. Domain-specific endpoints are added via injectEndpoints
 * from the per-module .api.ts files (e.g. modules/products/products.api.ts).
 *
 * The middleware (src/middleware.ts) rewrites /api/* to the .NET backend, so
 * client code stays same-origin.
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User", "Category", "Cart", "Orders"],
  endpoints: () => ({}),
})
