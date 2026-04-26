import Products from "@/app/components/products/products"

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>
}) {
  const { category, subcategory } = await params
  return <Products endpoint="all" category={category} subcategory={subcategory} />
}
