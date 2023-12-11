import { useEffect } from "react";
import { useRouter } from "next/router";

import { useClearCart } from "../api/clearCart";

export function CheckoutSuccessPage() {
  const { push } = useRouter();

  const clearCartMutation = useClearCart();

  useEffect(() => {
    clearCartMutation.trigger().then(() => push("/"));
  }, []);

  return <div />;
}
