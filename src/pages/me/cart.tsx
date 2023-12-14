import Head from "next/head";

import { useCartItems, CreateCheckoutSessionForm } from "@/features/cart";

export default function Page() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return;

  return (
    <>
      <Head>
        <title>My cart</title>
      </Head>
      <div>
        <CreateCheckoutSessionForm
          initialCartItems={cartItemsQuery.data.results}
        />
      </div>
    </>
  );
}
