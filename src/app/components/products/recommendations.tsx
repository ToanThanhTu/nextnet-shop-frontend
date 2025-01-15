"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { Product } from "@/app/types";
import { useGetProductsRecommendationsQuery } from "@/lib/features/products/productsSlice";
import Image from "next/image";
import Link from "next/link";

function Recommendations({ productId }: { productId: number }) {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsRecommendationsQuery(productId);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div className="text-center">Loading recommendations...</div>;
  } else if (isError || !products || products.length === 0) {
    content = <div className="text-center">Sorry, no recommendations for now</div>;
  } else if (isSuccess) {
    content = (
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
    );
  }

  return (
    <div>
      <h2 className="text-center">You may also like</h2>
      {content}
    </div>
  );
}

export default Recommendations;
