import Head from "next/head";

import { useWishlistItems } from "@/features/wishlist";

export default function Page() {
  const wishlistQuery = useWishlistItems();

  if (!wishlistQuery.data) return <div></div>;

  return (
    <>
      <Head>
        <title>My wishlist</title>
      </Head>
      <div>
        <h1>Wishlist page</h1>
      </div>
    </>
  );
}
