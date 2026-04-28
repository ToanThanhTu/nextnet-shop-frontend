# orders module

RTK Query module for order placement and history. No client-side state, no slice. The user is identified by the JWT bearer; orders endpoints don't take a user id from the client.

For RTK Query conventions and module structure see the parent [`src/modules/CLAUDE.md`](../CLAUDE.md).

## Files at this level

| File | Purpose |
|---|---|
| `index.ts` | Barrel |
| `orders.api.ts` | RTK Query endpoints |
| `entities/order.ts` | `Order` type |
| `entities/order-item.ts` | `OrderItem` type |
| `entities/payment-details.ts` | `PaymentDetails` type (held alongside the order in the UI) |
| `entities/index.ts` | Entity barrel |

## API surface

| Hook | Endpoint | Method | Notes |
|---|---|---|---|
| `useGetOrdersQuery()` | `/orders` | GET | Returns caller's orders only (provides `Orders` tag) |
| `usePlaceOrderMutation()` | `/orders` | POST | Body: `PlaceOrderRequest`. Invalidates `Orders` and `Cart`. |

`PlaceOrderRequest` shape:

```ts
{
  items: Array<{
    productId: number
    quantity: number
    expectedSalePrice: number
  }>
}
```

The `expectedSalePrice` is sent so the backend can detect price drift since the user added the item — if the server's current price differs, the backend rejects with `CART_MISMATCH` rather than silently charging a different amount.

## Module-specific notes

- **No userId in the request**. The backend reads `User.GetRequiredUserId()` from the JWT. Don't add a `userId` field to `PlaceOrderRequest`.
- **Cart invalidation on place**. `usePlaceOrderMutation` declares `invalidatesTags: ["Orders", "Cart"]`. After a successful order, both the order list and the cart refetch — the backend has cleared the cart inside the placement transaction, so the cart endpoint returns empty.
- **`PaymentDetails` is a UI-side type**. It's not in the backend's `OrderDto`. Live payment integration is deferred work; the type is here so the checkout form and the order summary share a shape.
- **Order status transitions** aren't modelled in the frontend. The backend exposes `PUT /orders/{id}/status` (admin-only) but no frontend hook calls it; that endpoint is for the admin app.
- **No optimistic update on place**. Order placement involves stock and payment; betting on success and rolling back is more complex than waiting for the server. The mutation runs blocking and the UI shows a spinner.
