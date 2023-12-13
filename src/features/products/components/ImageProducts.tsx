import { APIList } from "@/types/api";
import { AddCartItemButton } from "@/features/cart";

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
          <AddCartItemButton cartItem={{ product_id: p.id, quantity: 1 }} />
        </div>
      ))}
    </div>
  );
}
