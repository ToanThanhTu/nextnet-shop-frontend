"use client";

import CartItemQuantity from "@/app/components/cart/cart-item-quantity";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { setCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect } from "react";

function Page() {
  const cart = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handlePlaceOrder = (event: SyntheticEvent) => {
    event.preventDefault();

    alert("Order placed successfully!");

    if (user) {
      router.push("/account");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <h1>Checkout</h1>

      {!user && (
        <div className="flex items-center justify-between bg-gray-100 py-6 px-10">
          <div className="flex items-center space-x-6">
            <Image
              src="/membership-card-tilted.png"
              alt="Membership Card Image"
              width={450}
              height={250}
              className="w-[100px]"
            />

            <p>Login or register to get member benefits.</p>
          </div>

          <div className="space-x-4">
            <Button className="uppercase w-60 h-12" onClick={() => router.push("/signin")}>
              Login to Next Net Shop
            </Button>
            <Button
              className="uppercase w-60 h-12 border-black"
              variant="outline"
              onClick={() => router.push("/register")}
            >
              Register for free
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-16">
        <form>
          <p>Information are prefilled for demo purpose</p>
          <h2>Contact</h2>

          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value="Demo User" readOnly />
          </div>
          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value="1234567890" readOnly />
          </div>
          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value="demo@nextnetshop.com" readOnly />
          </div>

          <h2>Delivery</h2>

          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value="Demo User" readOnly />
          </div>
          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" value="1234 Demo St" readOnly />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" value="Demo City" readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" type="text" value="Demo State" readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="zip">Postcode</Label>
              <Input id="zip" type="text" value="12345" readOnly />
            </div>
          </div>

          <h2>Payment</h2>

          <div className="flex flex-col space-y-2 my-4">
            <Label htmlFor="card">Card number</Label>
            <Input id="card" type="text" value="4242 4242 4242 4242" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" type="text" value="01/23" readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" type="text" value="123" readOnly />
            </div>
          </div>

          <Button className="uppercase w-full h-12 mt-4" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </form>

        <div>
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.productId}>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={`/api/products/${item.productId}/image`}
                        width={80}
                        height={80}
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
                      </div>
                    </div>

                    <p>${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between">
            <h3>Total</h3>
            <p>${subTotal}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
