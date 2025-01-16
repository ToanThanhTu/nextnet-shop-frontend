"use client";

import Products from "@/app/components/products/products";

function Page() {
  return <Products endpoint="sales" queryKey="sales" />;
}

export default Page;
