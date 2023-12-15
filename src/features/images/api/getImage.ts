import useSWR from "swr";

import { get } from "@/utils/apiClient";

import { Image } from "../types";

export function getImage({ id }: { id: Image["id"] }) {
  return get<Image>(`/images/${id}`);
}

export function useImage({ id }: { id: Image["id"] }) {
  return useSWR(`/images/${id}`, () => getImage({ id }));
}
