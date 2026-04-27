import { apiSlice } from "@/lib/api-slice"
import type { Order } from "./entities"

/**
 * The user is identified by the JWT bearer; orders endpoints don't take
 * a userId from the client.
 */

export type PlaceOrderItem = {
  productId: number
  quantity: number
  expectedSalePrice: number
}

export type PlaceOrderRequest = {
  items: PlaceOrderItem[]
}

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    placeOrder: builder.mutation<Order, PlaceOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Cart"],
    }),
  }),
})

export const { useGetOrdersQuery, usePlaceOrderMutation } = ordersApi
