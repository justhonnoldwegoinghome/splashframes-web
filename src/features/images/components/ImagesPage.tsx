import _ from "lodash";
import clsx from "clsx";

import {
  AddToWishlistButton,
  RemoveFromWishlistButton,
  useWishlist,
} from "@/features/wishlist";

import { useImagesInfinite } from "../api/getImages";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

export function ImagesPage() {
  const wishlistQuery = useWishlist();
  const { data, hasEnded, loadMore } = useImagesInfinite();

  if (!wishlistQuery.data || !data)
    return (
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
        {Array.from(Array(24).keys()).map((i) => (
          <ImageCardSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
        {_.flatten(data.map((d) => d.results)).map((img) => (
          <div key={img.id}>
            <ImageCard image={img} />
            {wishlistQuery.data?.results.map((w) => w.id).includes(img.id) ? (
              <RemoveFromWishlistButton wishlistItem={{ id: img.id }} />
            ) : (
              <AddToWishlistButton wishlistItem={{ id: img.id }} />
            )}
          </div>
        ))}
      </div>
      <button
        disabled={hasEnded}
        onClick={() => loadMore()}
        className={clsx({ "text-red-500 cursor-not-allowed": hasEnded })}
      >
        {hasEnded ? "End" : "Load more"}
      </button>
    </div>
  );
}
