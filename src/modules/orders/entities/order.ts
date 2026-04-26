import type { OrderItem, OrderItemDTO } from "./order-item"

export type Order = {
  id: number
  userId: number
  orderDate: string
  totalPrice: number
  status: string
  orderItems: OrderItem[]
}

export type OrderDTO = {
  id: number
  orderDate: string
  totalPrice: number
  status: string
  orderItems: OrderItemDTO[]
}
