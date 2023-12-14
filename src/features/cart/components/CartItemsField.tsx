import _ from "lodash";

import { Registration } from "@/components/form";

import { CartItem } from "../types";

interface CartItemsFieldProps {
  label: string;
  registration: Registration;
}

export function CartItemsField({ label, registration }: CartItemsFieldProps) {
  const { props, meta, helpers } = registration;

  function increaseQuantity(product_id: CartItem["product_id"]) {
    helpers.setValue(
      _.map(props.value, (c) => {
        if (c.product_id === product_id) {
          return { ...c, quantity: c.quantity + 1 };
        } else {
          return c;
        }
      })
    );
  }

  function decreaseQuantity(product_id: CartItem["product_id"]) {
    helpers.setValue(
      _.map(props.value, (c) => {
        if (c.product_id === product_id) {
          return { ...c, quantity: c.quantity - 1 };
        } else {
          return c;
        }
      })
    );
  }

  return (
    <div className="p-4 bg-blue-100">
      <p>{label}</p>
      <div className="flex flex-col gap-4">
        {props.value.map((c: CartItem, i: number) => (
          <div key={c.product_id} className="flex gap-4">
            <p>{c.product_id}</p>
            <p>{c.quantity}</p>
            <button
              type="button"
              onClick={() => increaseQuantity(c.product_id)}
            >
              Increase quantity
            </button>
            <button
              type="button"
              onClick={() => decreaseQuantity(c.product_id)}
            >
              Decrease quantity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
