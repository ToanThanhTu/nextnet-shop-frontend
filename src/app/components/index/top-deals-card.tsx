"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useGetTopDealsQuery } from "@/lib/features/products/productsSlice";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function TopDealsCard() {
  const { data: products = [], isLoading, isSuccess, isError, error } = useGetTopDealsQuery();

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading Top Deals...</div>;
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  } else if (isSuccess) {
    content = products.map((product) => (
      <div key={product.title}>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={`/api/products/${product.id}/image`}
            alt={`${product.title} image`}
            width={500}
            height={500}
          />
          <p>{product.sale}% OFF </p>
          <p>Limited time deal</p>
        </Link>
      </div>
    ));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Deals</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">{content}</CardContent>
      <CardFooter>
        <Link href="/all-deals">See all deals</Link>
      </CardFooter>
    </Card>
  );
}

export default TopDealsCard;
