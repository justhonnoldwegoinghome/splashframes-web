import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { CartItem } from "../types";

interface UpdateCartItemsParams {
  data: CartItem[];
}

function updateCartItems({ data }: UpdateCartItemsParams) {
  localStorage.setItem("cartItems", JSON.stringify(data));
  return data;
}

export function useUpdateCartItems({ successMsg }: { successMsg?: string }) {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: { data: UpdateCartItemsParams["data"] } }) =>
      updateCartItems({ data: arg.data }),
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
