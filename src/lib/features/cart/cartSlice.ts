import { CartItem, CartItemDTO, CartState } from "@/app/types";
import { apiSlice } from "@/lib/features/api/apiSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const calculateTotalPriceAndUpdateLocalStorage = (cart: CartItem[]) => {
  const totalPrice = Number(
    cart.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0).toFixed(2)
  );

  localStorage.setItem("NextNetShopCart", JSON.stringify(cart));

  return totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLocal: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
      state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(action.payload);
    },
    resetCartLocal: (state) => {
      state.cart = [];
      state.totalPrice = 0;

      localStorage.removeItem("NextNetShopCart");
    },
    addCartItemLocal: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
    },
    updateCartItemLocal: (state, action: PayloadAction<CartItemDTO>) => {
      const existingItem = state.cart.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        state.cart = state.cart.map((item) =>
          item.productId === existingItem.productId ? existingItem : item
        );
      }

      state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
    },
    removeCartItemLocal: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
      state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSliceWithCart.endpoints.addCartItemServer.matchFulfilled, (state, action) => {
        const existingItem = state.cart.find((item) => item.productId === action.payload.productId);

        if (existingItem) {
          state.cart = state.cart.map((item) =>
            item.productId === action.payload.productId ? action.payload : item
          );
        } else {
          state.cart.push(action.payload);
        }

        state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
      })
      .addMatcher(
        apiSliceWithCart.endpoints.removeCartItemServer.matchFulfilled,
        (state, action) => {
          state.cart = state.cart.filter((item) => item.productId !== action.payload.productId);
          state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
        }
      )
      .addMatcher(
        apiSliceWithCart.endpoints.updateCartItemServer.matchFulfilled,
        (state, action) => {
          state.cart = state.cart.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
          state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
        }
      )
      .addMatcher(apiSliceWithCart.endpoints.clearCartServer.matchFulfilled, (state) => {
        state.cart = [];
        state.totalPrice = 0;
      })
      .addMatcher(apiSliceWithCart.endpoints.syncCartServer.matchFulfilled, (state, action) => {
        state.cart = action.payload;
        state.totalPrice = calculateTotalPriceAndUpdateLocalStorage(state.cart);
      });
  },
});

export const apiSliceWithCart = apiSlice.injectEndpoints({
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
        url: `/cart/item/`,
        method: "DELETE",
        body: cartItemDto,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItemServer: builder.mutation<CartItem, CartItemDTO>({
      query: (cartItemDto) => ({
        url: `/cart`,
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
});

export const {
  setCartLocal,
  resetCartLocal,
  addCartItemLocal,
  updateCartItemLocal,
  removeCartItemLocal,
} = cartSlice.actions;

export const {
  useFetchUserCartServerQuery,
  useAddCartItemServerMutation,
  useRemoveCartItemServerMutation,
  useUpdateCartItemServerMutation,
  useClearCartServerMutation,
  useSyncCartServerMutation,
} = apiSliceWithCart;

export default cartSlice.reducer;
