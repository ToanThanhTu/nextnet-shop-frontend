"use client"

import { ReactNode } from "react"

/**
 * Renders one of three branches based on an RTK Query result. Replaces the
 * scattered `if (isLoading)…else if (isSuccess)…else if (isError)…` ladders
 * across pages and components.
 *
 * Example:
 *   const result = useGetOrdersQuery(userId)
 *   return renderQuery(result, {
 *     loading: <Loading />,
 *     error:   (e) => <p>Failed: {String(e)}</p>,
 *     empty:   <p>No orders yet.</p>,
 *     success: (orders) => <OrderList orders={orders} />,
 *   })
 */
export type QueryResult<T> = {
  data?: T
  isLoading: boolean
  isFetching?: boolean
  isSuccess: boolean
  isError: boolean
  error?: unknown
}

export type RenderQueryOptions<T> = {
  loading?: ReactNode
  error?: ReactNode | ((error: unknown) => ReactNode)
  empty?: ReactNode
  success: (data: T) => ReactNode
  /** Treat this predicate as the empty case. Defaults to checking arrays for length 0. */
  isEmpty?: (data: T) => boolean
}

const defaultIsEmpty = (data: unknown) => Array.isArray(data) && data.length === 0

export function renderQuery<T>(
  result: QueryResult<T>,
  options: RenderQueryOptions<T>,
): ReactNode {
  if (result.isLoading) return options.loading ?? null
  if (result.isError) {
    const e = options.error
    if (typeof e === "function") return (e as (error: unknown) => ReactNode)(result.error)
    return e ?? null
  }
  if (result.isSuccess && result.data !== undefined) {
    const isEmpty = options.isEmpty ?? defaultIsEmpty
    if (options.empty !== undefined && isEmpty(result.data)) return options.empty
    return options.success(result.data)
  }
  return null
}
