import { PiTrashLight } from "react-icons/pi";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Select } from "@/components/select";
import { Splashframe } from "@/features/splashframes";

import { useDeleteCartItem } from "../api/deleteCartItem";
import { usePatchCartItem } from "../api/patchCartItem";
import { CartItem } from "../types";

interface UpdateCartItemFormProps {
  cartItem: CartItem;
  splashframe: Splashframe;
}

export function UpdateCartItemForm({
  cartItem,
  splashframe,
}: UpdateCartItemFormProps) {
  const patchCartItemMutation = usePatchCartItem({});
  const deleteCartItemMutation = useDeleteCartItem();

  const [quantity, setQuantity] = useState(cartItem.quantity);
  useEffect(() => {
    patchCartItemMutation.trigger({
      id: cartItem.id,
      data: { json_merge_patch: { quantity } },
    });
  }, [quantity]);

  const quantityOptions = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    []
  );
  const selectedQuantityOption = useMemo(
    () => ({
      value: quantity,
      label: String(quantity),
    }),
    [quantity]
  );

  const variant = splashframe.variants.filter(
    (v) => v.id === cartItem.variant_id
  )[0];

  return (
    <div className="flex gap-4 tablet:gap-12">
      <div id="splashframe-image" className="max-w-[160px]">
        <img src={splashframe.image_urls[0]} className="rounded" />
      </div>

      <div className="flex-1 min-w-[180px] flex flex-col justify-between gap-4">
        <div id="variant-description" className="flex flex-col gap-1.5">
          <Link
            href={`/splashframes/${cartItem.splashframe_id}`}
            className="hover:underline underline-offset-4"
          >
            {variant.title}
          </Link>
          <p className="text-sm text-secondary">{`$${variant.price_usd}`}</p>
          <p className="text-sm text-secondary">
            {`Size: ${variant.size} (${variant.width_inches}" x ${variant.height_inches}")
          `}
          </p>
        </div>

        <div id="quantity-field" className="w-[140px]">
          <p className="text-sm text-secondary">Quantity</p>
          <div className="flex items-center gap-4">
            <Select
              options={quantityOptions}
              selectedOption={selectedQuantityOption}
              onChange={(o) => setQuantity(o.value)}
            />
            <button
              type="button"
              onClick={() =>
                deleteCartItemMutation.trigger({ id: cartItem.id })
              }
            >
              <PiTrashLight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
      <div id="price" className="flex items-center">
        <p className="text-xl">{`$${quantity * variant.price_usd}`}</p>
      </div>
    </div>
  );
}
