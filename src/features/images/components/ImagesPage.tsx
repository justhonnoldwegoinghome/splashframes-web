import _ from "lodash";
import clsx from "clsx";

import {
  AddToCartButton,
  RemoveFromCartButton,
  useCart,
} from "@/features/cart";

import { useImagesInfinite } from "../api/getImages";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

export function ImagesPage() {
  const cartQuery = useCart();
  const { data, hasEnded, loadMore } = useImagesInfinite();

  if (!cartQuery.data || !data)
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
            {cartQuery.data?.results.includes(img.id) ? (
              <RemoveFromCartButton id={img.id} />
            ) : (
              <AddToCartButton id={img.id} />
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
