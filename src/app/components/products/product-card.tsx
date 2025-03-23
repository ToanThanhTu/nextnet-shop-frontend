import Price from "@/app/components/price/price"
import Sale from "@/app/components/price/sale/sale"
import { Product } from "@/app/types"
import Image from "next/image"
import Link from "next/link"

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
        {product.sale > 0 ? (
          <Price variant="onSale" price={product.salePrice} />
        ) : (
          <Price variant="org" price={product.price} />
        )}
        {product.sale > 0 && <Price variant="strikethrough" price={product.price} />}
      </div>

      {product.sale > 0 && <Sale sale={product.sale} />}
    </div>
  )
}

export default ProductCard
