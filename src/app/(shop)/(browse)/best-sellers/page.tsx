"use client";

import ProductCard from "@/app/components/products/product-card";
import { getBestSellers } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

function Page() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: getBestSellers,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError || !products) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Page;
