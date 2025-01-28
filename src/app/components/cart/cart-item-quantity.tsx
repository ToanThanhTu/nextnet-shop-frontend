import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  handleAddQuantity: () => void;
  handleSubtractQuantity: () => void;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

function CartItemQuantity({
  quantity,
  handleAddQuantity,
  handleSubtractQuantity,
  handleQuantityChange,
  isLoading,
}: Props) {
  return (
    <div className="flex text-sm">
      <button
        onClick={handleSubtractQuantity}
        className="px-2 hover:bg-black hover:text-white border border-black"
        disabled={isLoading}
      >
        <Minus size={18} />
      </button>
      <input
        value={quantity}
        onChange={handleQuantityChange}
        className="px-1 w-10 text-center border border-black"
        disabled={isLoading}
      />
      <button
        onClick={handleAddQuantity}
        className="px-2 hover:bg-black hover:text-white border border-black"
        disabled={isLoading}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}

export default CartItemQuantity;
