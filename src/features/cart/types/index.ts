import { Product } from "@/features/products";

export interface CartItem {
  productId: Product["id"];
  quantity: number;
}
