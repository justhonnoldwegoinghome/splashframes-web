import { Image } from "@/features/images";

export interface Product {
  id: string;
  image_id: Image["id"];
  size: "small" | "medium";
  name: string;
  width_inches: number;
  height_inches: number;
  price_sgd: number;
}
