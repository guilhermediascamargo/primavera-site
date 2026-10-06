export type NewsSummary = {
  id: string;
  title: string;
  category?: string;
  image?: { src: string; alt: string };
  contentStatus: "verified" | "demo";
};
