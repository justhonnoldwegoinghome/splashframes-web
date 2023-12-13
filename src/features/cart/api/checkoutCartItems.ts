import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/utils/apiClient";

import { CartItem } from "../types";

type CheckoutURL = string;

interface CheckoutCartItemsParams {
  data: { cart_items: CartItem[]; currency: "SGD" };
}

function CheckoutCartItems({ data }: CheckoutCartItemsParams) {
  return post<CheckoutURL>("/create-checkout-session", data);
}

export function useCheckoutCartItems() {
  const { push } = useRouter();

  return useSWRMutation(
    "/create-checkout-session",
    (_, { arg }: { arg: CheckoutCartItemsParams["data"] }) =>
      CheckoutCartItems({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: (res) => push(res.data),
    }
  );
}
