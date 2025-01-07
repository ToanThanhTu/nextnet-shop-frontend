"use client";

import Products from "@/app/components/products/products";
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

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  category = resolvedParams.category;

  return <Products endpoint="all" queryKey={category} category={category} />;
}

export default Page;
