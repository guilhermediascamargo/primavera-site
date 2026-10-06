import { newsArticles } from "../data/news-articles";
import { latestNews } from "../domain/news-helpers";
import NewsCard from "./news-card";
import NewsHighlights from "./news-highlights";
import styles from "./news.module.css";

export default function NewsPage() {
  const ordered = latestNews(newsArticles);
  return (
    <main id="conteudo" className={styles.page}>
      <header className={styles.pageHeading}>
        <span className={styles.thread} aria-hidden="true" />
        <h1>Notícias</h1>
      </header>
      <section aria-labelledby="news-highlights">
        <h2 id="news-highlights" className={styles.srOnly}>
          Destaques
        </h2>
        <NewsHighlights articles={ordered.slice(0, 3)} preload />
      </section>
      <section className={styles.remaining} aria-labelledby="latest-news">
        <h2 id="latest-news" className={styles.sectionTitle}>
          Últimas notícias
        </h2>
        <div className={styles.grid}>
          {ordered.slice(3).map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
