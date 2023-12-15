import _ from "lodash";
import { useEffect } from "react";

import { Registration } from "@/components/form";
import { ProductSummary } from "@/features/products";

import { CartItem } from "../types";
import { useUpdateCartItems } from "..";

interface CartItemsFieldProps {
  label: string;
  registration: Registration;
}

export function CartItemsField({ label, registration }: CartItemsFieldProps) {
  const { props, helpers } = registration;

  const cartItems: CartItem[] = props.value;

  const updateCartItemsMutation = useUpdateCartItems({});
  useEffect(() => {
    updateCartItemsMutation.trigger({ data: cartItems });
  }, [cartItems]);

  function updateQuantity(product_id: CartItem["product_id"], q: number) {
    helpers.setValue(
      _.map(cartItems, (c) => {
        if (c.product_id === product_id) {
          return { ...c, quantity: c.quantity + q };
        } else {
          return c;
        }
      })
    );
  }

  function removeCartItem(product_id: CartItem["product_id"]) {
    helpers.setValue(cartItems.filter((c) => c.product_id !== product_id));
  }

  return (
    <div className="p-4 bg-blue-100">
      <p>{label}</p>
      <div className="flex flex-col gap-4">
        {cartItems.map((c) => (
          <div key={c.product_id}>
            <ProductSummary id={c.product_id} />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => updateQuantity(c.product_id, -1)}
                disabled={c.quantity === 1}
              >
                Decrease quantity
              </button>
              <p>{c.quantity}</p>
              <button
                type="button"
                onClick={() => updateQuantity(c.product_id, 1)}
              >
                Increase quantity
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeCartItem(c.product_id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
