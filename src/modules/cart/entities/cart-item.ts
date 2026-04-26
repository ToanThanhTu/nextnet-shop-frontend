import type { Product } from "@/modules/products/entities"
import type { User } from "@/modules/users/entities"

export type CartItem = {
  id?: number
  userId?: number | null
  productId: number
  quantity: number
  user?: User
  product: Product
}

export type CartItemDTO = {
  id?: number
  userId?: number | null
  productId: number
  quantity: number
}

export type CartState = {
  cart: CartItem[]
  totalPrice: number
}
