import CartList from "@/app/components/cart/cart-list";
import { CartItem, UserDTO } from "@/app/types";

function OrderSummary({
  cart,
  totalPrice,
  user,
}: {
  cart: CartItem[];
  totalPrice: number;
  user: UserDTO | null;
}) {
  return (
    <div className="lg:order-2">
      <h3 className="py-4 font-bold">Order Summary</h3>

      <CartList cart={cart} user={user} />

      <div className="flex justify-between items-center py-4">
        <h3 className="text-lg font-semibold">Total</h3>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
