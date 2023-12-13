import Head from "next/head";

import { CheckoutCartItemsForm } from "@/features/cart";

export default function Page() {
  return (
    <>
      <Head>
        <title>My cart</title>
      </Head>
      <div>
        <CheckoutCartItemsForm />
      </div>
    </>
  );
}
