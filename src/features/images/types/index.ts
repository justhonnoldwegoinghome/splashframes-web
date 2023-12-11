export interface Image {
  id: string;
  added_at: string;
  urls: [string, ...string[]];
  tags: [string, ...string[]];
  orientation: "landscape" | "square" | "portrait";
  title: string;
  description: string;
}
