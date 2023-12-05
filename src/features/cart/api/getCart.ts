import useSWR from "swr";

import { Image } from "@/features/images";

export function getCart() {
  const rawCart = localStorage.getItem("cart") || "[]";
  const parsedCart = JSON.parse(rawCart) as Image["id"][];

  return {
    next_page_token: null,
    results: parsedCart,
  };
}

export function useCart() {
  return useSWR("/cart", () => getCart());
}
