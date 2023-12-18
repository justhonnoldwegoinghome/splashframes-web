import useSWR from "swr";

import { CartItem } from "../types";

export function getCartItems(): CartItem[] {
  const rawCart = localStorage.getItem("cartItems") || "[]";
  const parsedCart = JSON.parse(rawCart) as CartItem[];

  return parsedCart;
}

export function useCartItems() {
  return useSWR("/cartItems", () => getCartItems());
}
