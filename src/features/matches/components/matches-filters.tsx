"use client";

import { useState, type ReactNode } from "react";
import type { Competition, VenueFilter } from "../domain/season-match";
import {
  filterSeason,
  groupByMonth,
  monthLabel,
  type MatchFilterEntry,
} from "../domain/season-helpers";
import styles from "./matches-page.module.css";

type RenderedMatch = MatchFilterEntry & { id: string; content: ReactNode };
const competitions = [
  { value: "all", label: "Todos" },
  { value: "Copa FGF", label: "Copa FGF" },
  { value: "Série A2", label: "Série A2" },
] as const;
const venues = [
  { value: "all", label: "Todos" },
  { value: "home", label: "Casa" },
  { value: "away", label: "Fora" },
] as const;

// Os cards chegam prontos do servidor. Só filtros e agrupamento visível são Client.
export default function MatchesFilters({
  matches,
}: {
  matches: RenderedMatch[];
}) {
  const [competition, setCompetition] = useState<Competition | "all">("all");
  const [venue, setVenue] = useState<VenueFilter>("all");
  const visible = filterSeason(matches, competition, venue);
  return (
    <>
      <div className={styles.controls}>
        <fieldset>
          <legend>Competição</legend>
          <div className={styles.options}>
            {competitions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={competition === option.value}
                aria-controls="season-matches"
                onClick={() => setCompetition(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Mando do Bagé</legend>
          <div className={styles.options}>
            {venues.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={venue === option.value}
                aria-controls="season-matches"
                onClick={() => setVenue(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className={styles.count} role="status" aria-live="polite">
          <strong>{visible.length}</strong> de {matches.length} jogos
        </p>
      </div>
      <div id="season-matches" className={styles.timeline}>
        {groupByMonth(visible).map(([month, entries]) => (
          <section
            key={month}
            aria-labelledby={`month-${month}`}
            className={styles.month}
          >
            <div className={styles.monthHeading}>
              <h2 id={`month-${month}`}>{monthLabel(month)}</h2>
              <span>
                {String(entries.length).padStart(2, "0")}{" "}
                {entries.length === 1 ? "jogo" : "jogos"}
              </span>
            </div>
            <ol className={styles.matchList}>
              {entries.map((match) => (
                <li key={match.id}>{match.content}</li>
              ))}
            </ol>
          </section>
        ))}
        {visible.length === 0 && (
          <p className={styles.empty}>
            Nenhum jogo nesta combinação de filtros.
          </p>
        )}
      </div>
    </>
  );
}
