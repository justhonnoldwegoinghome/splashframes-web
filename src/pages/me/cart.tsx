import {
  UpdateCartItemForm,
  useCartItems,
  useCreateCheckoutSession,
} from "@/features/cart";

export default function Page() {
  const createCheckoutSessionMutation = useCreateCheckoutSession();
  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return;

  const cartItems = cartItemsQuery.data;

  return (
    <div>
      {cartItems.map((c) => (
        <UpdateCartItemForm key={c.id} cartItem={c} />
      ))}
      <div>
        <button
          onClick={() =>
            createCheckoutSessionMutation.trigger({
              data: { cart_items: cartItems },
            })
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
