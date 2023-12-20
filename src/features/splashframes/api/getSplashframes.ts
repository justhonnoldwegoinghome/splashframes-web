import _ from "lodash";
import useSWRInfinite from "swr/infinite";
import { useMemo } from "react";

import { get } from "@/utils/apiClient";
import { APIList } from "@/types/api";

import { Splashframe } from "../types";

type PageToken = string | null;
type MaxPageSize = number;
export type IdsFilter = string;

const MAX_PAGE_SIZE = 12;

export function getSplashframes({
  page_token,
  max_page_size,
  ids_filter,
}: {
  page_token?: PageToken;
  max_page_size?: MaxPageSize;
  ids_filter?: IdsFilter;
}) {
  return get<APIList<Splashframe>>("/splashframes", {
    params: { page_token, max_page_size, ids_filter },
  });
}

export function useSplashframesInfinite({
  ids_filter,
}: {
  ids_filter?: IdsFilter;
}) {
  const { data, size, setSize } = useSWRInfinite<APIList<Splashframe>>(
    (_, previousPageData) => getKey(previousPageData, ids_filter),
    (k) => getSplashframes(k),
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
  previousPageData: APIList<Splashframe> | null,
  ids_filter?: IdsFilter
) {
  return {
    resource: "splashframes",
    page_token: previousPageData?.next_page_token,
    max_page_size: MAX_PAGE_SIZE,
    ids_filter,
  };
}
