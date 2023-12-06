import { useAddToCart } from "../api/addToCart";
import { CartItem } from "../types";

interface AddToCartButtonProps {
  cartItem: CartItem;
}

export function AddToCartButton({ cartItem }: AddToCartButtonProps) {
  const addToCartMutation = useAddToCart();
  return (
    <button onClick={() => addToCartMutation.trigger(cartItem)}>
      Add to cart
    </button>
  );
}
