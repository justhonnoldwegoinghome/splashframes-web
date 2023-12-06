import useSWR from "swr";

import { APIList } from "@/types/api";

import { CartItem } from "../types";

export function getCart(): APIList<CartItem> {
  const rawCart = localStorage.getItem("cart") || "[]";
  const parsedCart = JSON.parse(rawCart) as CartItem[];

  return {
    next_page_token: null,
    results: parsedCart,
  };
}

export function useCart() {
  return useSWR("/cart", () => getCart());
}
