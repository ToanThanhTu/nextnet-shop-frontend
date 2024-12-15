import { configureStore } from "@reduxjs/toolkit";
import menuSelectReducer from "./features/menu/menuSelectSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menuSelect: menuSelectReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {menuSelect: MenuSelectState}
export type AppDispatch = AppStore["dispatch"];
