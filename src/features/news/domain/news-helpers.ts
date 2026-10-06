import type { NewsArticle } from "./news-article";

export function latestNews(articles: readonly NewsArticle[]) {
  return [...articles].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
}

export function homeFeaturedNews(articles: readonly NewsArticle[]) {
  return articles
    .filter((article) => article.homeFeatured !== undefined)
    .sort((a, b) => a.homeFeatured! - b.homeFeatured!);
}

export function relatedNews(
  articles: readonly NewsArticle[],
  current: NewsArticle,
  count = 3,
) {
  const others = latestNews(
    articles.filter(({ slug }) => slug !== current.slug),
  );
  return [
    ...others.filter(({ category }) => category === current.category),
    ...others.filter(({ category }) => category !== current.category),
  ].slice(0, Math.max(0, count));
}

export function getNewsBySlug(articles: readonly NewsArticle[], slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function newsDateLabel(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T12:00:00Z`))
    .replaceAll(" de ", " ")
    .replace(".", "");
}
