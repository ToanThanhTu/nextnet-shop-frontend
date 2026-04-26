"use client"

import AppHydrator from "@/app/components/app-hydrator"
import { AppStore, makeStore } from "@/lib/store"
// Side-effect import: registers storage listeners on the listener middleware
// so reducers can stay pure and side effects live in one place.
import "@/lib/storageListeners"
import { useRef } from "react"
import { Provider } from "react-redux"

/**
 * Provides the Redux store to the React tree. The store is created once
 * per request via useRef. AppHydrator handles loading persisted state
 * from localStorage on first client render.
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <AppHydrator />
      {children}
    </Provider>
  )
}
