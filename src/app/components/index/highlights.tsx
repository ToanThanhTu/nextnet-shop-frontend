"use client"

import HighlightCard from "@/app/components/index/highlight-card"
import LoadingTopDeals from "@/app/components/index/loadingTopDeals"
import Discount from "@/app/components/price/sale/discount"
import { CardContent, CardFooter } from "@/app/components/ui/card"
import { highlights } from "@/app/data/hightlights"
import { useGetTopDealsQuery } from "@/lib/features/products/productsSlice"
import Image from "next/image"
import Link from "next/link"

function Highlights() {
  const { data: products = [], isLoading, isSuccess, isError, error } = useGetTopDealsQuery()

  let topDealsContent: React.ReactNode

  if (isLoading) {
    topDealsContent = <LoadingTopDeals />
  } else if (isError) {
    topDealsContent = <div>Error: {error.toString()}</div>
  } else if (isSuccess) {
    topDealsContent = products.map((product) => (
      <div key={product.title}>
        <Link
          href={`/products/${product.slug}`}
          className="hover:cursor-pointer hover:opacity-80 relative"
        >
          <Image
            src={`/api/products/${product.id}/image`}
            alt={`${product.title} image`}
            width={500}
            height={500}
          />

          <Discount sale={product.sale} className="absolute bottom-0 opacity-80 w-full" />
        </Link>
      </div>
    ))
  }

  return (
    <div className="py-12 bg-gray-100">
      <div
        className={
          "px-4 lg:max-w-screen-lg xl:max-w-screen-xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        }
      >
        <HighlightCard title="Top Deals">
          <CardContent className="grid grid-cols-2 gap-2 py-0">{topDealsContent}</CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/all-deals"
              className="hover:cursor-pointer hover:opacity-80 text-ring font-semibold"
            >
              See all deals
            </Link>
          </CardFooter>
        </HighlightCard>

        {highlights.map((highlight) => (
          <HighlightCard key={highlight.title} title={highlight.title}>
            <CardContent className="py-0">
              <Link href={highlight.href} className="hover:cursor-pointer hover:opacity-80">
                <Image
                  src={highlight.image}
                  alt={`${highlight.title} image`}
                  width={500}
                  height={500}
                />
              </Link>
            </CardContent>
            <CardFooter className="pt-0">
              <Link
                href={highlight.href}
                className="hover:cursor-pointer hover:opacity-80 text-ring font-semibold"
              >
                Shop now
              </Link>
            </CardFooter>
          </HighlightCard>
        ))}
      </div>
    </div>
  )
}

export default Highlights
