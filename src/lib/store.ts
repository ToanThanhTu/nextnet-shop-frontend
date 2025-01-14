import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "@/lib/features/api/apiSlice";
import { listenerMiddleware } from "@/app/listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      cart: cartReducer,
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddeware) =>
      getDefaultMiddeware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {menuSelect: MenuSelectState}
export type AppDispatch = AppStore["dispatch"];
