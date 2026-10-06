import type { SeasonMatch } from "@/features/matches/domain/season-match";

export default function LastResult({
  match,
  prominent = false,
}: {
  match: SeasonMatch | null;
  prominent?: boolean;
}) {
  return (
    <section
      aria-labelledby="last-result-title"
      className={`border-t px-5 py-6 sm:px-12 lg:flex lg:min-h-30 lg:items-center lg:justify-between lg:gap-8 lg:px-[5vw] ${prominent ? "border-bage-jalde bg-bage-charcoal" : "border-bage-ivory/20 bg-bage-black"}`}
    >
      <h2
        id="last-result-title"
        className="shrink-0 text-xs font-semibold tracking-[0.16em] text-foreground-secondary uppercase"
      >
        Último jogo
      </h2>
      {match ? (
        <>
          <p className="sr-only">
            {match.homeTeam.name}: {match.homeScore}. {match.awayTeam.name}:{" "}
            {match.awayScore}.
          </p>
          <div
            aria-hidden="true"
            className="my-4 flex min-w-0 items-center justify-between gap-3 lg:my-0 lg:justify-center lg:gap-8"
          >
            <span className="min-w-0 text-sm font-semibold wrap-anywhere sm:text-lg">
              {match.homeTeam.name}
            </span>
            <span className="flex shrink-0 items-center gap-3 font-sport text-5xl leading-none font-semibold text-bage-jalde sm:text-6xl">
              <span>{match.homeScore}</span>
              <span className="text-2xl text-foreground-secondary">—</span>
              <span>{match.awayScore}</span>
            </span>
            <span className="min-w-0 text-sm font-semibold wrap-anywhere sm:text-lg">
              {match.awayTeam.name}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-foreground-secondary lg:text-right">
            {match.competition} · {match.month.slice(0, 4)}
            {match.date && (
              <span className="mt-1 block">
                {match.date.split("-").reverse().join("/")}
              </span>
            )}
          </p>
        </>
      ) : (
        <p className="mt-5 text-foreground-secondary lg:mt-0">
          Nenhum resultado disponível no momento.
        </p>
      )}
    </section>
  );
}
