"use client";

import Quantity from "@/app/components/products/quantity";
import Recommendations from "@/app/components/products/recommendations";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import { setCart } from "@/lib/features/cart/cartSlice";
import { useGetProductBySlugQuery } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useState } from "react";

function ProductPage({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError, error } = useGetProductBySlugQuery(slug);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading product...</div>;
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  } else if (isSuccess) {
    const product = data.product;
    const subCategory = data.subCategory;
    const category = data.category;

    const handleAddToCart = () => {
      const existingItem = cart.find((item) => item.productId === product.id);

      if (existingItem) {
        const updatedCart = cart.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        dispatch(setCart(updatedCart));
      } else {
        dispatch(
          setCart([
            ...cart,
            {
              productId: product.id,
              title: product.title,
              price: product.price,
              salePrice: product.salePrice,
              sale: product.sale,
              quantity,
              stock: product.stock,
            },
          ])
        );
      }
    };

    content = (
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
              <BreadcrumbLink href={`/${category.slug}/${subCategory.slug}`}>
                {subCategory.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products/${product.slug}`}>{product.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-2 gap-4">
          <Image
            src={`/api/products/${product.id}/image`}
            alt={product.title}
            width={1000}
            height={1000}
          />
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

            {product.stock && product.stock > 0 && (
              <div>
                <Quantity quantity={quantity} setQuantity={setQuantity} stock={product.stock} />

                {product.stock < 10 ? <p>Low stock - {product.stock} items left</p> : null}
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </div>
            )}

            <p>{product.description}</p>
          </div>
        </div>

        <Recommendations productId={product.id} />
      </div>
    );
  }

  return <>{content}</>;
}

export default ProductPage;
