import { AddToCartButton } from "@/features/cart";

import { useWishlist } from "../api/getWishlist";
import { RemoveFromWishlistButton } from "./RemoveFromWishlistButton";

export function WishlistPage() {
  const wishlistQuery = useWishlist();

  if (!wishlistQuery.data) return <div></div>;

  return (
    <div>
      <h1>Wishlist page</h1>
      <div className="flex gap-4">
        {wishlistQuery.data.results.map((w) => (
          <div key={w.id} className="border">
            <h2>{`Wishlist item id: ${w.id}`}</h2>

            <div className="flex flex-col gap-4">
              <RemoveFromWishlistButton wishlistItem={w} />
              <AddToCartButton cartItem={{ id: w.id, quantity: 1 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
