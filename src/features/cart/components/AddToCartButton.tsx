import { Image } from "@/features/images";

import { useAddToCart } from "../api/addToCart";

interface AddToCartButtonProps {
  id: Image["id"];
}

export function AddToCartButton({ id }: AddToCartButtonProps) {
  const addToCartMutation = useAddToCart();
  return (
    <button onClick={() => addToCartMutation.trigger({ id })}>
      Add to cart
    </button>
  );
}
