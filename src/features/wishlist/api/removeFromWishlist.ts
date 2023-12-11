import useSWRMutation from "swr/mutation";

import { getWishlist } from "./getWishlist";
import { WishlistItem } from "../types";

interface RemoveFromWishlistParams {
  data: WishlistItem;
}

function removeFromWishlist({ data }: RemoveFromWishlistParams) {
  const wishlist = getWishlist().results;

  const isInWishlist = wishlist.map((w) => w.imageId).includes(data.imageId);

  if (isInWishlist) {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist.filter((w) => w.imageId !== data.imageId))
    );
  }
  return data;
}

export function useRemoveFromWishlist() {
  return useSWRMutation(
    "/wishlist",
    (_, { arg }: { arg: RemoveFromWishlistParams["data"] }) =>
      removeFromWishlist({ data: arg }),
    {
      throwOnError: false,
    }
  );
}
