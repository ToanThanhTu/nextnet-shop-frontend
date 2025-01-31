import { Product } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      <Link href={`/products/${product.slug}`} className="space-y-2">
        <Image
          src={`/api/products/${product.id}/image`}
          alt={product.title}
          width={500}
          height={500}
        />
        <h5 className="font-semibold">{product.title}</h5>
      </Link>

      <div>
          <span className={`${product.sale > 0 && "text-red-500"} sale-price`}>
            ${product.salePrice}
          </span>{" "}
          {product.sale > 0 && <span className="org-price">was ${product.price}</span>}
      </div>

      {product.sale > 0 && (
        <div className="sale-text space-x-1">
          <span className="py-1 px-2 bg-red-500 text-white">SALE</span>
          <span className="py-1 px-2 bg-green-500 text-white">{product.sale}% OFF</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
