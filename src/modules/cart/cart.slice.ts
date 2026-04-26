import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { cartApi } from "./cart.api"
import type { CartItem, CartItemDTO, CartState } from "./entities"

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
}

/**
 * Pure derivation. Side effects (writing localStorage) live in the listener
 * middleware: see src/lib/storageListeners.ts.
 */
const calcTotalPrice = (cart: CartItem[]) =>
  Number(
    cart.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0).toFixed(2)
  )

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLocal(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload
      state.totalPrice = calcTotalPrice(action.payload)
    },
    resetCartLocal(state) {
      state.cart = []
      state.totalPrice = 0
    },
    addCartItemLocal(state, action: PayloadAction<CartItem>) {
      const existing = state.cart.find((i) => i.productId === action.payload.productId)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
      state.totalPrice = calcTotalPrice(state.cart)
    },
    updateCartItemLocal(state, action: PayloadAction<CartItemDTO>) {
      const existing = state.cart.find((i) => i.productId === action.payload.productId)
      if (existing) {
        existing.quantity = action.payload.quantity
        state.cart = state.cart.map((i) =>
          i.productId === existing.productId ? existing : i
        )
      }
      state.totalPrice = calcTotalPrice(state.cart)
    },
    removeCartItemLocal(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((i) => i.productId !== action.payload)
      state.totalPrice = calcTotalPrice(state.cart)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.addCartItemServer.matchFulfilled, (state, action) => {
        const existing = state.cart.find((i) => i.productId === action.payload.productId)
        if (existing) {
          state.cart = state.cart.map((i) =>
            i.productId === action.payload.productId ? action.payload : i
          )
        } else {
          state.cart.push(action.payload)
        }
        state.totalPrice = calcTotalPrice(state.cart)
      })
      .addMatcher(cartApi.endpoints.removeCartItemServer.matchFulfilled, (state, action) => {
        state.cart = state.cart.filter((i) => i.productId !== action.payload.productId)
        state.totalPrice = calcTotalPrice(state.cart)
      })
      .addMatcher(cartApi.endpoints.updateCartItemServer.matchFulfilled, (state, action) => {
        state.cart = state.cart.map((i) =>
          i.id === action.payload.id ? action.payload : i
        )
        state.totalPrice = calcTotalPrice(state.cart)
      })
      .addMatcher(cartApi.endpoints.clearCartServer.matchFulfilled, (state) => {
        state.cart = []
        state.totalPrice = 0
      })
      .addMatcher(cartApi.endpoints.syncCartServer.matchFulfilled, (state, action) => {
        state.cart = action.payload
        state.totalPrice = calcTotalPrice(state.cart)
      })
  },
})

export const {
  setCartLocal,
  resetCartLocal,
  addCartItemLocal,
  updateCartItemLocal,
  removeCartItemLocal,
} = cartSlice.actions

export default cartSlice.reducer
