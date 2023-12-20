import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/utils/apiClient";

import { CartItem } from "../types";

type CheckoutURL = string;

interface CreateCheckoutSessionParams {
  data: {
    cart_items: CartItem[];
  };
}

function createCheckoutSession({ data }: CreateCheckoutSessionParams) {
  return post<CheckoutURL>("/create-checkout-session", data);
}

export function useCreateCheckoutSession() {
  const { push } = useRouter();

  return useSWRMutation(
    "/create-checkout-session",
    (_, { arg }: { arg: CreateCheckoutSessionParams }) =>
      createCheckoutSession(arg),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: (res) => push(res.data),
    }
  );
}
