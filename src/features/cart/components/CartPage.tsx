import { useCart } from "../api/getCart";
import { RemoveFromCartButton } from "./RemoveFromCartButton";

export function CartPage() {
  const cartQuery = useCart();

  if (!cartQuery.data) return <div></div>;

  return (
    <div>
      <h1>Cart page</h1>
      <div className="flex gap-4">
        {cartQuery.data.results.map((id) => (
          <div key={id} className="border">
            <h2>{`Cart item id: ${id}`}</h2>
            <RemoveFromCartButton id={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
