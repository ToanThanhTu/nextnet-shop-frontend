"use client";

import { AppStore, makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

/**
 * Redux Store Provider Component
 * 
 * This component provides the Redux store to all child components in the application.
 * It implements the recommended pattern for Redux Toolkit with Next.js App Router,
 * ensuring the store is created once per component tree and persists across re-renders.
 * 
 * @param children - React components that need access to the Redux store
 * @returns JSX element wrapping children with Redux Provider
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use a ref to store the Redux store instance
  // This ensures the store persists across component re-renders
  // and prevents creating multiple store instances
  const storeRef = useRef<AppStore | null>(null);

  // Initialize the store only once when the component first renders
  // This follows the recommended pattern for Redux Toolkit with Next.js
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    // The makeStore function is defined in @/lib/store and sets up
    // all slices and middleware for the application
    storeRef.current = makeStore();
  }

  // Wrap children with Redux Provider to make the store available
  // to all descendant components via useSelector and useDispatch hooks
  return <Provider store={storeRef.current}>{children}</Provider>;
}
