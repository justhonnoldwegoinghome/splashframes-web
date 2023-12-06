import useSWR from "swr";

import { APIList } from "@/types/api";

import { WishlistItem } from "../types";

export function getWishlist(): APIList<WishlistItem> {
  const rawWishlist = localStorage.getItem("wishlist") || "[]";
  const parsedWishlist = JSON.parse(rawWishlist) as WishlistItem[];

  return {
    next_page_token: null,
    results: parsedWishlist,
  };
}

export function useWishlist() {
  return useSWR("/wishlist", () => getWishlist());
}
