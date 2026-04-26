"use client"

import Products from "@/app/components/products/products"
import { updateCurrentFilter } from "@/lib/features/filter/filterSlice"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"

export default function Page() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCurrentFilter({ priceMax: 25 }))
  }, [dispatch])

  return <Products endpoint="all" category="fitness" />
}
