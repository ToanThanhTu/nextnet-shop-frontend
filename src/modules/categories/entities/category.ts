import type { SubCategory } from "./sub-category"

export type Category = {
  id: number
  title: string
  slug?: string
  description?: string
  href?: string
  image?: string
  subCategories?: SubCategory[]
}
