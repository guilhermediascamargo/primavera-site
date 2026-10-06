import Image from "next/image";
import CompetitionIdentity from "@/features/competitions/components/competition-identity";
import { matches2026, seasonVenues } from "../data/matches-2026";
import { isBageHome, seasonSummary } from "../domain/season-helpers";
import SeasonMatchCard from "./season-match-card";
import MatchesFilters from "./matches-filters";
import styles from "./matches-page.module.css";

export default function MatchesSeasonPage() {
  const summary = seasonSummary(matches2026);
  const stats = [
    { label: "Jogos", value: summary.played },
    { label: "Vitórias", value: summary.win },
    { label: "Empates", value: summary.draw },
    { label: "Derrotas", value: summary.loss },
    { label: "Gols marcados", value: summary.goalsFor },
    { label: "Gols sofridos", value: summary.goalsAgainst },
  ];
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            Grêmio Esportivo Bagé <span aria-hidden="true">/</span> Temporada
            2026
          </p>
          <h1>
            Jogos<span aria-hidden="true">.</span>
          </h1>
          <p className={styles.intro}>
            Competições oficiais do futebol profissional.
          </p>
          <p className={styles.heroCompetitions}>
            <CompetitionIdentity name="Copa FGF" />
            <CompetitionIdentity name="Série A2" />
          </p>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={seasonVenues.pedraMoura.image}
            alt="Arquibancada e bandeira jalde e negra no estádio Pedra Moura"
            fill
            sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
            preload
            className={styles.heroImage}
          />
          <span className={styles.year} aria-hidden="true">
            2026
          </span>
          <p className={styles.heroVenue}>
            Nossa casa <span>Pedra Moura</span>
          </p>
        </div>
      </header>
      <section
        className={styles.summary}
        aria-label="Balanço da temporada 2026"
      >
        <div className={styles.summaryHeading}>
          <h2>Balanço da temporada</h2>
          <span>
            Saldo <strong>{summary.goalsFor - summary.goalsAgainst}</strong>
          </span>
        </div>
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{String(stat.value).padStart(2, "0")}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className={styles.listing}>
        <MatchesFilters
          matches={matches2026.map((match) => ({
            id: match.id,
            month: match.month,
            competition: match.competition,
            isHome: isBageHome(match),
            content: <SeasonMatchCard match={match} />,
          }))}
        />
      </div>
    </main>
  );
}
