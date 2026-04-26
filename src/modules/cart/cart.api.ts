import { apiSlice } from "@/lib/api-slice"
import type { CartItem, CartItemDTO } from "./entities"

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserCartServer: builder.query<CartItem[], number>({
      query: (userId) => `/cart/user/${userId}`,
      providesTags: ["Cart"],
    }),
    addCartItemServer: builder.mutation<CartItem, CartItemDTO>({
      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItemServer: builder.mutation<CartItemDTO, CartItemDTO>({
      query: (cartItemDto) => ({
        url: "/cart/item/",
        method: "DELETE",
        body: cartItemDto,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItemServer: builder.mutation<CartItem, CartItemDTO>({
      query: (cartItemDto) => ({
        url: "/cart",
        method: "PUT",
        body: cartItemDto,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCartServer: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/cart/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    syncCartServer: builder.mutation<CartItem[], { userId: number; localCart: CartItemDTO[] }>({
      query: ({ userId, localCart }) => ({
        url: `/cart/sync/${userId}`,
        method: "POST",
        body: localCart,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
})

export const {
  useFetchUserCartServerQuery,
  useAddCartItemServerMutation,
  useRemoveCartItemServerMutation,
  useUpdateCartItemServerMutation,
  useClearCartServerMutation,
  useSyncCartServerMutation,
} = cartApi
