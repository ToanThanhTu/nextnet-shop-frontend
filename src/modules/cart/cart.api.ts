import { apiSlice } from "@/lib/api-slice"
import type { CartItem } from "./entities"

/**
 * The user is identified by the JWT bearer token in apiSlice.prepareHeaders;
 * none of these endpoints take a userId from the client. Authorization is
 * enforced server-side.
 */

export type AddCartItemRequest = {
  productId: number
  quantity: number
}

export type UpdateCartItemRequest = {
  productId: number
  quantity: number
}

export type SyncCartItem = {
  productId: number
  quantity: number
}

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserCartServer: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addCartItemServer: builder.mutation<CartItem, AddCartItemRequest>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItemServer: builder.mutation<CartItem, UpdateCartItemRequest>({
      query: (body) => ({
        url: "/cart/items",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItemServer: builder.mutation<void, number>({
      query: (productId) => ({
        url: `/cart/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCartServer: builder.mutation<void, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    syncCartServer: builder.mutation<CartItem[], SyncCartItem[]>({
      query: (items) => ({
        url: "/cart/sync",
        method: "POST",
        body: { items },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
})

export const {
  useFetchUserCartServerQuery,
  useAddCartItemServerMutation,
  useUpdateCartItemServerMutation,
  useRemoveCartItemServerMutation,
  useClearCartServerMutation,
  useSyncCartServerMutation,
} = cartApi
