import Link from "next/link";

import { useCartItems } from "../api/getCartItems";

export function CartLink() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return <div></div>;

  const totalQuantity = cartItemsQuery.data.results
    .map((c) => c.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  return <Link href="/me/cart">{`Cart (${totalQuantity})`}</Link>;
}
