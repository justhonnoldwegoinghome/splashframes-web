import useSWR from "swr";

import { get } from "@/utils/apiClient";

import { Product } from "../types";

function getProduct({ id }: { id: Product["id"] }) {
  return get<Product>(`/products/${id}`);
}

export function useProduct({ id }: { id: Product["id"] }) {
  return useSWR(`/products/${id}`, () => getProduct({ id }));
}
