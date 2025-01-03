"use client";

import Layout from "@/app/(shop)/(browse)/layout";
import Products from "@/app/components/products/products";
import { getProductsBySubCategoryName } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ subcategory: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{
    subcategory: string;
  } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams).catch((error) => {
      console.error("Error resolving params", error);
    });
  }, [params]);

  let subcategory = "";

  if (resolvedParams !== null) {
    subcategory = resolvedParams.subcategory;
  }

  const productsResult = useQuery({
    queryKey: ["products", subcategory],
    queryFn: () => getProductsBySubCategoryName(subcategory),
  });

  if (productsResult.isLoading) {
    return <div>Loading products...</div>;
  }

  const products: Product[] = productsResult.data;

  const headerTitle = subcategory.replace(/-/g, " ").toUpperCase();

  return <Products products={products} />;
}

export default Page;
