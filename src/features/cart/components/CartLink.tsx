import Link from "next/link";
import { PiShoppingCartLight } from "react-icons/pi";

import { useCartItems } from "../api/getCartItems";

export function CartLink() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return <div></div>;

  const totalQuantity = cartItemsQuery.data.results
    .map((c) => c.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Link
      href="/me/cart"
      className="text-gray-500 hover:text-gray-700 w-10 h-10 rounded-full bg-white flex items-center justify-center"
    >
      <div className="relative">
        <PiShoppingCartLight className="text-3xl" />
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs bg-blue-500 text-white">
          {totalQuantity}
        </span>
      </div>
      {/* <span className="text-sm">Cart</span> */}
    </Link>
  );
}
