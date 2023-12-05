import useSWRMutation from "swr/mutation";

import { Image } from "@/features/images";

import { getCart } from "./getCart";

interface AddToCartParams {
  data: {
    id: Image["id"];
  };
}

function addToCart({ data }: AddToCartParams) {
  const currentCart = getCart().results;

  if (!currentCart.includes(data.id)) {
    const updatedCart = [...currentCart, data.id];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
