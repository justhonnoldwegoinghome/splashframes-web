import { z } from "zod";

import { Form } from "@/components/form";

import { useCreateCheckoutSession } from "../api/createCheckoutSession";
import { CartItem } from "../types";
import { CartItemsField } from "./CartItemsField";

const CreateCheckoutSessionInputSchema = z.object({
  cart_items: z.array(
    z.object({
      product_id: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
  currency: z.string(),
});

export type CreateCheckoutSessionInput = z.infer<
  typeof CreateCheckoutSessionInputSchema
>;

interface CreateCheckoutSessionFormProps {
  initialCartItems: CartItem[];
}

export function CreateCheckoutSessionForm({
  initialCartItems,
}: CreateCheckoutSessionFormProps) {
  const createCheckoutSessionMutation = useCreateCheckoutSession();

  const initialValues = {
    cart_items: initialCartItems,
    currency: "SGD",
  };

  // TODO: add listener to update localStorage when form values change

  return (
    <div className="border w-fit bg-gray-100">
      <h1>Checkout cart items form</h1>
      <Form<CreateCheckoutSessionInput, typeof CreateCheckoutSessionInputSchema>
        initialValues={initialValues}
        onSubmit={(v) => createCheckoutSessionMutation.trigger(v)}
        schema={CreateCheckoutSessionInputSchema}
      >
        {(register) => (
          <div>
            <CartItemsField
              label="Cart"
              registration={register("cart_items")}
            />
            <button type="submit">Checkout</button>
          </div>
        )}
      </Form>
    </div>
  );
}
