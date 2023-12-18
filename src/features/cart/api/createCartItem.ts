import useSWRMutation from "swr/mutation";

import { useFeedbackStore } from "@/stores/useFeedbackStore";

import { CreateCartItemInput } from "../components/AddToCartForm";
import { getCartItems } from "./getCartItems";

interface CreateCartItemParams {
  data: CreateCartItemInput;
}

async function createCartItem({ data }: CreateCartItemParams) {
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

export function useCreateCartItem({ successMsg }: { successMsg?: string }) {
  const notify = useFeedbackStore((s) => s.notify);

  return useSWRMutation(
    "/cartItems",
    (_, { arg }: { arg: { data: CreateCartItemParams["data"] } }) =>
      createCartItem({ data: arg.data }),
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
