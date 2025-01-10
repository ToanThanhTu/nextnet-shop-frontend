import { Cart } from "@/app/types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cart = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartState(_state, action: PayloadAction<Cart>) {
      return action.payload;
    },
  },
});

export const { setCartState } = cartSlice.actions;

export const setCart = (cart: Cart) => {
  return (dispatch: Dispatch) => {
    dispatch(setCartState(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  };
}

export default cartSlice.reducer;
