import _ from "lodash";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import { IdsFilter, useImagesInfinite } from "../api/getImages";

/* 
There are two options for choosing which element to place `ref` on:
1) The last <ImageCard />
2) An element at the bottom of all <ImageCard />

Both options have the possibility of `inView` becoming `true` momentarily on first render. 
This is because <img/> are slow to load, causing the initial <ImageCard /> to be very small.  

We can either make <ImageCard /> have a min-height or just live with the possibility of 2 (non-duplicate) api requests on first render.
*/

interface ImageCardsProps {
  ids_filter?: IdsFilter;
}

export function ImageCards({ ids_filter }: ImageCardsProps) {
  const imagesQuery = useImagesInfinite({ ids_filter });

  const { ref, inView, entry } = useInView();
  useEffect(() => {
    if (inView && !imagesQuery.hasEnded) {
      imagesQuery.loadMore();
    }
  }, [inView, imagesQuery.hasEnded, entry]);

  if (!imagesQuery.data)
    return (
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-8 tablet:gap-12 laptop:gap-16">
        {Array.from(Array(24).keys()).map((i) => (
          <div
            key={i}
            className="w-full aspect-[5/4] bg-gray-100 animate-pulse rounded tablet:rounded-xl"
          />
        ))}
      </div>
    );

  const images = imagesQuery.data.results;

  return (
    <div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-8 tablet:gap-12 laptop:gap-16">
        {images.map((img, i) => (
          <div
            ref={i === images.length - 1 ? ref : undefined}
            key={img.id}
            className="bg-white p-1 hover:p-0 duration-300 rounded tablet:rounded-xl"
          >
            <div className="hover:shadow-[0_5px_10px_rgba(0,0,0,0.1)] duration-300 rounded tablet:rounded-xl">
              <Link href={`/images/${img.id}`}>
                <img src={img.urls[0]} className="rounded tablet:rounded-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-24 flex justify-center">
        <p className="border-t-2 border-gray-200 p-4 text-gray-500">
          You've reached the end
        </p>
      </div>
    </div>
  );
}
