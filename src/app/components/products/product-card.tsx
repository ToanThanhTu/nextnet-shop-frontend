import { Product } from "@/app/types";
import Image from "next/image";

function ProductCard({ product }: { product: Product }) {
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
        <span className={`${product.sale > 0 && "text-red-500"} font-semibold`}>${product.salePrice}</span>{" "}
        {product.sale > 0 && <span className="text-xs">was ${product.price}</span>}
      </div>

      {product.sale > 0 && (
        <div className="mt-2">
          <span className="p-1 bg-red-500 text-white text-xs mr-1">SALE</span>
          <span className="p-1 bg-green-500 text-white text-xs">{product.sale}% OFF</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
