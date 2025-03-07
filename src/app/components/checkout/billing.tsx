import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { CartItem, UserDTO } from "@/app/types";
import { resetCartLocal } from "@/lib/features/cart/cartSlice";
import { usePlaceOrderMutation } from "@/lib/features/order/orderSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Billing({ cart, user }: { cart: CartItem[]; user: UserDTO | null }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [placeOrder, { isLoading: isPlaceOrderLoading }] = usePlaceOrderMutation();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please sign in to place order!");
      return;
    }

    try {
      await placeOrder({ userId: user.id, cartItems: cart });

      dispatch(resetCartLocal());
      alert("Order placed successfully!");
      router.push("/account/orders");
    } catch (error) {
      alert(`Error placing order: ${error}.\nPlease try again!`);
      return;
    }
  };

  return (
    <div className="lg:order-1">
      {user ? (
        <form>
          <p className="text-sm italic">Information are prefilled for demo purpose</p>

          <h3 className="py-4">Contact</h3>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={user.name ?? "Demo User"} readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value="1234567890" readOnly />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email ?? "demo@nextnetshop.com"}
                readOnly
              />
            </div>
          </div>

          <h3 className="py-4">Delivery</h3>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value="Demo User" readOnly />
            </div>
            <div className="flex flex-col space-y-2">
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
          </div>

          <h3 className="py-4">Payment</h3>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
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
          </div>

          <Button
            className="uppercase w-full h-12 mt-4"
            onClick={handlePlaceOrder}
            disabled={isPlaceOrderLoading}
          >
            {isPlaceOrderLoading ? <LoaderPinwheel className="animate-spin" /> : "Place Order"}
          </Button>
        </form>
      ) : (
        <div className="">
          <div className="flex items-center space-x-6">
            <Image
              src="/membership-card-tilted.png"
              alt="Membership Card Image"
              width={450}
              height={250}
              className="w-[100px]"
            />

            <p>Register or Sign In to place your order!</p>
          </div>

          <div className="space-x-4">
            <Button className="uppercase w-60 h-12" onClick={() => router.push("/signin")}>
              Sign in to Next Net Shop
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
    </div>
  );
}

export default Billing;
