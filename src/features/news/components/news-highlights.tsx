import type { NewsArticle } from "../domain/news-article";
import NewsCard from "./news-card";
import styles from "./news.module.css";

export default function NewsHighlights({
  articles,
  preload = false,
}: {
  articles: readonly NewsArticle[];
  preload?: boolean;
}) {
  const [lead, ...secondary] = articles;
  if (!lead) return null;
  return (
    <div className={styles.highlights}>
      <NewsCard article={lead} variant="lead" preload={preload} />
      {secondary.length > 0 && (
        <div className={styles.secondaryStack}>
          {secondary.map((article) => (
            <NewsCard
              key={article.slug}
              article={article}
              variant="secondary"
            />
          ))}
        </div>
      )}
    </div>
  );
}
