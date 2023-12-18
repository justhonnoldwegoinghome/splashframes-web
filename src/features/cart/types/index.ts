import { Splashframe, Variant } from "@/features/splashframes";

export interface CartItem {
  id: string;
  splashframe_id: Splashframe["id"];
  variant_id: Variant["id"];
  quantity: number;
}
