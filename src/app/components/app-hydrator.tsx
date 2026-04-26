"use client"

import { setCredentials } from "@/modules/users"
import { setCartLocal } from "@/modules/cart"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"

/**
 * Hydrates Redux state from localStorage on first client render.
 * Centralises what was previously scattered across cart.tsx, checkout/page.tsx,
 * and useAuth. Mounted once inside StoreProvider.
 */
export default function AppHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("NextNetShopCart")
      dispatch(setCartLocal(storedCart ? JSON.parse(storedCart) : []))

      const storedAuth = localStorage.getItem("signedInNextNetShopUser")
      if (storedAuth) {
        dispatch(setCredentials(JSON.parse(storedAuth)))
      }
    } catch (err) {
      console.error("AppHydrator failed to restore state from localStorage:", err)
    }
  }, [dispatch])

  return null
}
