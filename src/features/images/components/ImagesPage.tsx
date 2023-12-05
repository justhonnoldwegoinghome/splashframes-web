import {
  AddToCartButton,
  RemoveFromCartButton,
  useCart,
} from "@/features/cart";

import { useImages } from "../api/getImages";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

const DEFAULT_NUM_CARDS = 24;

export function ImagesPage() {
  const imagesQuery = useImages({
    page_token: null,
    max_page_size: DEFAULT_NUM_CARDS,
  });

  const cartQuery = useCart();

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
      {imagesQuery.data && cartQuery.data
        ? imagesQuery.data.results.map((img) => (
            <div key={img.id}>
              <ImageCard image={img} />
              {cartQuery.data?.results.includes(img.id) ? (
                <RemoveFromCartButton id={img.id} />
              ) : (
                <AddToCartButton id={img.id} />
              )}
            </div>
          ))
        : Array.from(Array(DEFAULT_NUM_CARDS).keys()).map((i) => (
            <ImageCardSkeleton key={i} />
          ))}
    </div>
  );
}
