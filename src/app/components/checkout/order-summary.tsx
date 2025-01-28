import CartList from "@/app/components/cart/cart-list";
import { CartItem, User } from "@/app/types";

function OrderSummary({
  cart,
  totalPrice,
  user,
}: {
  cart: CartItem[];
  totalPrice: number;
  user: User | null;
}) {
  return (
    <div>
      <h2>Order Summary</h2>

      <CartList cart={cart} user={user} />

      <div className="flex justify-between">
        <h3>Total</h3>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
