import type { NewsArticle } from "../domain/news-article";
import { newsDateLabel } from "../domain/news-helpers";
import styles from "./news.module.css";

export default function NewsMeta({
  article,
}: {
  article: Pick<NewsArticle, "category" | "publishedAt">;
}) {
  return (
    <p className={styles.meta}>
      <span>{article.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.publishedAt}>
        {newsDateLabel(article.publishedAt)}
      </time>
    </p>
  );
}
