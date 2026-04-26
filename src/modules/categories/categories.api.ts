import { apiSlice } from "@/lib/api-slice"
import type { Category } from "./entities"

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: "/categories" }),
      providesTags: ["Category"],
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
