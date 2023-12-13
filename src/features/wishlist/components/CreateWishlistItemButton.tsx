import { useCreateWishlistItem } from "../api/createWishlistItem";
import { WishlistItem } from "../types";

interface CreateWishlistItemButtonProps {
  wishlistItem: WishlistItem;
}

export function CreateWishlistItemButton({
  wishlistItem,
}: CreateWishlistItemButtonProps) {
  const createWishlistItemMutation = useCreateWishlistItem();

  return (
    <button onClick={() => createWishlistItemMutation.trigger(wishlistItem)}>
      Add wishlist item
    </button>
  );
}
