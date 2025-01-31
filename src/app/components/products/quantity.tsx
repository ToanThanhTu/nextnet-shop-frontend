import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

function Quantity({ quantity, setQuantity, stock }: Props) {
  const handleAddQuantity = () => {
    const newQuantity = quantity + 1;

    if (newQuantity > stock) {
      setQuantity(stock);
      alert("You can't add more than the available stock");
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleSubtractQuantity = () => {
    const newQuantity = quantity - 1;

    if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity > stock) {
      setQuantity(stock);
      alert("You can't add more than the available stock");
    } else if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-2">
      <h5 className="">Quantity:</h5>
      <div className="flex items-center gap-1">
        <Button variant="outline" onClick={handleSubtractQuantity}>
          -
        </Button>
        <Input type="number" value={quantity} onChange={handleQuantityChange} className="w-16" />
        <Button variant="outline" onClick={handleAddQuantity}>
          +
        </Button>
      </div>
    </div>
  );
}

export default Quantity;
