import InterfaceArrow from "@/components/ui/interface-arrow";
import Link from "next/link";
import type { NewsSummary } from "@/features/news/domain/news-summary";

export default function FeaturedNews({ news }: { news: NewsSummary | null }) {
  return (
    <article>
      {news?.category && (
        <p className="mb-5 flex items-center gap-3 text-sm font-semibold">
          <span className="h-px w-8 bg-bage-jalde" aria-hidden="true" />
          {news.category}
        </p>
      )}
      <h1 className="max-w-[17ch] text-[clamp(2.5rem,5.1vw,6rem)] leading-[0.98] font-bold tracking-[-0.055em] text-balance wrap-anywhere">
        {news?.title ?? "Grêmio Esportivo Bagé"}
      </h1>
      {!news && <p className="mt-5">Nenhuma notícia em destaque no momento.</p>}
      <Link
        href="/noticias"
        className="mt-6 inline-flex min-h-11 items-center gap-5 border-b border-bage-ivory/50 py-2 text-sm font-semibold hover:text-bage-jalde focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde"
      >
        Acessar notícias{" "}
        <span aria-hidden="true">
          <InterfaceArrow direction="right" />
        </span>
      </Link>
    </article>
  );
}
