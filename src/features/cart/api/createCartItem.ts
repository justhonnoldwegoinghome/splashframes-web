import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { getCartItems } from "./getCartItems";
import { CartItem } from "../types";

interface CreateCartItemParams {
  data: CartItem;
}

function createCartItem({ data }: CreateCartItemParams) {
  const cartItems = getCartItems().results;

  const isInCart = cartItems.map((c) => c.product_id).includes(data.product_id);

  if (isInCart) {
    throw new Error("CartItem already exists.");
  } else {
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
    return data;
  }
}

export function useCreateCartItem() {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: CreateCartItemParams["data"] }) =>
      createCartItem({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: () =>
        notify({
          msg: "Added to cart",
          status: "success",
        }),
    }
  );
}
