import { useWishlistItems } from "../api/getWishlistItems";
import { useUpdateWishlistItems } from "../api/updateWishlistItems";
import { WishlistItem } from "../types";

interface WishlistButtonProps {
  imageId: WishlistItem["image_id"];
}

export function WishlistButton({ imageId }: WishlistButtonProps) {
  const wishlistItemsQuery = useWishlistItems();

  const updateWishlistItemsMutation = useUpdateWishlistItems({});

  if (!wishlistItemsQuery.data) return;

  const wishlistItems = wishlistItemsQuery.data.results;

  const isInWishlistItems = wishlistItems
    .map((w) => w.image_id)
    .includes(imageId);

  const updatedWishlistItems = isInWishlistItems
    ? wishlistItems.filter((w) => w.image_id !== imageId)
    : [...wishlistItems, { image_id: imageId }];

  return (
    <button
      onClick={() =>
        updateWishlistItemsMutation.trigger({ data: updatedWishlistItems })
      }
    >
      {isInWishlistItems ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}
