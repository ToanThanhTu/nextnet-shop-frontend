"use client";

import Recommendations from "@/app/components/products/recommendations";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { getProductBySlug } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface ProductResults {
  product: Product;
  subCategory: {
    title: string;
    slug: string;
  };
  category: {
    title: string;
    slug: string;
  };
}

function ProductPage({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);

  const results = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => getProductBySlug(slug),
  });

  if (results.isLoading) {
    return <div>Loading product...</div>;
  }

  const productResults: ProductResults = results.data;
  const product = productResults.product;
  const subCategory = productResults.subCategory;
  const category = productResults.category;

  const handleAddQuantity = () => {
    const newQuantity = quantity + 1;

    if (newQuantity > product.stock) {
      setQuantity(product.stock);
      alert("You can't add more than the available stock");
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleSubtractQuantity = () => {
    const newQuantity = quantity - 1;

    if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity > product.stock) {
      setQuantity(product.stock);
      alert("You can't add more than the available stock");
    } else if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="px-40">
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${category.slug}`}>{category.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${category.slug}/${subCategory.slug}`}>{subCategory.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.slug}`}>{product.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-2 gap-4">
        <Image src={`/api/products/${product.id}/image`} alt={product.title} width={1000} height={1000} />
        <div>
          <h1>{product.title}</h1>
          <p>{product.salePrice}</p>

          {product.sale > 0 && (
            <div>
              <p>Was ${product.price}</p>
              <p className="p-1 bg-red-500 text-white text-xs mr-1">SALE</p>
              <p className="p-1 bg-green-500 text-white text-xs">{product.sale}% OFF</p>
            </div>
          )}

          {product.stock === 0 && <p>Out of stock</p>}

          {product.stock > 0 && (
            <div>
              <p className="uppercase">Quantity</p>
              <div className="flex items-center gap-1">
                <Button variant="outline" onClick={handleSubtractQuantity}>
                  -
                </Button>
                <Input type="number" value={quantity} onChange={handleQuantityChange} className="w-16" />
                <Button variant="outline" onClick={handleAddQuantity}>
                  +
                </Button>
              </div>

              {product.stock < 10 ? <p>Low stock - {product.stock} items left</p> : null}
              <Button>Add to cart</Button>
            </div>
          )}

          <p>{product.description}</p>
        </div>
      </div>

      <Recommendations productId={product.id} />
    </div>
  );
}

export default ProductPage;
