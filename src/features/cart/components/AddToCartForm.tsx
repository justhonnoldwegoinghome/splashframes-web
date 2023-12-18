import _ from "lodash";
import clsx from "clsx";
import { useState } from "react";

import { Splashframe, Variant } from "@/features/splashframes";

import { useCartItems } from "../api/getCartItems";
import { useCreateCartItem } from "../api/createCartItem";
import { usePatchCartItem } from "../api/patchCartItem";

export interface CreateCartItemInput {
  splashframe_id: Splashframe["id"];
  variant_id: Variant["id"];
  quantity: number;
}

interface AddToCartFormProps {
  splashframe: Splashframe;
}

export function AddToCartForm({ splashframe }: AddToCartFormProps) {
  const [variant, setVariant] = useState(splashframe.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const cartItemsQuery = useCartItems();
  const createCartItemMutation = useCreateCartItem({
    successMsg: "Added to cart",
  });
  const patchCartItemMutation = usePatchCartItem({
    successMsg: "Added to cart",
  });

  if (!cartItemsQuery.data) return;

  function onSubmit(v: CreateCartItemInput) {
    const cartItem = cartItems.filter(
      (c) =>
        c.splashframe_id === v.splashframe_id && c.variant_id === v.variant_id
    )[0];

    if (cartItem) {
      patchCartItemMutation.trigger({
        id: cartItem.id,
        data: {
          json_merge_patch: {
            quantity: cartItem.quantity + v.quantity,
          },
        },
      });
    } else {
      createCartItemMutation.trigger({ data: v });
    }
  }

  const cartItems = cartItemsQuery.data;

  return (
    <div>
      <div>
        <h1>{splashframe.title}</h1>
        <h1>{splashframe.description}</h1>
      </div>
      <div className="flex gap-8">
        {splashframe.variants.map((v) => (
          <button
            key={v.size}
            onClick={() => setVariant(v)}
            className={clsx("w-8 h-8 rounded-full border", {
              "bg-slate-200": variant.size === v.size,
            })}
          >
            {v.size}
          </button>
        ))}
      </div>
      <div className="flex gap-8">
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <div>{quantity}</div>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <div>
        <button
          onClick={() =>
            onSubmit({
              splashframe_id: splashframe.id,
              variant_id: variant.id,
              quantity,
            })
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
