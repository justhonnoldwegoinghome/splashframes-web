import { useEffect } from "react";
import { useRouter } from "next/router";

import { useDeleteCartItems } from "@/features/cart";

export default function Page() {
  const { push } = useRouter();

  const deleteCartItemsMutation = useDeleteCartItems();

  useEffect(() => {
    deleteCartItemsMutation.trigger().then(() => push("/"));
  }, []);

  return <div />;
}
