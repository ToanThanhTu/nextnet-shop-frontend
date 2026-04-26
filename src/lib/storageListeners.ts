import { logout } from "@/modules/users"
import { loginUser } from "@/modules/users"
import {
  addCartItemLocal,
  removeCartItemLocal,
  resetCartLocal,
  setCartLocal,
  updateCartItemLocal,
} from "@/modules/cart"
import { startAppListening } from "@/app/listenerMiddleware"
import { isAnyOf } from "@reduxjs/toolkit"

/**
 * Side effects that respond to dispatched actions, so reducers can stay pure.
 * Currently: cart and auth localStorage persistence.
 *
 * Imported once from StoreProvider; listeners register at module load.
 */

const CART_KEY = "NextNetShopCart"
const AUTH_KEY = "signedInNextNetShopUser"

const isBrowser = () => typeof window !== "undefined"

startAppListening({
  matcher: isAnyOf(addCartItemLocal, removeCartItemLocal, setCartLocal, updateCartItemLocal),
  effect: (_, api) => {
    if (!isBrowser()) return
    const { cart } = api.getState().cart
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  },
})

startAppListening({
  actionCreator: resetCartLocal,
  effect: () => {
    if (!isBrowser()) return
    localStorage.removeItem(CART_KEY)
  },
})

startAppListening({
  actionCreator: loginUser.fulfilled,
  effect: (_, api) => {
    if (!isBrowser()) return
    const { user, token } = api.getState().auth
    if (user && token) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }))
    }
  },
})

startAppListening({
  actionCreator: logout,
  effect: () => {
    if (!isBrowser()) return
    localStorage.removeItem(AUTH_KEY)
  },
})
