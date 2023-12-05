import Link from "next/link";

import { useCart } from "../api/getCart";

export function CartLink() {
  const cartQuery = useCart();

  if (!cartQuery.data) return <div></div>;

  return (
    <Link href="/me/cart">{`Cart (${cartQuery.data.results.length})`}</Link>
  );
}
