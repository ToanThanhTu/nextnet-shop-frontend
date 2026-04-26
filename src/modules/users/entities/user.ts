import type { CartItemDTO } from "@/modules/cart/entities"
import type { OrderDTO } from "@/modules/orders/entities"

/**
 * Server-shape User including PasswordHash. Avoid using this client-side;
 * UserDTO is the safe API-boundary shape.
 */
export type User = {
  id: number
  name: string
  email: string
  password: string
  role: string
  cartItems?: CartItemDTO[]
  orders?: OrderDTO[]
}

/** Safe, sanitised user for client consumption. */
export type UserDTO = {
  id: number
  name: string
  email: string
  role: string
  cartItems?: CartItemDTO[]
  orders?: OrderDTO[]
}

export type UserRegistration = {
  name: string
  email: string
  password: string
}

export type Auth = {
  token: null | string
  user: null | UserDTO
  loading: boolean
  error: null | string
  success: boolean
}
