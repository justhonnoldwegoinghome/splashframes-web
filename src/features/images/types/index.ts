export interface Image {
  id: string;
  created_at: string;
  urls: [string, ...string[]];
  tags: [string, ...string[]];
  orientation: "landscape" | "square" | "portrait";
  name: string;
  description: string;
}
