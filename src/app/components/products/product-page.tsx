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
import { CartItem, CartItemDTO } from "@/app/types";
import { addCartItemLocal, useAddCartItemServerMutation } from "@/lib/features/cart/cartSlice";
import { useGetProductBySlugQuery } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useState } from "react";

function ProductPage({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError, error } = useGetProductBySlugQuery(slug);

  const [addCartItemServer, { isLoading: isAddCartLoading }] = useAddCartItemServerMutation();

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading product...</div>;
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  } else if (isSuccess) {
    const product = data.product;
    const subCategory = data.subCategory;
    const category = data.category;

    const handleAddToCart = async () => {
      const newCartItem: CartItem = {
        productId: product.id,
        product: product,
        quantity: quantity,
      };

      if (user) {
        const newCartItemServer: CartItemDTO = {
          userId: user.id,
          productId: product.id,
          quantity: quantity,
        };

        await addCartItemServer(newCartItemServer);
      } else {
        dispatch(addCartItemLocal(newCartItem));
      }
    };

    content = (
      <div className="px-4 lg:px-40">
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

        <div className="lg:grid grid-cols-2 gap-4">
          <Image
            src={`/api/products/${product.id}/image`}
            alt={product.title}
            width={1000}
            height={1000}
          />
          <div className="py-4 space-y-2 lg:py-0 lg:space-y-0">
            <h2>{product.title}</h2>

            <div className="flex gap-2">
              <p className={`${product.sale > 0 && "text-red-500"} sale-price`}>
                ${product.salePrice}
              </p>
              <p className="org-price">was ${product.price}</p>
            </div>

            {product.sale > 0 && (
              <div className="flex">
                <p className="py-1 px-2 bg-red-500 text-white sale-text mr-1">SALE</p>
                <p className="py-1 px-2 bg-green-500 text-white sale-text">{product.sale}% OFF</p>
              </div>
            )}

            {product.stock === 0 && <p>Out of stock</p>}

            {product.stock && product.stock > 0 && (
              <div className="space-y-4">
                <Quantity quantity={quantity} setQuantity={setQuantity} stock={product.stock} />

                {product.stock < 10 ? <p>Low stock - {product.stock} items left</p> : null}
                <Button className="w-full uppercase" size="lg" onClick={handleAddToCart} disabled={isAddCartLoading}>
                  Add to cart
                </Button>
              </div>
            )}

            <h3 className="pt-8">Description</h3>
            <p className="py-2">{product.description}</p>
          </div>
        </div>

        <Recommendations productId={product.id} />
      </div>
    );
  }

  return <>{content}</>;
}

export default ProductPage;
