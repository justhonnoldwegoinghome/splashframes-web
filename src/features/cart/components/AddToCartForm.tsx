import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

import { Select } from "@/components/select";
import { Spinner } from "@/components/spinner";
import { Splashframe, Variant } from "@/features/splashframes";

import { useAddToCart } from "../api/addToCart";

export interface CreateCartItemInput {
  splashframe_id: Splashframe["id"];
  variant_id: Variant["id"];
  quantity: number;
}

interface AddToCartFormProps {
  splashframe: Splashframe;
}

export function AddToCartForm({ splashframe }: AddToCartFormProps) {
  const addToCartMutation = useAddToCart();

  const [variant, setVariant] = useState(splashframe.variants[0]);
  const [size, setSize] = useState(splashframe.variants[0].size);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setVariant(splashframe.variants.filter((v) => v.size === size)[0]);
  }, [size]);

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
      <div>
        <h1 className="text-3xl mb-2">{splashframe.title}</h1>
        <p className="text-gray-500 mb-8">{splashframe.description}</p>
        <p className="text-xl">{`$${variant.price_usd * quantity} USD`}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1.5">Size</p>
          <Select
            options={sizeOptions}
            selectedOption={selectedSizeOption}
            onChange={(o) => setSize(o.value)}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1.5">Quantity</p>
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
        <button
          className="h-12 bg-gray-500 text-white rounded w-full max-w-[345px] hover:ring-1 ring-gray-500 duration-200 flex justify-center items-center"
          onClick={() =>
            addToCartMutation.trigger({
              data: {
                splashframe_id: splashframe.id,
                variant_id: variant.id,
                quantity,
              },
            })
          }
        >
          {addToCartMutation.isMutating ? <Spinner size="sm" /> : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
