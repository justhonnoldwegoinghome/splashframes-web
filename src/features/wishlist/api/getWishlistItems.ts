import useSWR from "swr";

import { APIList } from "@/types/api";

import { WishlistItem } from "../types";

export function getWishlistItems(): APIList<WishlistItem> {
  const rawWishlistItems = localStorage.getItem("wishlistItems") || "[]";
  const parsedWishlistItems = JSON.parse(rawWishlistItems) as WishlistItem[];

  return {
    next_page_token: null,
    results: parsedWishlistItems,
  };
}

export function useWishlistItems() {
  return useSWR("/wishlistItems", () => getWishlistItems());
}
