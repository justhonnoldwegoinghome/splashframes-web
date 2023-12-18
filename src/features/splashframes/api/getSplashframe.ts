import useSWR from "swr";

import { get } from "@/utils/apiClient";

import { Splashframe } from "../types";

export function getSplashframe({ id }: { id: Splashframe["id"] }) {
  return get<Splashframe>(`/splashframes/${id}`);
}

export function useSplashframe({ id }: { id: Splashframe["id"] }) {
  return useSWR(`/splashframes/${id}`, () => getSplashframe({ id }));
}
