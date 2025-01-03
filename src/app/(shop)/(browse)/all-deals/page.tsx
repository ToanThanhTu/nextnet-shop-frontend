"use client";

import Products from "@/app/components/products/products";
import { getOnSaleProducts } from "@/app/requests";
import { useQuery } from "@tanstack/react-query";
import { Metadata } from "next";

// export const dynamic = "force-dynamic";
// export const metadata: Metadata = {
//   creator: "Trevor Tu",
//   title: "Today's Deals - Next Net Shop",
// };
// export const revalidate = 60;

function Page() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: getOnSaleProducts,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError || !products) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div>
      <Products products={products} />
    </div>
  );
}

export default Page;
