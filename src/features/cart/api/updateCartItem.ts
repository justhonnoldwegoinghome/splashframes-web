import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { getCartItems } from "./getCartItems";
import { CartItem } from "../types";

interface updateCartItemParams {
  data: CartItem;
}

function updateCartItem({ data }: updateCartItemParams) {
  const cartItems = getCartItems().results;

  const isInCart = cartItems.map((c) => c.product_id).includes(data.product_id);

  if (!isInCart) {
    throw new Error("CartItem not found.");
  } else {
    localStorage.setItem(
      "cartItems",
      JSON.stringify([
        ...cartItems.filter((c) => c.product_id !== data.product_id),
        data,
      ])
    );
    return data;
  }
}

export function useUpdateCartItem() {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: updateCartItemParams["data"] }) =>
      updateCartItem({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: () =>
        notify({
          msg: "Cart updated",
          status: "success",
        }),
    }
  );
}
