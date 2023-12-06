import { useRemoveFromWishlist } from "../api/removeFromWishlist";
import { WishlistItem } from "../types";

interface RemoveFromWishlistButtonProps {
  wishlistItem: WishlistItem;
}

export function RemoveFromWishlistButton({
  wishlistItem,
}: RemoveFromWishlistButtonProps) {
  const removeFromWishlistMutation = useRemoveFromWishlist();

  return (
    <button onClick={() => removeFromWishlistMutation.trigger(wishlistItem)}>
      Remove from wishlist
    </button>
  );
}
