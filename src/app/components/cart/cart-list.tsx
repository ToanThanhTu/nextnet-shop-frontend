import CartItemQuantity from "@/app/components/cart/cart-item-quantity";
import { CartItem, CartItemDTO, UserDTO } from "@/app/types";
import {
  removeCartItemLocal,
  updateCartItemLocal,
  useRemoveCartItemServerMutation,
  useUpdateCartItemServerMutation,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

function CartList({ cart, user }: { cart: CartItem[]; user: UserDTO | null }) {
  const dispatch = useAppDispatch();

  const [
    updateCartItemServer,
    { isLoading: isUpdateItemLoading, isError: isUpdateItemError, error: updateItemError },
  ] = useUpdateCartItemServerMutation();

  const [
    removeCartItemServer,
    { isLoading: isRemoveItemLoading, isError: isRemoveItemError, error: removeItemError },
  ] = useRemoveCartItemServerMutation();

  const updateQuantity = async (productId: number, newQuantity: number) => {
    // remove item if quantity is 0
    if (newQuantity < 1) {
      if (user) {
        const removeCartItem: CartItemDTO = {
          productId: productId,
          userId: user.id,
          quantity: 0,
        };

        await removeCartItemServer(removeCartItem);

        if (isRemoveItemError) {
          alert(`Error removing item from cart: ${removeItemError}.\nPlease try again!`);
          return;
        }
      } else {
        dispatch(removeCartItemLocal(productId));
        return;
      }
    }

    const updatedCartItem: CartItemDTO = {
      productId: productId,
      quantity: newQuantity,
    };

    if (user) {
      updatedCartItem.userId = user.id;
      await updateCartItemServer(updatedCartItem);

      if (isUpdateItemError) {
        alert(`Error updating item in cart: ${updateItemError}.\nPlease try again!`);
        return;
      }
    } else {
      dispatch(updateCartItemLocal(updatedCartItem));
    }
  };

  return (
    <>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.productId}>
              <div className="flex items-center gap-2">
                <Image
                  src={`/api/products/${item.productId}/image`}
                  width={90}
                  height={90}
                  alt={`${item.product.title} image`}
                />
                <div className="w-full space-y-2">
                  <h6 className="font-semibold">{item.product.title}</h6>

                  <div className="lg:flex items-center justify-between space-y-2">
                    <CartItemQuantity
                      quantity={item.quantity}
                      handleAddQuantity={() => updateQuantity(item.productId, item.quantity + 1)}
                      handleSubtractQuantity={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      handleQuantityChange={(e) =>
                        updateQuantity(item.productId, Number(e.target.value))
                      }
                      isLoading={isUpdateItemLoading || isRemoveItemLoading}
                    />
                    <p>${item.product.price}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CartList;
