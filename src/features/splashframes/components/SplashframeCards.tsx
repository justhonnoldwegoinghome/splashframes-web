import _ from "lodash";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IdsFilter, useSplashframesInfinite } from "../api/getSplashframes";
import { SplashframeCard } from "./SplashframeCard";

/* 
There are two options for choosing which element to place `ref` on:
1) The last card
2) An element at the bottom of all cards

Both options have the possibility of `inView` becoming `true` momentarily on first render. 
This is because <img/> are slow to load, causing the initial card to be very small.  

We can either make each card have a min-height or just live with the possibility of 2 (non-duplicate) api requests on first render.
*/

interface SplashframeCardsProps {
  ids_filter?: IdsFilter;
}

export function SplashframeCards({ ids_filter }: SplashframeCardsProps) {
  const splashframesQuery = useSplashframesInfinite({ ids_filter });

  const { ref, inView, entry } = useInView();
  useEffect(() => {
    if (inView && !splashframesQuery.hasEnded) {
      splashframesQuery.loadMore();
    }
  }, [inView, splashframesQuery.hasEnded, entry]);

  if (!splashframesQuery.data)
    return (
      <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 tablet:gap-12 laptop:gap-16">
        {Array.from(Array(24).keys()).map((i) => (
          <div
            key={i}
            className="w-full aspect-[5/4] bg-gray-100 animate-pulse rounded tablet:rounded-xl"
          />
        ))}
      </div>
    );

  const splashframes = splashframesQuery.data.results;

  return (
    <div>
      <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 tablet:gap-12 laptop:gap-16">
        {splashframes.map((s, i) => (
          <div ref={i === splashframes.length - 1 ? ref : undefined} key={s.id}>
            <SplashframeCard splashframe={s} />
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
