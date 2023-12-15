import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { WishlistItem } from "../types";

interface UpdateWishlistItemsParams {
  data: WishlistItem[];
}

function updateWishlistItems({ data }: UpdateWishlistItemsParams) {
  localStorage.setItem("wishlistItems", JSON.stringify(data));
  return data;
}

export function useUpdateWishlistItems({
  successMsg,
}: {
  successMsg?: string;
}) {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/wishlistItems",
    (_, { arg }: { arg: { data: UpdateWishlistItemsParams["data"] } }) =>
      updateWishlistItems({ data: arg.data }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: () =>
        successMsg &&
        notify({
          msg: successMsg,
          status: "success",
        }),
    }
  );
}
