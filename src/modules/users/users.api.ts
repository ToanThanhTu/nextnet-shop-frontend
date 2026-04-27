import { apiSlice } from "@/lib/api-slice"
import type { User } from "./entities"

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<User, number>({
      query: (userId) => ({ url: `/users/${userId}` }),
      providesTags: ["User"],
    }),
  }),
})

export const { useGetUserDetailsQuery } = usersApi
