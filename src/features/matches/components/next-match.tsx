import TeamIdentity from "@/features/matches/components/team-identity";
import type { ScheduledMatch } from "@/features/matches/domain/match-summary";
import MatchCountdown from "./match-countdown";

export default function NextMatch({ match }: { match: ScheduledMatch | null }) {
  return (
    <section
      aria-labelledby="next-match-title"
      className="border-t-2 border-bage-jalde bg-bage-black/92 px-5 py-8 sm:px-12 lg:px-7 lg:py-9 xl:px-9"
    >
      <h2
        id="next-match-title"
        className="text-xs font-semibold tracking-[0.16em] text-bage-jalde uppercase"
      >
        Próximo jogo
      </h2>
      {match ? (
        <>
          {match.contentStatus === "demo" && (
            <p className="mt-2 text-xs text-foreground-secondary">
              Partida demonstrativa
            </p>
          )}
          <MatchCountdown kickoffAt={match.kickoffAt} />
          <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
            <p
              className={
                match.time
                  ? "font-sport text-4xl leading-none font-semibold tracking-tight"
                  : "py-4 text-xl"
              }
            >
              {match.time ?? "Horário a definir"}
            </p>
            <p className="pb-2 font-sport text-2xl text-foreground-secondary">
              {match.date ?? "Data a definir"}
            </p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-foreground-secondary">
            {match.competition} · {match.season}
          </p>
          <div className="my-7 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <TeamIdentity team={match.homeTeam} />
            <span className="font-sport text-3xl text-foreground-secondary">
              <span aria-hidden="true">×</span>
              <span className="sr-only">contra</span>
            </span>
            <TeamIdentity team={match.awayTeam} />
          </div>
          <p className="border-t border-bage-ivory/20 pt-5 text-sm text-foreground-secondary">
            {match.venue ?? "Local a definir"}
          </p>
        </>
      ) : (
        <p className="mt-6 text-foreground-secondary">
          A próxima partida ainda não está definida.
        </p>
      )}
    </section>
  );
}
