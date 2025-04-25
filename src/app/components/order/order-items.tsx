import { OrderItem } from "@/app/types";
import Image from "next/image";

interface Props {
  items: OrderItem[];
}

function OrderItems({ items }: Props) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="py-2">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Image
                src={`/product-images/${item.product.slug}.webp`}
                width={100}
                height={100}
                alt={`${item.product.title} image`}
              />
              <div className="col-span-2">
                <p>{item.product.title}</p>
              </div>
            </div>

            <p>${item.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OrderItems;
