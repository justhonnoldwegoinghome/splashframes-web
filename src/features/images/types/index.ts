export interface Image {
  id: string;
  urls: [string, ...string[]];
  tags: [string, ...string[]];
  orientation: "landscape" | "square" | "portrait";
  title: string;
  description: string;
}
