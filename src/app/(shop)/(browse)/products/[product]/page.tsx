"use client";

import ProductPage from "@/app/components/products/product/product-page";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ product: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ product: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams).catch((error) => {
      console.error("Failed to resolve params", error);
    });
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const slug = resolvedParams.product;

  return <ProductPage slug={slug} />;
}

export default Page;
