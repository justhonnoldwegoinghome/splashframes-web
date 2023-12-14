import _ from "lodash";
import useSWRInfinite from "swr/infinite";
import { useMemo } from "react";

import { get } from "@/utils/apiClient";
import { APIList } from "@/types/api";

import { Image } from "../types";

type PageToken = string | null;
type MaxPageSize = number;
export type IdsFilter = string;

const IMAGES_MAX_PAGE_SIZE = 12;

export function getImages({
  page_token,
  max_page_size,
  ids_filter,
}: {
  page_token?: PageToken;
  max_page_size?: MaxPageSize;
  ids_filter?: IdsFilter;
}) {
  return get<APIList<Image>>("/images", {
    params: { page_token, max_page_size, ids_filter },
  });
}

export function useImagesInfinite({ ids_filter }: { ids_filter?: IdsFilter }) {
  const { data, size, setSize } = useSWRInfinite<APIList<Image>>(
    (_, previousPageData) => getKey(previousPageData, ids_filter),
    (k) => getImages(k),
    {
      revalidateFirstPage: false, // issue 1401 but not needed for less dynamic apps like this
    }
  );

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

function getKey(
  previousPageData: APIList<Image> | null,
  ids_filter?: IdsFilter
) {
  return {
    resource: "images",
    page_token: previousPageData?.next_page_token,
    max_page_size: IMAGES_MAX_PAGE_SIZE,
    ids_filter,
  };
}
