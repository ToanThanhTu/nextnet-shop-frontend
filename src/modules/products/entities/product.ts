export type Product = {
  id: number
  title: string
  slug: string
  description?: string
  price: number
  sale: number
  salePrice: number
  stock?: number
  image?: string
  subCategoryId?: number
}
