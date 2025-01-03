import { Product } from "@/app/types";
import Image from "next/image";

function ProductCard({ product }: { product: Product }) {
  let price = product.price;

  if (product.sale) {
    price = Math.round((price - (price * product.sale) / 100) * 100) / 100;
  }

  return (
    <div>
      <Image
        src={`http://localhost:3001/products/${product.id}/image`}
        alt={product.title}
        width={500}
        height={500}
      />
      <h4>{product.title}</h4>
      <div>
        <span>${price}</span>{" "}
        {product.sale && <span>Was ${product.price}</span>}
      </div>

      {product.sale && (
        <div>
          <span>SALE</span>
          <span>{product.sale}% OFF</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
