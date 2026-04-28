# cart module

Has both an RTK Query API client and a Redux slice. The slice holds the local cart used for guest browsing pre-login; once authed, the same slice is the in-memory mirror of the server cart, updated optimistically by reducers and reconciled via mutations.

For RTK Query conventions, slice rules, and the listener-middleware pattern see the parent [`src/modules/CLAUDE.md`](../CLAUDE.md) and [`next-frontend/CLAUDE.md`](../../../CLAUDE.md).

## Files at this level

| File | Purpose |
|---|---|
| `index.ts` | Barrel: API hooks + slice actions + entity types |
| `cart.api.ts` | RTK Query endpoints (mutations against `/cart`) |
| `cart.slice.ts` | Local cart state + pure derivations |
| `entities/cart-item.ts` | `CartItem`, `CartItemDTO`, `CartState` types |
| `entities/index.ts` | Entity barrel |

## API surface

| Hook | Endpoint | Method | Auth |
|---|---|---|---|
| `useGetMyCartQuery()` | `/cart` | GET | required |
| `useAddCartItemMutation()` | `/cart/items` | POST | required |
| `useUpdateCartItemMutation()` | `/cart/items` | PUT | required |
| `useRemoveCartItemMutation()` | `/cart/items/{productId}` | DELETE | required |
| `useClearCartMutation()` | `/cart` | DELETE | required |
| `useSyncCartMutation()` | `/cart/sync` | POST | required |

All mutations invalidate the `Cart` tag.

## Slice surface

| Action | Effect |
|---|---|
| `setCartLocal(items)` | Replace cart items, recompute total |
| `resetCartLocal()` | Clear cart |
| `addCartItemLocal(item)` | Add or increment quantity |
| `updateCartItemLocal(item)` | Set absolute quantity |
| `removeCartItemLocal(productId)` | Remove one line |

State shape: `{ cart: CartItem[], totalPrice: number }`. `totalPrice` is always derived; never set it manually.

## Persistence

The listener middleware in `src/lib/storageListeners.ts` reacts to slice actions and writes the localStorage key `NextNetShopCart`. Reducers stay pure.

| Action | localStorage effect |
|---|---|
| `addCartItemLocal`, `updateCartItemLocal`, `removeCartItemLocal`, `setCartLocal` | write `NextNetShopCart` |
| `resetCartLocal` | clear `NextNetShopCart` |

`app-hydrator.tsx` reads `NextNetShopCart` on first client render and dispatches `setCartLocal` to seed the slice.

## Module-specific notes

- **Guest cart is the same slice as authed cart**. Don't introduce a separate guest-cart concept. When the user logs in, `useSyncCartMutation` is called with the local cart contents to merge.
- **Optimistic updates** use the slice; reconciliation uses RTK Query. After a mutation succeeds, the `Cart` tag invalidates and `useGetMyCartQuery` refetches; the slice is reseeded from the server response. Don't try to keep them in sync manually beyond this pattern.
- **`CartItem` embeds the `Product`** at the time of addition. This means cart total is computed from the embedded `salePrice`, which can drift from the server's current price. Order placement re-reads the price server-side; treat the cart's price as a UX hint, not a contract.
- **Don't write localStorage from a reducer**. The listener middleware handles persistence. Adding `localStorage.setItem` inside a reducer would break SSR.
