import { useCheckoutCartItems } from "../api/checkoutCartItems";
import { useCartItems } from "../api/getCartItems";

export function CheckoutCartItemsForm() {
  const checkoutCartItemsMutation = useCheckoutCartItems();

  const cartItemsQuery = useCartItems();

  if (!cartItemsQuery.data) return <div />;

  const cartItems = cartItemsQuery.data.results;

  return (
    <div className="border w-fit bg-gray-100">
      <h1>Checkout cart items form</h1>
      <div>
        <button
          onClick={() =>
            checkoutCartItemsMutation.trigger({
              cart_items: cartItems,
              currency: "SGD",
            })
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
