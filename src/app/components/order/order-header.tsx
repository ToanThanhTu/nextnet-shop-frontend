import { formatDate } from "@/lib/utils";

interface Props {
  id: number;
  date: string;
  price: number;
  status: string;
}

function OrderHeader({ id, date, price, status }: Props) {
  const formattedDate = formatDate(date);

  return (
    <div className="flex justify-between w-full">
      <p>ID {id}</p>
      <p>{formattedDate}</p>
      <p>${price}</p>
      <p>{status}</p>
    </div>
  );
}

export default OrderHeader;
