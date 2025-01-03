"use client";

import Layout from "@/app/(shop)/(browse)/layout";
import Products from "@/app/components/products/products";
import { getProductsByCategoryName } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ category: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{
    category: string;
  } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams).catch((error) => {
      console.error("Error resolving params", error);
    });
  }, [params]);

  let category = "";

  if (resolvedParams !== null) {
    category = resolvedParams.category;
  }

  const productsResult = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategoryName(category),
  });

  if (productsResult.isLoading) {
    return <div>Loading products...</div>;
  }

  const products: Product[] = productsResult.data;

  const headerTitle = category.replace(/-/g, " ").toUpperCase();

  return <Products products={products} />;
}

export default Page;
