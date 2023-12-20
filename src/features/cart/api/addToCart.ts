import _ from "lodash";
import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";
import { Splashframe, Variant } from "@/features/splashframes";

import { getCartItems } from "./getCartItems";
import { patchCartItem } from "./patchCartItem";

interface CreateCartItemInput {
  splashframe_id: Splashframe["id"];
  variant_id: Variant["id"];
  quantity: number;
}

async function createCartItem({ data }: { data: CreateCartItemInput }) {
  const cartItems = getCartItems();

  localStorage.setItem(
    "cartItems",
    JSON.stringify([
      ...cartItems,
      {
        id: String(new Date().valueOf()),
        ...data,
      },
    ])
  );

  await new Promise((r) => setTimeout(r, 500));
  return data;
}

async function addToCart({ data }: { data: CreateCartItemInput }) {
  const cartItems = getCartItems();

  const isInCartItems = _.some(
    cartItems,
    (c) =>
      c.splashframe_id === data.splashframe_id &&
      c.variant_id === data.variant_id
  );

  if (isInCartItems) {
    const cartItem = cartItems.filter(
      (c) =>
        c.splashframe_id === data.splashframe_id &&
        c.variant_id === data.variant_id
    )[0];
    return patchCartItem({
      id: cartItem.id,
      data: {
        json_merge_patch: { quantity: cartItem.quantity + data.quantity },
      },
    });
  } else {
    return createCartItem({ data });
  }
}

export function useAddToCart() {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: { data: CreateCartItemInput } }) =>
      addToCart({ data: arg.data }),
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
