import CartItemQuantity from "@/app/components/cart/cart-item-quantity";
import { CartItem, CartItemDTO, User } from "@/app/types";
import {
  removeCartItemLocal,
  updateCartItemLocal,
  useRemoveCartItemServerMutation,
  useUpdateCartItemServerMutation,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

function CartList({ cart, user }: { cart: CartItem[]; user: User | null }) {
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
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={`/api/products/${item.productId}/image`}
                    width={80}
                    height={80}
                    alt={`${item.product.title} image`}
                  />
                  <div className="col-span-2">
                    <p>{item.product.title}</p>
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
                  </div>
                </div>

                <p>${item.product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CartList;
