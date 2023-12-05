import { Image } from "@/features/images";

import { useRemoveFromCart } from "../api/removeFromCart";

interface RemoveFromCartButtonProps {
  id: Image["id"];
}

export function RemoveFromCartButton({ id }: RemoveFromCartButtonProps) {
  const removeFromCartMutation = useRemoveFromCart();
  return (
    <button onClick={() => removeFromCartMutation.trigger({ id })}>
      Remove from cart
    </button>
  );
}
