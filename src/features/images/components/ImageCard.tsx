import Link from "next/link";

import { Image } from "..";

interface ImageCardProps {
  image: Image;
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <div>
      <Link href={`/images/${image.id}`}>
        <img src={image.url} />
      </Link>
    </div>
  );
}
