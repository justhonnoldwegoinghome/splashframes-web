import useSWR from "swr";

import { get } from "@/utils/apiClient";
import { APIList } from "@/types/api";

import { Image } from "../types";

export function getImages({
  page_token,
  max_page_size,
}: {
  page_token?: string | null;
  max_page_size?: number;
}) {
  return get<APIList<Image>>("/images", {
    params: { page_token, max_page_size },
  });
}

export function useImages({
  page_token,
  max_page_size,
}: {
  page_token?: string | null;
  max_page_size?: number;
}) {
  return useSWR(["/images", page_token], () =>
    getImages({ page_token, max_page_size })
  );
}
