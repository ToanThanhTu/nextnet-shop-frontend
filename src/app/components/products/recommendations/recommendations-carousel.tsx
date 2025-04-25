import Price from "@/app/components/price/price"
import Sale from "@/app/components/price/sale/sale"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel"
import { Product } from "@/app/types"
import Image from "next/image"
import Link from "next/link"

function RecommendationsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel className="w-full lg:max-w-5xl m-auto">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/4">
            <Link
              href={`/products/${product.slug}`}
              className="flex flex-col items-center space-y-2"
            >
              <Image
                src={`/product-images/${product.slug}.webp`}
                alt={`${product.title} Image`}
                width={250}
                height={250}
              />
              <h5 className="font-semibold">{product.title}</h5>
              {product.sale > 0 ? (
                <Price variant="onSale" price={product.salePrice} />
              ) : (
                <Price variant="org" price={product.price} />
              )}

              {product.sale > 0 && <Sale sale={product.sale} />}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="lg:-left-16" />
      <CarouselNext className="lg:-right-16" />
    </Carousel>
  )
}

export default RecommendationsCarousel
