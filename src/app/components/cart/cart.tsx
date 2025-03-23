"use client";

import CartList from "@/app/components/cart/cart-list";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { setCartLocal } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Cart() {
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedCart = localStorage.getItem("NextNetShopCart");
    if (storedCart) {
      dispatch(setCartLocal(JSON.parse(storedCart)));
    } else {
      dispatch(setCartLocal([]));
    }
  }, [dispatch]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative hover:cursor-pointer">
          <ShoppingCart strokeWidth={3} className="text-black" />
          {cart.length > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full px-2">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Your Shopping Cart</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <CartList cart={cart} user={user} />
        </div>

        {cart.length > 0 && (
          <SheetFooter className="block">
            <div className="flex justify-between items-center py-4">
              <h4>Order Subtotal</h4>
              <p className="sale-price">${totalPrice}</p>
            </div>
            <Button className="uppercase w-full" size="lg" onClick={() => redirect("/checkout")}>
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
