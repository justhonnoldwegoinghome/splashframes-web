import { useEffect } from "react";
import { useRouter } from "next/router";

import { useClearCart } from "@/features/cart";

export default function Page() {
  const { push } = useRouter();

  const clearCartMutation = useClearCart();

  useEffect(() => {
    clearCartMutation.trigger().then(() => push("/"));
  }, []);

  return <div />;
}
