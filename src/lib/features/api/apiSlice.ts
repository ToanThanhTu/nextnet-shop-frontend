import { Category, User } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // The cache reducer expects to be added at `state.api`
    baseUrl: "/api",
    prepareHeaders(headers, { getState }) {
      const userToken = (getState() as { auth: { userToken: string } }).auth.userToken;

      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
        return headers;
      }
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getUserDetails` endpoint is a "query" operation that returns data.
    // The return value is a `User` object, and it takes a number as an argument.
    // By default, query endpoints will use a GET HTTP request
    getUserDetails: builder.query<User, number>({
      query: (userId) => ({
        url: `/users/id/${userId}`,
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/categories",
      })
    })
  }),
});

export const { useGetUserDetailsQuery, useGetCategoriesQuery } = apiSlice;
