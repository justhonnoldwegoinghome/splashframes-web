import useSWRMutation from "swr/mutation";

import { Image } from "@/features/images";

import { getCart } from "./getCart";

interface RemoveFromCartParams {
  data: {
    id: Image["id"];
  };
}

function removeFromCart({ data }: RemoveFromCartParams) {
  const currentCart = getCart().results;

  if (currentCart.includes(data.id)) {
    const updatedCart = currentCart.filter((id) => id !== data.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  return data;
}

export function useRemoveFromCart() {
  return useSWRMutation(
    "/cart",
    (_, { arg }: { arg: RemoveFromCartParams["data"] }) =>
      removeFromCart({ data: arg }),
    {
      throwOnError: false,
    }
  );
}
