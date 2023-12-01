import { useImages } from "../api/getImages";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

const DEFAULT_NUM_CARDS = 24;

export function ImagesPage() {
  const imagesQuery = useImages({
    page_token: null,
    max_page_size: DEFAULT_NUM_CARDS,
  });

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
      {imagesQuery.data
        ? imagesQuery.data.results.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))
        : Array.from(Array(DEFAULT_NUM_CARDS).keys()).map((i) => (
            <ImageCardSkeleton key={i} />
          ))}
    </div>
  );
}
