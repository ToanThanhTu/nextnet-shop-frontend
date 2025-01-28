"use client";

import Billing from "@/app/components/checkout/billing";
import OrderSummary from "@/app/components/checkout/order-summary";
import {
  setCartLocal,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector, useAuth } from "@/lib/hooks";
import { useEffect } from "react";

function Page() {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const user = useAuth({ needSignIn: false });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("NextNetShopCart");
    if (storedCart) {
      dispatch(setCartLocal(JSON.parse(storedCart)));
    } else {
      dispatch(setCartLocal([]));
    }
  }, [dispatch]);

  return (
    <>
      <h1>Checkout</h1>

      <div className="grid grid-cols-2 gap-16">
        <Billing cart={cart} user={user} />
        <OrderSummary cart={cart} totalPrice={totalPrice} user={user} />
      </div>
    </>
  );
}

export default Page;
