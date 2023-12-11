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
          <div key={w.imageId} className="border">
            <h2>{`Wishlist item image id: ${w.imageId}`}</h2>

            <div className="flex flex-col gap-4">
              <RemoveFromWishlistButton wishlistItem={w} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
