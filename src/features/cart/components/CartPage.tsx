import { useCart } from "../api/getCart";

export function CartPage() {
  const cartQuery = useCart();

  if (!cartQuery.data) return <div></div>;

  return (
    <div>
      <h1>Cart page</h1>
      <div className="flex gap-4">
        {cartQuery.data.results.map((c) => (
          <div key={c.productId} className="border">
            <h2>{`Cart item product id: ${c.productId}`}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
