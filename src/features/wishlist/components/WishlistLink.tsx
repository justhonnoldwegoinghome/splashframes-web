import Link from "next/link";

import { useWishlistItems } from "../api/getWishlistItems";

export function WishlistLink() {
  const wishlistQuery = useWishlistItems();

  if (!wishlistQuery.data) return;

  return (
    <Link href="/me/wishlist">{`Wishlist (${wishlistQuery.data.results.length})`}</Link>
  );
}
