import Image from "next/image";
import type { SeasonMatch, SeasonTeam } from "../domain/season-match";
import {
  isBageHome,
  matchDateLabel,
  resultForBage,
  goalBeneficiary,
} from "../domain/season-helpers";
import styles from "./season-match-card.module.css";

const resultLabels = { win: "Vitória", draw: "Empate", loss: "Derrota" };

function Team({ team }: { team: SeasonTeam }) {
  return (
    <div className={styles.team}>
      {team.crest ? (
        <Image
          src={team.crest}
          alt={`Escudo do ${team.name}`}
          width={60}
          height={72}
          sizes="(min-width: 640px) 60px, 44px"
          className={styles.crest}
        />
      ) : (
        <span
          className={styles.monogram}
          aria-label={`${team.name}: escudo não disponível`}
        >
          {team.abbreviation}
        </span>
      )}
      <span className={team.slug === "bage" ? styles.bage : undefined}>
        {team.name}
      </span>
    </div>
  );
}

export default function SeasonMatchCard({ match }: { match: SeasonMatch }) {
  const result = resultForBage(match);
  const teams = [match.homeTeam, match.awayTeam];
  return (
    <article
      className={styles.card}
      aria-labelledby={`${match.id}-title`}
      data-match-id={match.id}
    >
      <h3 id={`${match.id}-title`} className="sr-only">
        {match.homeTeam.name} contra {match.awayTeam.name} ·{" "}
        {matchDateLabel(match)}
      </h3>
      <div className={styles.stadium}>
        {match.venue?.image && (
          <Image
            src={match.venue.image}
            alt={`Estádio ${match.venue.name}`}
            fill
            sizes="(min-width: 1280px) 310px, (min-width: 1024px) 25vw, 100vw"
            className={styles.stadiumImage}
          />
        )}
        <div className={styles.stadiumCaption}>
          <span className={styles.venueMarker} aria-hidden="true">
            ⌖
          </span>
          <span>
            {match.venue?.name ?? "Estádio a confirmar"}
            {match.venue?.city && <small>{match.venue.city}</small>}
          </span>
        </div>
        <span className={styles.homeAway}>
          {isBageHome(match) ? "Casa" : "Fora"}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.topline}>
          <p>
            <span className={styles.competition}>{match.competition}</span>
            <span className={styles.round}>{match.phaseOrRound}</span>
          </p>
          <time
            dateTime={
              match.date
                ? `${match.date}${match.time ? `T${match.time}:00-03:00` : ""}`
                : match.month
            }
          >
            {matchDateLabel(match)}
          </time>
        </div>
        <div className={styles.scoreboard}>
          <Team team={match.homeTeam} />
          <div className={styles.scoreBlock}>
            <p
              className={styles.score}
              aria-label={`${match.homeScore} a ${match.awayScore}`}
            >
              <span>{match.homeScore}</span>
              <span className={styles.scoreDivider} aria-hidden="true">
                –
              </span>
              <span>{match.awayScore}</span>
            </p>
            <span className={styles.finished}>Encerrado</span>
          </div>
          <Team team={match.awayTeam} />
        </div>
        <div className={styles.bottomline}>
          <span className={styles.result} data-result={result}>
            <span aria-hidden="true" className={styles.resultDot} />
            {resultLabels[result]}{" "}
            <span className={styles.resultContext}>do Bagé</span>
          </span>
        </div>
        {(match.aggregate || match.shootout) && (
          <div className={styles.decider} aria-label="Decisão da semifinal">
            {match.aggregate && (
              <p>
                Agregado{" "}
                <strong>
                  {match.aggregate[0]}–{match.aggregate[1]}
                </strong>
              </p>
            )}
            {match.shootout && (
              <p>
                Pênaltis · {match.homeTeam.name}{" "}
                <strong>
                  {match.shootout[0]}–{match.shootout[1]}
                </strong>{" "}
                {match.awayTeam.name}
              </p>
            )}
          </div>
        )}
        {match.goals.length > 0 && (
          <div className={styles.goals}>
            <h4>Gols</h4>
            <dl>
              {teams.map((team) => {
                const goals = match.goals.filter(
                  (goal) => goalBeneficiary(match, goal) === team.slug,
                );
                if (goals.length === 0) return null;
                return (
                  <div key={team.slug}>
                    <dt>{team.slug === "bage" ? "Bagé" : team.name}</dt>
                    <dd>
                      {goals.map((goal, index) => (
                        <span key={`${goal.scorer}-${goal.minute}`}>
                          {index > 0 && <span aria-hidden="true"> · </span>}
                          {goal.scorer}
                          {goal.kind === "own-goal" &&
                            ` (${teams.find((club) => club.slug === goal.teamSlug)?.name})`}{" "}
                          <span className={styles.goalMinute}>
                            {goal.minute}
                          </span>
                          {goal.kind === "own-goal" && (
                            <>
                              {" "}
                              ·{" "}
                              <abbr title="Gol contra" aria-label="Gol contra">
                                GC
                              </abbr>
                            </>
                          )}
                          {goal.kind === "penalty" && (
                            <>
                              {" "}
                              ·{" "}
                              <abbr title="Pênalti" aria-label="Pênalti">
                                PÊN.
                              </abbr>
                            </>
                          )}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}
      </div>
    </article>
  );
}
