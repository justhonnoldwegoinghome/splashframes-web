import Link from "next/link";

import { useWishlist } from "../api/getWishlist";

export function WishlistLink() {
  const wishlistQuery = useWishlist();

  if (!wishlistQuery.data) return <div></div>;

  return (
    <Link href="/me/wishlist">{`Wishlist (${wishlistQuery.data.results.length})`}</Link>
  );
}
