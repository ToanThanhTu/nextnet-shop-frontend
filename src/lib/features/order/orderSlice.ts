import { CartItem, Order, OrderItem } from "@/app/types";
import { apiSlice } from "@/lib/features/api/apiSlice";

export const apiSliceWithOrder = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getOrders: builder.query<Order[], number>({
      query: (userId) => `/orders/user/${userId}`,
      providesTags: ["Orders"],
    })
  }),
});

export const { usePlaceOrderMutation, useGetOrdersQuery } = apiSliceWithOrder;
