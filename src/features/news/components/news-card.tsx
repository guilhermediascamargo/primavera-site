import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "../domain/news-article";
import NewsMeta from "./news-meta";
import styles from "./news.module.css";

export default function NewsCard({
  article,
  variant = "standard",
  preload = false,
}: {
  article: NewsArticle;
  variant?: "lead" | "secondary" | "standard";
  preload?: boolean;
}) {
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <Link href={`/noticias/${article.slug}`} className={styles.cardLink}>
        <div className={styles.cardImage}>
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            fill
            sizes={
              variant === "lead"
                ? "(max-width: 959px) 90vw, 55vw"
                : "(max-width: 639px) 90vw, (max-width: 959px) 45vw, 33vw"
            }
            preload={preload}
          />
        </div>
        <div className={styles.cardText}>
          <NewsMeta article={article} />
          <h3>{article.title}</h3>
          {variant === "lead" && (
            <p className={styles.cardExcerpt}>{article.excerpt}</p>
          )}
          <span className={styles.arrow} aria-hidden="true">
            <InterfaceArrow direction="up-right" />
          </span>
        </div>
      </Link>
    </article>
  );
}
