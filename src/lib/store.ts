import { configureStore } from "@reduxjs/toolkit";
import filterAndSortReducer from "./features/filterAndSort/filterAndSortSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filterAndSort: filterAndSortReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {menuSelect: MenuSelectState}
export type AppDispatch = AppStore["dispatch"];
