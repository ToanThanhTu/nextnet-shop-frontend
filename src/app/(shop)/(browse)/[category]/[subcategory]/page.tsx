"use client";

import Products from "@/app/components/products/products";
import { useEffect, useState } from "react";

function Page({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{
    category: string;
    subcategory: string;
  } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams).catch((error) => {
      console.error("Error resolving params", error);
    });
  }, [params]);

  let category = "";
  let subcategory = "";

  if (resolvedParams !== null) {
    category = resolvedParams.category;
    subcategory = resolvedParams.subcategory;
  }

  return <Products endpoint="all" queryKey={subcategory} category={category} subcategory={subcategory} />;
}

export default Page;
