import { apiSlice } from "@/lib/api-slice"
import type { CartItem } from "@/modules/cart/entities"
import type { Order, OrderItem } from "./entities"

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], number>({
      query: (userId) => `/orders/user/${userId}`,
      providesTags: ["Orders"],
    }),
    placeOrder: builder.mutation<
      { order: Order; orderItems: OrderItem[] },
      { userId: number; cartItems: CartItem[] }
    >({
      query: ({ userId, cartItems }) => ({
        url: `/orders/user/${userId}`,
        method: "POST",
        body: cartItems,
      }),
      invalidatesTags: ["Orders", "Cart"],
    }),
  }),
})

export const { useGetOrdersQuery, usePlaceOrderMutation } = ordersApi
