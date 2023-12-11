import useSWRMutation from "swr/mutation";

import { getWishlist } from "./getWishlist";
import { WishlistItem } from "../types";

interface AddToWishlistParams {
  data: WishlistItem;
}

function addToWishlist({ data }: AddToWishlistParams) {
  const wishlist = getWishlist().results;

  const isInWishlist = wishlist.map((w) => w.imageId).includes(data.imageId);

  if (!isInWishlist) {
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, data]));
  }

  return data;
}

export function useAddToWishlist() {
  return useSWRMutation(
    "/wishlist",
    (_, { arg }: { arg: AddToWishlistParams["data"] }) =>
      addToWishlist({ data: arg }),
    {
      throwOnError: false,
    }
  );
}
