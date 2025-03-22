"use client"

import HighlightCard from "@/app/components/index/highlight-card"
import { CardContent, CardFooter } from "@/app/components/ui/card"
import { highlights } from "@/app/data/hightlights"
import { useGetTopDealsQuery } from "@/lib/features/products/productsSlice"
import Image from "next/image"
import Link from "next/link"

function Highlights() {
  const { data: products = [], isLoading, isSuccess, isError, error } = useGetTopDealsQuery()

  let topDealsContent: React.ReactNode

  if (isLoading) {
    topDealsContent = <div>Loading Top Deals...</div>
  } else if (isError) {
    topDealsContent = <div>Error: {error.toString()}</div>
  } else if (isSuccess) {
    topDealsContent = products.map((product) => (
      <div key={product.title}>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={`/api/products/${product.id}/image`}
            alt={`${product.title} image`}
            width={500}
            height={500}
          />
          <p>{product.sale}% OFF </p>
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
          <CardContent className="grid grid-cols-2 gap-2">{topDealsContent}</CardContent>
          <CardFooter>
            <Link href="/all-deals">See all deals</Link>
          </CardFooter>
        </HighlightCard>

        {highlights.map((highlight) => (
          <HighlightCard key={highlight.title} title={highlight.title}>
            <CardContent className="py-0">
              <Link href={highlight.href}>
                <Image
                  src={highlight.image}
                  alt={`${highlight.title} image`}
                  width={500}
                  height={500}
                />
              </Link>
            </CardContent>
            <CardFooter>
              <Link href={highlight.href}>Shop now</Link>
            </CardFooter>
          </HighlightCard>
        ))}
      </div>
    </div>
  )
}

export default Highlights
