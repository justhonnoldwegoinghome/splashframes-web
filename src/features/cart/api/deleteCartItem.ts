import _ from "lodash";
import useSWRMutation from "swr/mutation";

import { getCartItems } from "./getCartItems";
import { CartItem } from "../types";

interface DeleteCartItemParams {
  id: CartItem["id"];
}

function deleteCartItem({ id }: DeleteCartItemParams) {
  const cartItems = getCartItems();

  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.filter((c) => c.id !== id))
  );
  return id;
}

export function useDeleteCartItem() {
  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: DeleteCartItemParams }) =>
      deleteCartItem({ id: arg.id }),
    {
      throwOnError: false,
    }
  );
}
