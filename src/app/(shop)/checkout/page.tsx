"use client"

import Billing from "@/app/components/checkout/billing"
import OrderSummary from "@/app/components/checkout/order-summary"
import { useAppSelector, useAuth } from "@/lib/hooks"

export default function Page() {
  // Cart hydration from localStorage happens once in AppHydrator.
  const { cart, totalPrice } = useAppSelector((state) => state.cart)
  const user = useAuth({ needSignIn: false })

  return (
    <>
      <h1 className="py-12 text-center text-3xl font-bold uppercase">Checkout</h1>

      <div className="px-2 lg:px-0 lg:grid grid-cols-2 gap-16 pb-12">
        <OrderSummary cart={cart} totalPrice={totalPrice} user={user} />
        <Billing cart={cart} user={user} />
      </div>
    </>
  )
}
