import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUpdateCartItems } from "@/features/cart";
import { useFeedbackStore } from "@/stores/useFeedbackStore";

export default function Page() {
  const { push } = useRouter();
  const notify = useFeedbackStore((s) => s.notify);

  const updateCartItemsMutation = useUpdateCartItems({});

  useEffect(() => {
    updateCartItemsMutation
      .trigger({ data: [] })
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
