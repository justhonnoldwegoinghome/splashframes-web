import { useEffect, useState } from "react";

import {
  UpdateCartItemForm,
  useCartItems,
  useCreateCheckoutSession,
} from "@/features/cart";
import { useSplashframesInfinite } from "@/features/splashframes";
import { Spinner } from "@/components/spinner";
import { CartItem } from "@/features/cart/types";
import Link from "next/link";

export default function Page() {
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return;

  if (cartItemsQuery.data.length === 0) return <EmptyShoppingCart />;

  return <ShoppingCart cartItems={cartItemsQuery.data} />;
}

function EmptyShoppingCart() {
  return (
    <div className="h-[30vh] flex flex-col gap-8 items-center justify-center">
      <h1 className="text-3xl">Your cart is empty</h1>
      <Link
        href="/"
        className="h-12 bg-gray-400 text-white rounded w-full max-w-[200px] hover:ring-1 ring-gray-400 duration-200 flex justify-center items-center"
      >
        Continue shopping
      </Link>
    </div>
  );
}

interface ShoppingCartProps {
  cartItems: CartItem[];
}

function ShoppingCart({ cartItems }: ShoppingCartProps) {
  const ids_filter = cartItems.map((c) => c.splashframe_id).join(",");
  const splashframesQuery = useSplashframesInfinite({
    ids_filter,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (cartItems.length > 0 && splashframesQuery.data) {
      let totalPrice = 0;

      for (const c of cartItems) {
        const price = splashframesQuery.data.results
          .filter((s) => s.id === c.splashframe_id)[0]
          .variants.filter((v) => v.id === c.variant_id)[0].price_usd;
        totalPrice += price * c.quantity;
      }

      setTotalPrice(totalPrice);
    }
  }, [cartItems, splashframesQuery.data?.results]);

  const createCheckoutSessionMutation = useCreateCheckoutSession();

  if (!splashframesQuery.data) return;
  const splashframes = splashframesQuery.data.results;

  return (
    <div>
      <h1 className="text-3xl mb-4">Shopping cart</h1>
      <div className="border-y border-gray-200 py-12">
        <div className="flex flex-col gap-12">
          {cartItems.map((c) => (
            <UpdateCartItemForm
              key={c.id}
              cartItem={c}
              splashframe={
                splashframes.filter((s) => s.id === c.splashframe_id)[0]
              }
            />
          ))}
        </div>
      </div>
      <div className="py-8 flex flex-col items-end">
        <p className="text-sm text-gray-500 mb-1">Total</p>
        <p className="text-xl mb-8">{`$${totalPrice} USD`}</p>
        <button
          className="h-12 bg-gray-500 text-white rounded w-full max-w-[345px] hover:ring-1 ring-gray-500 duration-200 flex justify-center items-center"
          onClick={() =>
            createCheckoutSessionMutation.trigger({
              data: { cart_items: cartItems },
            })
          }
        >
          {createCheckoutSessionMutation.isMutating ? (
            <Spinner size="sm" />
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </div>
  );
}
