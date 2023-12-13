import Head from "next/head";

import { useWishlistItems } from "@/features/wishlist";
import { ImageCards } from "@/features/images";

export default function Page() {
  const wishlistQuery = useWishlistItems();

  if (!wishlistQuery.data) return <div></div>;

  const ids_filter = wishlistQuery.data.results
    .map((w) => w.image_id)
    .join(",");

  return (
    <>
      <Head>
        <title>My wishlist</title>
      </Head>
      <div>
        <ImageCards ids_filter={ids_filter} />
      </div>
    </>
  );
}
