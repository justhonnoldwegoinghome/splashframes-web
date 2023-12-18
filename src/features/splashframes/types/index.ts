export interface Variant {
  id: string;
  size: "S" | "M";
  title: string;
  width_inches: number;
  height_inches: number;
  price_sgd: number;
}

export interface Splashframe {
  id: string;
  created_at: string;
  image_urls: [string, ...string[]];
  tags: [string, ...string[]];
  orientation: "landscape" | "square" | "portrait";
  title: string;
  description: string;
  variants: Variant[];
}
