import CartItemQuantity from "@/app/components/cart/cart-item-quantity";
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
import { setCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    } else {
      dispatch(setCart([]));
    }
  }, [dispatch]);

  const addItemQuantity = (productId: number) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    dispatch(setCart(updatedCart));
  };

  const subtractItemQuantity = (productId: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    dispatch(setCart(updatedCart));
  };

  const changeQuantity = (productId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    const updatedCart = cart
      .map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    dispatch(setCart(updatedCart));
  };

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative">
          <ShoppingCart fontSize="large" />
          {cart.length > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full px-2">{cart.length}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Your Shopping Cart</SheetDescription>
        </SheetHeader>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.productId}>
                  <div className="grid grid-cols-3 items-center justify-between">
                    <Image
                      src={`/api/products/${item.productId}/image`}
                      width={50}
                      height={50}
                      alt={`${item.title} image`}
                    />
                    <div className="col-span-2">
                      <p>{item.title}</p>
                      <CartItemQuantity
                        quantity={item.quantity}
                        handleAddQuantity={() => addItemQuantity(item.productId)}
                        handleSubtractQuantity={() => subtractItemQuantity(item.productId)}
                        handleQuantityChange={(e) => changeQuantity(item.productId, e)}
                      />
                      <p>${item.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter className="block">
          <div className="flex justify-between">
            <p>Order Subtotal</p>
            <p>{subTotal}</p>
          </div>
          <Button className="uppercase" onClick={() => redirect('/checkout')}>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
