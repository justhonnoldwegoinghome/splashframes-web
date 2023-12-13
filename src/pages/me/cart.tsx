import Head from "next/head";

import { useCartItems } from "@/features/cart";

export default function Page() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return <div></div>;

  return (
    <>
      <Head>
        <title>My cart</title>
      </Head>
      <div>
        <h1>Cart page</h1>
        <div className="flex gap-4">
          {cartItemsQuery.data.results.map((c) => (
            <div key={c.productId} className="border">
              <h2>{`Cart item product id: ${c.productId}`}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
