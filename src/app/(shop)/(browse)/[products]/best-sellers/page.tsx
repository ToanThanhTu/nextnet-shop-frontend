"use client";

import Products from "@/app/components/products/products";

function Page() {
  return <Products endpoint="bestsellers" queryKey="bestsellers" />;
}

export default Page;
