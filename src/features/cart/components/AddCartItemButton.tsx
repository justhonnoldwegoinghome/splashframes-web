import { useCartItems } from "../api/getCartItems";
import { useCreateCartItem } from "../api/createCartItem";
import { useUpdateCartItem } from "../api/updateCartItem";
import { CartItem } from "../types";

interface AddCartItemButtonProps {
  cartItem: CartItem;
}

export function AddCartItemButton({ cartItem }: AddCartItemButtonProps) {
  const cartItemsQuery = useCartItems();
  const createCartItemMutation = useCreateCartItem();
  const updateCartItemMutation = useUpdateCartItem();

  if (!cartItemsQuery.data) return;

  const isInCartItems = cartItemsQuery.data.results
    .map((c) => c.product_id)
    .includes(cartItem.product_id);

  if (!isInCartItems)
    return (
      <button onClick={() => createCartItemMutation.trigger(cartItem)}>
        Create cart item
      </button>
    );

  const curCartItem = cartItemsQuery.data.results.filter(
    (c) => c.product_id === cartItem.product_id
  )[0];

  return (
    <button
      onClick={() =>
        updateCartItemMutation.trigger({
          product_id: curCartItem.product_id,
          quantity: curCartItem.quantity + 1,
        })
      }
    >
      Update cart item
    </button>
  );
}
