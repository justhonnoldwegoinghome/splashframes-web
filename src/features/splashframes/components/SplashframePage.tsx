import { AddToCartForm } from "@/features/cart";

import { Splashframe } from "..";

interface SplashframePageProps {
  splashframe: Splashframe;
}

export function SplashframePage({ splashframe }: SplashframePageProps) {
  return (
    <div>
      <div className="flex gap-4 tablet:gap-12 flex-wrap">
        <div className="flex-[3] min-w-[300px] flex flex-col gap-4">
          <div>
            <img src={splashframe.image_urls[0]} className="rounded" />
          </div>
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
            {splashframe.image_urls.slice(1).map((u) => (
              <img key={u} src={u} className="rounded" />
            ))}
          </div>
        </div>
        <div className="flex-[2] min-w-[300px]">
          <AddToCartForm splashframe={splashframe} />
        </div>
      </div>
    </div>
  );
}
