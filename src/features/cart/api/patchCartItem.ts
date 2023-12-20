import _ from "lodash";
import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/features/app";

import { getCartItems } from "./getCartItems";
import { CartItem } from "../types";

interface PatchCartItemParams {
  id: CartItem["id"];
  data: {
    json_merge_patch: {
      quantity?: number;
    };
  };
}

export async function patchCartItem({ id, data }: PatchCartItemParams) {
  const cartItems = getCartItems();

  localStorage.setItem(
    "cartItems",
    JSON.stringify(
      _.map(cartItems, (c) => {
        if (c.id === id) {
          return {
            ...c,
            quantity: data.json_merge_patch.quantity,
          };
        } else {
          return c;
        }
      })
    )
  );
  await new Promise((r) => setTimeout(r, 500));
  return data;
}

export function usePatchCartItem({ successMsg }: { successMsg?: string }) {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: PatchCartItemParams }) =>
      patchCartItem({ id: arg.id, data: arg.data }),
    {
      throwOnError: false,
      onSuccess: () =>
        successMsg &&
        notify({
          msg: successMsg,
          status: "success",
        }),
    }
  );
}
