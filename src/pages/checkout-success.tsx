import { useEffect } from "react";
import { useRouter } from "next/router";

import { useFeedbackStore } from "@/stores/useFeedbackStore";
import { useClearCartItems } from "@/features/cart";

export default function Page() {
  const { push } = useRouter();
  const notify = useFeedbackStore((s) => s.notify);

  const clearCartItemsMutation = useClearCartItems();

  useEffect(() => {
    clearCartItemsMutation
      .trigger()
      .then(() => push("/"))
      .then(() =>
        notify({
          status: "success",
          msg: "Order has been placed",
        })
      );
  }, []);

  return <div />;
}
