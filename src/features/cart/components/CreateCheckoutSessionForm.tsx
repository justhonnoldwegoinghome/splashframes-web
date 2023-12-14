import _ from "lodash";
import { z } from "zod";
import { useForm, Controller, UseFormRegisterReturn } from "react-hook-form";

import { Form } from "@/components/form";

import { useCreateCheckoutSession } from "../api/createCheckoutSession";
import { CartItem } from "../types";

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
  const initialValues = {
    cart_items: initialCartItems,
    currency: "SGD",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateCheckoutSessionInput>({ defaultValues: initialValues });
  const createCheckoutSessionMutation = useCreateCheckoutSession();

  // TODO: add listener to update localStorage when form values change

  console.log("control", control);

  return (
    <div className="border w-fit bg-gray-100">
      <form onSubmit={handleSubmit((v) => console.log(v))}>
        <Controller
          name="cart_items"
          control={control}
          render={(renderProps) => (
            <CartItemsField
              value={renderProps.field.value}
              onChange={renderProps.field.onChange}
            />
          )}
        />
      </form>
    </div>
  );
}

function CartItemsField({
  value,
  onChange,
}: {
  value: CartItem[];
  onChange: (v: CartItem[]) => void;
}) {
  return (
    <div>
      {value.map((c) => (
        <div key={c.product_id} className="flex gap-4">
          <p>{c.product_id}</p>
          <input
            value={c.quantity}
            onChange={(e) => {
              onChange(
                _.map(value, (_c) => {
                  if (c.product_id === _c.product_id) {
                    return { ..._c, quantity: Number(e.target.value) };
                  } else {
                    return _c;
                  }
                })
              );
            }}
            type="number"
          />
        </div>
      ))}
    </div>
  );
}

// export function CreateCheckoutSessionForm({
//   initialCartItems,
// }: CreateCheckoutSessionFormProps) {
//   const createCheckoutSessionMutation = useCreateCheckoutSession();

//   const initialValues = {
//     cart_items: initialCartItems,
//     currency: "SGD",
//   };

//   // TODO: add listener to update localStorage when form values change

//   return (
//     <div className="border w-fit bg-gray-100">
//       <h1>Checkout cart items form</h1>
//       <Form<CreateCheckoutSessionInput, typeof CreateCheckoutSessionInputSchema>
//         initialValues={initialValues}
//         onSubmit={(v) => createCheckoutSessionMutation.trigger(v)}
//         schema={CreateCheckoutSessionInputSchema}
//       >
//         {(register) => (
//           <div>
//             <CartItemsField
//               label="Cart"
//               registration={register("cart_items")}
//             />
//             <button type="submit">Checkout</button>
//           </div>
//         )}
//       </Form>
//     </div>
//   );
// }
