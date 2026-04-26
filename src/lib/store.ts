import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "@/lib/api-slice"
import { listenerMiddleware } from "@/app/listenerMiddleware"
import filterReducer from "@/lib/features/filter/filterSlice"
import { authReducer } from "@/modules/users"
import { cartReducer } from "@/modules/cart"

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      cart: cartReducer,
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
