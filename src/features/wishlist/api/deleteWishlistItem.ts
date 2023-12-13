import useSWRMutation from "swr/mutation";

import { getWishlistItems } from "./getWishlistItems";
import { WishlistItem } from "../types";

interface DeleteWishlistItemParams {
  data: WishlistItem;
}

function deleteWishlistItem({ data }: DeleteWishlistItemParams) {
  const wishlistItems = getWishlistItems().results;

  const isInWishlist = wishlistItems
    .map((w) => w.image_id)
    .includes(data.image_id);

  if (!isInWishlist) {
    throw new Error("WishlistItem not found.");
  } else {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems.filter((w) => w.image_id !== data.image_id))
    );
    return data;
  }
}

export function useDeleteWishlistItem() {
  return useSWRMutation(
    "/wishlistItems",
    (_, { arg }: { arg: DeleteWishlistItemParams["data"] }) =>
      deleteWishlistItem({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
    }
  );
}
