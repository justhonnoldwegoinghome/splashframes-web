import _ from "lodash";
import useSWRMutation from "swr/mutation";

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
  return useSWRMutation(
    "/cart",
    (_, { arg }: { arg: AddToCartParams["data"] }) => addToCart({ data: arg }),
    {
      throwOnError: false,
    }
  );
}
