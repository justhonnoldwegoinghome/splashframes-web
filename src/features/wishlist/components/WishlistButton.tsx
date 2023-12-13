import { useEffect, useState } from "react";

import { Image } from "@/features/images";

import { useWishlistItems } from "../api/getWishlistItems";
import { DeleteWishlistItemButton } from "./DeleteWishlistItemButton";
import { CreateWishlistItemButton } from "./CreateWishlistItemButton";

interface WishlistButtonProps {
  imageId: Image["id"];
}

export function WishlistButton({ imageId }: WishlistButtonProps) {
  const [isInWishList, setIsInWishlist] = useState<boolean | null>(null);

  const wishlistItemsQuery = useWishlistItems();

  useEffect(() => {
    if (wishlistItemsQuery.data) {
      setIsInWishlist(
        wishlistItemsQuery.data.results.map((w) => w.image_id).includes(imageId)
      );
    }
  }, [wishlistItemsQuery.data]);

  if (isInWishList === null) return;

  if (isInWishList)
    return <DeleteWishlistItemButton wishlistItem={{ image_id: imageId }} />;

  return <CreateWishlistItemButton wishlistItem={{ image_id: imageId }} />;
}
