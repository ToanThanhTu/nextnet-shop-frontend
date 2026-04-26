import Products from "@/app/components/products/products"

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return <Products endpoint="all" category={category} />
}
