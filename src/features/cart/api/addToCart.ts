import _ from "lodash";
import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { getCart } from "./getCart";
import { CartItem } from "../types";

interface AddToCartParams {
  data: CartItem;
}

function addToCart({ data }: AddToCartParams) {
  const cart = getCart().results;

  const isInCart = cart.map((c) => c.productId).includes(data.productId);

  if (!isInCart) {
    localStorage.setItem("cart", JSON.stringify([...cart, data]));
  } else {
    const idx = _.indexOf(
      cart.map((c) => c.productId),
      data.productId
    );
    cart[idx].quantity += data.quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return data;
}

export function useAddToCart() {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cart",
    (_, { arg }: { arg: AddToCartParams["data"] }) => addToCart({ data: arg }),
    {
      throwOnError: false,
      onSuccess: () =>
        notify({
          msg: "Added to cart",
          status: "success",
        }),
    }
  );
}
