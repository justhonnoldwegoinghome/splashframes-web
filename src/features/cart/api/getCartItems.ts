import useSWR from "swr";

import { APIList } from "@/types/api";

import { CartItem } from "../types";

export function getCartItems(): APIList<CartItem> {
  const rawCart = localStorage.getItem("cartItems") || "[]";
  const parsedCart = JSON.parse(rawCart) as CartItem[];

  return {
    next_page_token: null,
    results: parsedCart,
  };
}

export function useCartItems() {
  return useSWR("/cartItems", () => getCartItems());
}
