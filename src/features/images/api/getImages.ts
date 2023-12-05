import useSWRInfinite from "swr/infinite";
import { useEffect, useState } from "react";

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

export function useImagesInfinite() {
  const { data, size, setSize } = useSWRInfinite(getKey, (k) => getImages(k));
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (data && data[data.length - 1].next_page_token === null) {
      setHasEnded(true);
    }
  }, [data]);

  return {
    data,
    hasEnded,
    loadMore: () => setSize(size + 1),
  };
}

function getKey(_: any, previousPageData?: APIList<Image>) {
  return {
    resource: "images",
    page_token: previousPageData?.next_page_token,
    max_page_size: 24,
  };
}
