import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/utils/apiClient";

import { CreateCheckoutSessionInput } from "..";

type CheckoutURL = string;

interface CreateCheckoutSessionParams {
  data: CreateCheckoutSessionInput;
}

function CreateCheckoutSession({ data }: CreateCheckoutSessionParams) {
  return post<CheckoutURL>("/create-checkout-session", data);
}

export function useCreateCheckoutSession() {
  const { push } = useRouter();

  return useSWRMutation(
    "/create-checkout-session",
    (_, { arg }: { arg: CreateCheckoutSessionParams["data"] }) =>
      CreateCheckoutSession({ data: arg }),
    {
      throwOnError: false,
      onError: (e) => console.log(e),
      onSuccess: (res) => push(res.data),
    }
  );
}
