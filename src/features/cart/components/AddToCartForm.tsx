import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

import { Select } from "@/components/select";
import { Splashframe, Variant } from "@/features/splashframes";
import { Spinner } from "@/components/spinner";

import { useCartItems } from "../api/getCartItems";
import { useCreateCartItem } from "../api/createCartItem";
import { usePatchCartItem } from "../api/patchCartItem";
import { CartItem } from "../types";

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
  const [size, setSize] = useState(splashframe.variants[0].size);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setVariant(splashframe.variants.filter((v) => v.size === size)[0]);
  }, [size]);

  const cartItemsQuery = useCartItems();
  const cartItems = cartItemsQuery.data || [];

  const [isInCartItems, setIsInCartItems] = useState(false);
  useEffect(() => {
    cartItems &&
      setIsInCartItems(
        _.some(
          cartItems,
          (c) =>
            c.splashframe_id === splashframe.id && c.variant_id === variant.id
        )
      );
  }, [splashframe, variant, cartItems]);

  const sizeOptions = useMemo(
    () =>
      splashframe.variants.map((v) => ({
        value: v.size,
        label: `${v.size} (${v.width_inches}" x ${v.height_inches}")`,
      })),
    []
  );
  const selectedSizeOption = useMemo(
    () => ({
      value: variant.size,
      label: `${variant.size} (${variant.width_inches}" x ${variant.height_inches}")`,
    }),
    [variant]
  );

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl">{splashframe.title}</h1>
        <p className="text-lg">{`$${variant.price_usd * quantity} USD`}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1.5">Size</p>
          <Select
            options={sizeOptions}
            selectedOption={selectedSizeOption}
            onChange={(o) => setSize(o.value)}
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1.5">Quantity</p>
          <div className="w-[120px]">
            <Select
              options={quantityOptions}
              selectedOption={selectedQuantityOption}
              onChange={(o) => setQuantity(o.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {isInCartItems ? (
          <PatchCartItemButton
            id={
              cartItems.filter(
                (c) =>
                  c.splashframe_id === splashframe.id &&
                  c.variant_id === variant.id
              )[0].id
            }
            data={{ json_merge_patch: { quantity } }}
          >
            Add to Cart
          </PatchCartItemButton>
        ) : (
          <CreateCartItemButton
            data={{
              splashframe_id: splashframe.id,
              variant_id: variant.id,
              quantity,
            }}
          >
            Add to cart
          </CreateCartItemButton>
        )}
      </div>
    </div>
  );
}

export interface CreateCartItemInput {
  splashframe_id: Splashframe["id"];
  variant_id: Variant["id"];
  quantity: number;
}
interface CreateCartItemButtonProps {
  data: CreateCartItemInput;
  children: string;
}
function CreateCartItemButton({ data, children }: CreateCartItemButtonProps) {
  const createCartItemMutation = useCreateCartItem({
    successMsg: "Added to cart",
  });

  return (
    <button
      className="h-12 bg-gray-500 text-white rounded w-full max-w-[345px] hover:ring-1 ring-gray-500 duration-200 flex justify-center items-center"
      onClick={() => createCartItemMutation.trigger({ data })}
    >
      {createCartItemMutation.isMutating ? <Spinner size="sm" /> : children}
    </button>
  );
}

interface PatchCartItemInput {
  json_merge_patch: {
    quantity?: number;
  };
}
interface PatchCartItemButtonProps {
  id: CartItem["id"];
  data: PatchCartItemInput;
  children: string;
}
function PatchCartItemButton({ id, data, children }: PatchCartItemButtonProps) {
  const patchCartItemMutation = usePatchCartItem({
    successMsg: "Added to cart",
  });

  return (
    <button
      className="h-12 bg-gray-500 text-white rounded w-full max-w-[345px] hover:ring-1 ring-gray-500 duration-200 flex justify-center items-center"
      onClick={() => patchCartItemMutation.trigger({ id, data })}
    >
      {patchCartItemMutation.isMutating ? <Spinner size="sm" /> : children}
    </button>
  );
}
