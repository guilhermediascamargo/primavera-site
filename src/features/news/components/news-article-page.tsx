import InterfaceArrow from "@/components/ui/interface-arrow";
import Link from "next/link";
import { newsArticles } from "../data/news-articles";
import type { NewsArticle } from "../domain/news-article";
import { relatedNews } from "../domain/news-helpers";
import NewsCard from "./news-card";
import NewsFigure from "./news-figure";
import NewsMeta from "./news-meta";
import styles from "./news.module.css";

export default function NewsArticlePage({ article }: { article: NewsArticle }) {
  return (
    <main id="conteudo" className={styles.page}>
      <article>
        <header className={styles.articleHeading}>
          <Link href="/noticias" className={styles.back}>
            <InterfaceArrow direction="left" /> Notícias
          </Link>
          <NewsMeta article={article} />
          <h1>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
        </header>
        <NewsFigure image={article.cover} cover />
        <div className={styles.body}>
          {article.body.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return <p key={index}>{block.text}</p>;
              case "heading":
                return <h2 key={index}>{block.text}</h2>;
              case "image":
                return <NewsFigure key={index} image={block.image} />;
            }
          })}
        </div>
      </article>
      <section className={styles.related} aria-labelledby="related-news">
        <div className={styles.relatedHeading}>
          <h2 id="related-news" className={styles.sectionTitle}>
            Outras notícias
          </h2>
          <Link href="/noticias" className={styles.allNews}>
            Todas as notícias{" "}
            <span aria-hidden="true">
              <InterfaceArrow direction="up-right" />
            </span>
          </Link>
        </div>
        <div className={styles.grid}>
          {relatedNews(newsArticles, article).map((item) => (
            <NewsCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
