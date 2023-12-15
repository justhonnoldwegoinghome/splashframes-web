import _ from "lodash";

import { useCartItems } from "../api/getCartItems";
import { useUpdateCartItems } from "../api/updateCartItems";
import { CartItem } from "../types";

interface AddCartItemButtonProps {
  cartItem: CartItem;
}

export function AddCartItemButton({ cartItem }: AddCartItemButtonProps) {
  const cartItemsQuery = useCartItems();
  const updateCartItemsMutation = useUpdateCartItems({
    successMsg: "Added to cart",
  });

  if (!cartItemsQuery.data) return;

  const cartItems = cartItemsQuery.data.results;

  const isInCartItems = cartItems
    .map((c) => c.product_id)
    .includes(cartItem.product_id);

  const updatedCartItems = isInCartItems
    ? _.map(cartItems, (c) => {
        if (c.product_id === cartItem.product_id) {
          return { ...c, quantity: c.quantity + 1 };
        } else {
          return c;
        }
      })
    : [...cartItems, cartItem];

  return (
    <button
      onClick={() =>
        updateCartItemsMutation.trigger({ data: updatedCartItems })
      }
    >
      Add to cart
    </button>
  );
}
