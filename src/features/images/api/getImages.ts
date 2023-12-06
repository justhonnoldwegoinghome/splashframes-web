import _ from "lodash";
import useSWRInfinite from "swr/infinite";
import { useMemo } from "react";

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

// #1. size +1
// #2. call `getKey`
// #3. call `getImages`

export function useImagesInfinite() {
  const { data, size, setSize } = useSWRInfinite(getKey, (k) => getImages(k), {
    revalidateFirstPage: false, // issue 1401 but not needed for less dynamic apps like this
  });

  const hasEnded = useMemo(() => {
    if (data && data[data.length - 1].next_page_token === null) {
      return true;
    } else {
      return false;
    }
  }, [data]);

  return {
    data: data
      ? {
          results: _.flatten(data.map((d) => d.results)),
        }
      : undefined,
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
