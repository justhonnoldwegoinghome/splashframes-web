import { useAddToWishlist } from "../api/addToWishlist";
import { WishlistItem } from "../types";

interface AddToWishlistButtonProps {
  wishlistItem: WishlistItem;
}

export function AddToWishlistButton({
  wishlistItem,
}: AddToWishlistButtonProps) {
  const addToWishlistMutation = useAddToWishlist();

  return (
    <button onClick={() => addToWishlistMutation.trigger(wishlistItem)}>
      Add to wishlist
    </button>
  );
}
