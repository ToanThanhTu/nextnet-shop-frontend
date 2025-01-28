import { Product } from "@/app/types";
import { apiSlice } from "@/lib/features/api/apiSlice";

type QueryParams = {
  category?: string;
  subcategory?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
  limit?: string;
  page?: string;
};

type searchParams = {
  search: string;
};

export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; totalItems: number },
      { endpoint: string; params: QueryParams }
    >({
      query: ({ endpoint, params }) => ({
        url: `/products/${endpoint}`,
        params,
      }),
    }),
    getTopDeals: builder.query<Product[], void>({
      query: () => ({
        url: "/products/top-deals",
      }),
    }),
    getOnSaleProducts: builder.query<{ products: Product[]; totalItems: number }, QueryParams>({
      query: (params) => ({
        url: `/products/sales`,
        params,
      }),
    }),
    getBestSellers: builder.query<{ products: Product[]; totalItems: number }, QueryParams>({
      query: (params) => ({
        url: `/products/bestsellers`,
        params,
      }),
    }),
    getProductsBySearchText: builder.query<Product[], searchParams>({
      query: (params) => ({
        url: `/products/search`,
        params,
      }),
    }),
    getProductBySlug: builder.query<
      {
        product: Product;
        subCategory: { title: string; slug: string };
        category: { title: string; slug: string };
      },
      string
    >({
      query: (slug) => ({
        url: `/products/slug/${slug}`,
      }),
    }),
    getProductById: builder.query<Product, number>({
      query: (productId) => ({
        url: `/products/id/${productId}`,
      })
    }),
    getProductsRecommendations: builder.query<Product[], number>({
      query: (productId) => ({
        url: `/products/recommendations/${productId}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTopDealsQuery,
  useGetOnSaleProductsQuery,
  useGetBestSellersQuery,
  useGetProductsBySearchTextQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useGetProductsRecommendationsQuery,
} = apiSliceWithProducts;
