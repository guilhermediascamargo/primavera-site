import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticlePage from "@/features/news/components/news-article-page";
import { newsArticles } from "@/features/news/data/news-articles";
import { getNewsBySlug } from "@/features/news/domain/news-helpers";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return newsArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(newsArticles, slug);
  if (!article) notFound();
  return {
    title: `${article.title} | Grêmio Esportivo Bagé`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(newsArticles, slug);
  if (!article) notFound();
  return <NewsArticlePage article={article} />;
}
