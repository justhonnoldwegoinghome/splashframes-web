import Link from "next/link";

import { WishlistButton } from "@/features/wishlist";

import { Image } from "..";

interface ImageCardProps {
  image: Image;
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <div>
      <Link href={`/images/${image.id}`}>
        <img src={image.urls[0]} />
      </Link>
      <WishlistButton imageId={image.id} />
    </div>
  );
}
