import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { Product } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

function RecommendationsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel className="w-full lg:max-w-5xl m-auto">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/4">
            <Link href={`/products/${product.slug}`} className="flex flex-col items-center space-y-2">
              <Image
                src={`/api/products/${product.id}/image`}
                alt={`${product.title} Image`}
                width={250}
                height={250}
              />
              <h5 className="font-semibold">{product.title}</h5>
              <p className={`${product.sale > 0 && "text-red-500"} sale-price`}>${product.salePrice}</p>

              {product.sale > 0 && (
                <div>
                  <span className="bg-green-500 text-white py-1 px-2 sale-text">{product.sale}% OFF</span>{" "}
                  <span className="org-price">was ${product.price}</span>
                </div>
              )}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="lg:-left-16" />
      <CarouselNext className="lg:-right-16" />
    </Carousel>
  );
}

export default RecommendationsCarousel;
