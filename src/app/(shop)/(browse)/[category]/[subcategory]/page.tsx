"use client";

import Products from "@/app/components/products/products";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ category: string; subcategory: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams).catch((error) => {
      console.error("Failed to resolve params", error);
    });
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { category, subcategory } = resolvedParams;

  return <Products endpoint="all" queryKey={subcategory} category={category} subcategory={subcategory} />;
}

export default Page;
