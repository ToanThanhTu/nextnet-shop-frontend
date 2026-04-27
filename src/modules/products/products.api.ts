import { apiSlice } from "@/lib/api-slice"
import type { Product } from "./entities"

export type ProductQueryParams = {
  category?: string
  subcategory?: string
  priceMin?: number
  priceMax?: number
  sortBy?: string
  limit?: string
  page?: string
}

type SearchParams = { search: string }

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; totalItems: number },
      { endpoint: string; params: ProductQueryParams }
    >({
      query: ({ endpoint, params }) => ({
        url: `/products/${endpoint}`,
        params,
      }),
    }),
    getTopDeals: builder.query<Product[], void>({
      query: () => ({ url: "/products/top-deals" }),
    }),
    getOnSaleProducts: builder.query<
      { products: Product[]; totalItems: number },
      ProductQueryParams
    >({
      query: (params) => ({ url: "/products/sales", params }),
    }),
    getBestSellers: builder.query<
      { products: Product[]; totalItems: number },
      ProductQueryParams
    >({
      query: (params) => ({ url: "/products/bestsellers", params }),
    }),
    getProductsBySearchText: builder.query<Product[], SearchParams>({
      query: (params) => ({ url: "/products/search", params }),
    }),
    getProductBySlug: builder.query<
      {
        product: Product
        subCategory: { title: string; slug: string }
        category: { title: string; slug: string }
      },
      string
    >({
      query: (slug) => ({ url: `/products/slug/${slug}` }),
    }),
    getProductById: builder.query<Product, number>({
      query: (productId) => ({ url: `/products/id/${productId}` }),
    }),
    getProductsRecommendations: builder.query<Product[], number>({
      query: (productId) => ({ url: `/products/recommendations/${productId}` }),
    }),
    getPersonalRecommendations: builder.query<Product[], void>({
      // User comes from the JWT NameIdentifier claim on the backend.
      query: () => ({ url: "/products/personal-recommendations" }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetTopDealsQuery,
  useGetOnSaleProductsQuery,
  useGetBestSellersQuery,
  useGetProductsBySearchTextQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useGetProductsRecommendationsQuery,
  useGetPersonalRecommendationsQuery,
} = productsApi
