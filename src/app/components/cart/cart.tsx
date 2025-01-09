import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCart fontSize="large" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Your Shopping Cart</SheetDescription>
        </SheetHeader>
        <div>

        </div>
        <SheetFooter className="block">
          <div className="flex justify-between">
            <p>Order Subtotal</p>
            <p>$300.00</p>
          </div>
          <Button className="uppercase">Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
