import { APIList } from "@/types/api";
import { AddToCartButton } from "@/features/cart";

import { Product } from "..";

interface ImageProductsProps {
  imageProducts: APIList<Product>;
}

export function ImageProducts({ imageProducts }: ImageProductsProps) {
  return (
    <div className="flex flex-col gap-8">
      {imageProducts.results.map((p) => (
        <div key={p.id} className="bg-gray-100">
          <p>{p.name}</p>
          <AddToCartButton cartItem={{ productId: p.id, quantity: 1 }} />
        </div>
      ))}
    </div>
  );
}
