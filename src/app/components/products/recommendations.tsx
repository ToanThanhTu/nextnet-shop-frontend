"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";
import { getProductsRecommendations } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

function Recommendations({ productId }: { productId: number }) {
  const productsResult = useQuery({
    queryKey: ["recommendations", { productId }],
    queryFn: async () => getProductsRecommendations(productId),
  });

  if (productsResult.isLoading) {
    return <div className="text-center">Loading recommendations...</div>;
  }

  const products: Product[] = productsResult.data;

  if (!products || products.length === 0) {
    return <div className="text-center">Sorry, no recommendations for now</div>;
  }

  return (
    <div>
      <h2 className="text-center">You may also like</h2>

      <Carousel className="w-full max-w-5xl m-auto">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4">
              <Link href={`/products/${product.slug}`} className="flex flex-col items-center">
                <Image
                  src={`/api/products/${product.id}/image`}
                  alt={`${product.title} Image`}
                  width={250}
                  height={250}
                />
                <h4>{product.title}</h4>
                <p>${product.salePrice}</p>

                {product.sale > 0 && (
                  <p className="text-xs">
                    <span className="bg-red-700 text-white p-1">{product.sale}% OFF</span>{" "}
                    <span>was ${product.price}</span>
                  </p>
                )}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-16" />
        <CarouselNext className="-right-16" />
      </Carousel>
    </div>
  );
}

export default Recommendations;
