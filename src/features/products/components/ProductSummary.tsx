import { Image, useImage } from "@/features/images";

import { Product } from "..";
import { useProduct } from "../api/getProduct";

interface ProductSummaryProps {
  id: Product["id"];
}

export function ProductSummary({ id }: ProductSummaryProps) {
  const productQuery = useProduct({ id });

  if (!productQuery.data) return <div></div>;

  return (
    <div>
      <p>{productQuery.data.id}</p>
      <ProductImage id={productQuery.data.image_id} />
    </div>
  );
}

function ProductImage({ id }: { id: Image["id"] }) {
  const imageQuery = useImage({ id });

  if (!imageQuery.data) return <div></div>;

  return (
    <div>
      <p>{imageQuery.data.name}</p>
      <img src={imageQuery.data.urls[0]} className="w-24" />
    </div>
  );
}
