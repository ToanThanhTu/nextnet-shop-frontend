"use client"

import Price from "@/app/components/price/price"
import Discount from "@/app/components/price/sale/discount"
import SaleText from "@/app/components/price/sale/saleText"
import Loading from "@/app/components/products/product/loading"
import Quantity from "@/app/components/products/product/quantity"
import Recommendations from "@/app/components/products/recommendations/recommendations"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { Button } from "@/app/components/ui/button"
import { CartItem, CartItemDTO } from "@/app/types"
import { addCartItemLocal, useAddCartItemServerMutation } from "@/lib/features/cart/cartSlice"
import { useGetProductBySlugQuery } from "@/lib/features/products/productsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { LoaderPinwheel } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

function ProductPage({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const { data, isLoading, isSuccess, isError, error } = useGetProductBySlugQuery(slug)

  const [addCartItemServer, { isLoading: isAddCartLoading }] = useAddCartItemServerMutation()

  let content: React.ReactNode

  if (isLoading) {
    content = <Loading />
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>
  } else if (isSuccess) {
    const product = data.product
    const subCategory = data.subCategory
    const category = data.category

    const handleAddToCart = async () => {
      const newCartItem: CartItem = {
        productId: product.id,
        product: product,
        quantity: quantity,
      }

      if (user) {
        const newCartItemServer: CartItemDTO = {
          userId: user.id,
          productId: product.id,
          quantity: quantity,
        }

        await addCartItemServer(newCartItemServer)
      } else {
        dispatch(addCartItemLocal(newCartItem))
      }
    }

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
          <div className={cn("py-4 flex flex-col gap-4", "lg:py-0")}>
            <h2 className="text-3xl font-bold">{product.title}</h2>

            <div className="flex">
              {product.sale > 0 ? (
                <Price variant="onSale" price={product.salePrice} />
              ) : (
                <Price variant="org" price={product.price} />
              )}
              {product.sale > 0 && <Price variant="strikethrough" price={product.price} />}
            </div>

            {product.sale > 0 && (
              <div className="flex">
                <SaleText />
                <Discount sale={product.sale} />
              </div>
            )}

            {product.stock === 0 && <p>Out of stock</p>}

            {product.stock && product.stock > 0 && (
              <div className="flex flex-col gap-4">
                <Quantity quantity={quantity} setQuantity={setQuantity} stock={product.stock} />

                {product.stock < 10 ? <p>Low stock - {product.stock} items left</p> : null}
                <Button
                  className="uppercase hover:cursor-pointer w-fit"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddCartLoading}
                >
                  {isAddCartLoading ? <LoaderPinwheel color="white" className="animate-spin" /> : "Add to cart"}
                </Button>
              </div>
            )}

            <h3 className="text-xl font-semibold">Description</h3>
            <p className="">{product.description}</p>
          </div>
        </div>

        <Recommendations productId={product.id} />
      </div>
    )
  }

  return <>{content}</>
}

export default ProductPage
