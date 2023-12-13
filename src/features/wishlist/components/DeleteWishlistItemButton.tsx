import { useDeleteWishlistItem } from "../api/deleteWishlistItem";
import { WishlistItem } from "../types";

interface DeleteWishlistItemButtonProps {
  wishlistItem: WishlistItem;
}

export function DeleteWishlistItemButton({
  wishlistItem,
}: DeleteWishlistItemButtonProps) {
  const useDeleteWishlistItemMutation = useDeleteWishlistItem();

  return (
    <button onClick={() => useDeleteWishlistItemMutation.trigger(wishlistItem)}>
      Delete wishlist item
    </button>
  );
}
