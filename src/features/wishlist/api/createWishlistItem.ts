import useSWRMutation from "swr/mutation";

import { getWishlistItems } from "./getWishlistItems";
import { WishlistItem } from "../types";

interface CreateWishlistItemParams {
  data: WishlistItem;
}

function createWishlistItem({ data }: CreateWishlistItemParams) {
  const wishlistItems = getWishlistItems().results;

  const isInWishlist = wishlistItems
    .map((w) => w.image_id)
    .includes(data.image_id);

  if (isInWishlist) {
    throw new Error("WishlistItem already exists.");
  } else {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify([...wishlistItems, data])
    );
    return data;
  }
}

export function useCreateWishlistItem() {
  return useSWRMutation(
    "/wishlistItems",
    (_, { arg }: { arg: CreateWishlistItemParams["data"] }) =>
      createWishlistItem({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
    }
  );
}
