import { Product } from "@/features/products";

export interface CartItem {
  product_id: Product["id"];
  quantity: number;
}
