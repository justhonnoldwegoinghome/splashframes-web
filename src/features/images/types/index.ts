export interface Image {
  id: string;
  url: string;
  tags: string[];
  orientation: "landscape" | "square" | "portrait";
  title: string;
  description: string;
}
