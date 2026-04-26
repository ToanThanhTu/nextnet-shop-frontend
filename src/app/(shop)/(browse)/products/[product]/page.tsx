import ProductPage from "@/app/components/products/product/product-page"

export default async function Page({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product } = await params
  return <ProductPage slug={product} />
}
