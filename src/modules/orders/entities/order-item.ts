import type { Product } from "@/modules/products/entities"

export type OrderItem = {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  product: Product
}

export type OrderItemDTO = {
  id: number
  productId: number
  quantity: number
  price: number
  product: Product
}
