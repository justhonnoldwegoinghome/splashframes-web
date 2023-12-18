import Link from "next/link";

import { useSplashframe } from "@/features/splashframes";

import { useDeleteCartItem } from "../api/deleteCartItem";
import { usePatchCartItem } from "../api/patchCartItem";
import { CartItem } from "../types";

interface UpdateCartItemFormProps {
  cartItem: CartItem;
}

export interface PatchCartItemInput {
  json_merge_patch: {
    quantity?: number;
  };
}

export function UpdateCartItemForm({ cartItem }: UpdateCartItemFormProps) {
  const splashframeQuery = useSplashframe({ id: cartItem.splashframe_id });

  const patchCartItemMutation = usePatchCartItem({});
  const deleteCartItemMutation = useDeleteCartItem();

  function updateQuantity(change: number) {
    patchCartItemMutation.trigger({
      id: cartItem.id,
      data: {
        json_merge_patch: {
          quantity: cartItem.quantity + change,
        },
      },
    });
  }

  if (!splashframeQuery.data) return <div />;

  return (
    <div className="py-8 relative flex gap-8">
      <div className="w-[100px]">
        <img src={splashframeQuery.data.image_urls[0]} />
        <Link href={`/splashframes/${cartItem.splashframe_id}`}>
          {splashframeQuery.data.title}
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={() => updateQuantity(-1)}
          disabled={cartItem.quantity === 1}
        >
          -
        </button>
        <div>{cartItem.quantity}</div>
        <button type="button" onClick={() => updateQuantity(1)}>
          +
        </button>
      </div>
      <div className="absolute top-0 right-0">
        <button
          type="button"
          onClick={() => deleteCartItemMutation.trigger({ id: cartItem.id })}
        >
          DeleteButton
        </button>
      </div>
    </div>
  );
}
