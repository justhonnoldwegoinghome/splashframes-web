import Link from "next/link";
import { PiShoppingCartLight } from "react-icons/pi";

import { useCartItems } from "../api/getCartItems";

export function CartLink() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return;

  const cartItems = cartItemsQuery.data;

  const totalQuantity = cartItems
    .map((c) => c.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Link
      href="/me/cart"
      className="text-gray-500 hover:text-gray-900 w-10 h-10 rounded bg-white flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sauce"
    >
      <div className="relative">
        <PiShoppingCartLight className="text-3xl" />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 w-5 aspect-square rounded-full flex items-center justify-center text-xs bg-blue-500 text-white">
            {totalQuantity}
          </span>
        )}
      </div>
    </Link>
  );
}
