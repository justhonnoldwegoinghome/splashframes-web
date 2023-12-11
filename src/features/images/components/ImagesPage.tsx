import _ from "lodash";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import {
  AddToWishlistButton,
  RemoveFromWishlistButton,
  useWishlist,
} from "@/features/wishlist";

import { useImagesInfinite } from "../api/getImages";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

/* 
There are two options for choosing which element to place `ref` on:
1) The last <ImageCard />
2) An element at the bottom of all <ImageCard />

Either option doesn't solve the possibility of `inView` becoming `true` momentarily on first render. 
This is because <img/> are slow to load, causing the initial <ImageCard /> to be very small.  

We can either make <ImageCard /> have a min-height or just live with the possibility of 2 (non-duplicate) api requests on first render.
*/

export function ImagesPage() {
  const wishlistQuery = useWishlist();
  const imagesQuery = useImagesInfinite();

  const { ref, inView, entry } = useInView();
  useEffect(() => {
    if (inView && !imagesQuery.hasEnded) {
      imagesQuery.loadMore();
    }
  }, [inView, imagesQuery.hasEnded, entry]);

  if (!wishlistQuery.data || !imagesQuery.data)
    return (
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
        {Array.from(Array(24).keys()).map((i) => (
          <ImageCardSkeleton key={i} />
        ))}
      </div>
    );

  const images = imagesQuery.data.results;

  return (
    <div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div ref={i === images.length - 1 ? ref : undefined} key={img.id}>
            <ImageCard image={img} />
            {wishlistQuery.data?.results
              .map((w) => w.imageId)
              .includes(img.id) ? (
              <RemoveFromWishlistButton wishlistItem={{ imageId: img.id }} />
            ) : (
              <AddToWishlistButton wishlistItem={{ imageId: img.id }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
