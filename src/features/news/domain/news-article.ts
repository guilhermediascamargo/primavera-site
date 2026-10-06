export type NewsCategory = "FUTEBOL" | "CLUBE";

export type NewsImage = {
  src: string;
  alt: string;
  credit?: string;
  provisional?: boolean;
};

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; image: NewsImage };

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** Data editorial no formato YYYY-MM-DD, sem horário presumido. */
  publishedAt: string;
  cover: NewsImage;
  body: readonly NewsBlock[];
  homeFeatured?: 1 | 2 | 3;
};
