import Link from "next/link";

import { useCartItems } from "../api/getCartItems";

export function CartLink() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return <div></div>;

  return (
    <Link href="/me/cart">{`Cart (${cartItemsQuery.data.results.length})`}</Link>
  );
}
