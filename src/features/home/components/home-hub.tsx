import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { professionalAthletes } from "@/features/athletes/data/professional-athletes";
import { athleteGroups } from "@/features/athletes/domain/athlete-profile";
import { matches2026 } from "@/features/matches/data/matches-2026";
import {
  matchDateLabel,
  recentSeasonMatches,
  resultForBage,
  seasonSummary,
} from "@/features/matches/domain/season-helpers";
import type {
  SeasonMatch,
  SeasonTeam,
} from "@/features/matches/domain/season-match";
import { sponsors } from "@/features/sponsors/data/sponsors";
import { newsArticles } from "@/features/news/data/news-articles";
import { homeFeaturedNews } from "@/features/news/domain/news-helpers";
import NewsHighlights from "@/features/news/components/news-highlights";
import CompetitionIdentity from "@/features/competitions/components/competition-identity";
import AthleteRail from "./athlete-rail";
import styles from "./home-hub.module.css";

function Destination({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={styles.destination}>
      {children}
      <span aria-hidden="true">
        <InterfaceArrow direction="up-right" />
      </span>
    </Link>
  );
}

function Team({ team }: { team: SeasonTeam }) {
  return (
    <div className={styles.team}>
      {team.crest && (
        <Image
          src={team.crest}
          alt=""
          width={64}
          height={72}
          sizes="64px"
          className={styles.teamCrest}
        />
      )}
      <span>{team.name}</span>
    </div>
  );
}

function Fixture({
  match,
  latest = false,
}: {
  match: SeasonMatch;
  latest?: boolean;
}) {
  const result = { win: "Vitória", draw: "Empate", loss: "Derrota" }[
    resultForBage(match)
  ];
  return (
    <article
      className={latest ? styles.latest : styles.previous}
      data-home-match-id={match.id}
      aria-label={`${match.homeTeam.name} ${match.homeScore} a ${match.awayScore} ${match.awayTeam.name}`}
    >
      <div className={styles.matchMeta}>
        <span>{latest ? "Último resultado" : match.competition}</span>
        <time dateTime={match.date}>{matchDateLabel(match)}</time>
      </div>
      <div className={styles.scoreline}>
        <Team team={match.homeTeam} />
        <p className={styles.score}>
          {match.homeScore}
          <span aria-hidden="true">—</span>
          {match.awayScore}
        </p>
        <Team team={match.awayTeam} />
      </div>
      <div className={styles.matchFoot}>
        <span>
          {latest && <CompetitionIdentity name={match.competition} />}
          {latest && " · "}
          {match.phaseOrRound}
        </span>
        <span className={styles.result}>{result}</span>
      </div>
      {match.aggregate && (
        <p className={styles.specialScore}>
          Agregado {match.aggregate.join("–")}
        </p>
      )}
      {match.shootout && (
        <p className={styles.specialScore}>
          Pênaltis {match.shootout.join("–")}
        </p>
      )}
    </article>
  );
}

export default function HomeHub() {
  const recent = recentSeasonMatches(matches2026);
  const summary = seasonSummary(matches2026);

  return (
    <div className={styles.hub}>
      <section
        className={`${styles.section} ${styles.now}`}
        aria-labelledby="home-now"
      >
        <div className={`${styles.sectionHeading} ${styles.nowHeading}`}>
          <div>
            <span className={styles.marker} aria-hidden="true">
              01
            </span>
            <h2 id="home-now">Agora</h2>
          </div>
          <Destination href="/noticias">Todas as notícias</Destination>
        </div>
        <NewsHighlights articles={homeFeaturedNews(newsArticles)} />
      </section>

      <section
        className={`${styles.section} ${styles.squad}`}
        aria-labelledby="home-squad"
      >
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.marker} aria-hidden="true">
              02
            </span>
            <h2 id="home-squad">
              Quem veste
              <br />o <span>jalde.</span>
            </h2>
          </div>
          <Destination href="/elenco">Ver elenco completo</Destination>
        </div>
        <AthleteRail
          loopChildren={professionalAthletes.map((athlete) => (
            <li key={athlete.slug}>
              <AthletePoster athlete={athlete} decorative />
            </li>
          ))}
        >
          {professionalAthletes.map((athlete) => (
            <li key={athlete.slug}>
              <AthletePoster athlete={athlete} />
            </li>
          ))}
        </AthleteRail>
      </section>

      <section
        className={`${styles.section} ${styles.season}`}
        aria-labelledby="home-season"
      >
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.marker} aria-hidden="true">
              03
            </span>
            <h2 id="home-season">
              Temporada <span className={styles.seasonYear}>2026</span>
            </h2>
          </div>
          <Destination href="/jogos">Ver todos os jogos</Destination>
        </div>
        <div className={styles.seasonLayout}>
          {recent[0] && <Fixture match={recent[0]} latest />}
          <div className={styles.previousMatches}>
            {recent.slice(1).map((match) => (
              <Fixture key={match.id} match={match} />
            ))}
          </div>
        </div>
        <dl className={styles.seasonTotals}>
          {[
            ["Jogos", summary.played],
            ["Vitórias", summary.win],
            ["Empates", summary.draw],
            ["Derrotas", summary.loss],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className={`${styles.section} ${styles.history}`}
        aria-labelledby="home-history"
      >
        <div className={styles.historyIntro}>
          <span className={styles.marker} aria-hidden="true">
            04
          </span>
          <h2 id="home-history">
            Desde <span>1920.</span>
          </h2>
        </div>
        <div className={styles.historyDetail}>
          <Image
            src="/images/brand/ge-bage-escudo.png"
            alt="Escudo do Grêmio Esportivo Bagé"
            width={1280}
            height={1537}
            sizes="(min-width: 768px) 120px, 80px"
            className={styles.historyCrest}
          />
          <p>
            Fundado em <time dateTime="1920-08-05">5 de agosto de 1920</time>.
          </p>
          <Destination href="/historia">Conheça a história</Destination>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sponsors}`}
        aria-labelledby="home-sponsors"
      >
        <h2 id="home-sponsors">Patrocinadores</h2>
        <ul className={styles.sponsorGrid}>
          {sponsors.map((sponsor) => (
            <li key={sponsor.file}>
              <Image
                src={`/images/sponsors/${sponsor.file}`}
                alt={sponsor.name}
                width={1920}
                height={1080}
                sizes="(min-width: 1280px) 200px, (min-width: 768px) 240px, 160px"
                className={styles.sponsorLogo}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function AthletePoster({
  athlete,
  decorative = false,
}: {
  athlete: (typeof professionalAthletes)[number];
  decorative?: boolean;
}) {
  return (
    <Link
      href={`/elenco/${athlete.slug}`}
      className={styles.athlete}
      tabIndex={decorative ? -1 : undefined}
      draggable={false}
    >
      <span className={styles.athletePlane} aria-hidden="true" />
      {athlete.number !== undefined && (
        <span className={styles.athleteNumber}>
          <span className="sr-only">Número documentado em 2026: </span>
          {athlete.number}
        </span>
      )}
      {athlete.portraitImage && (
        <Image
          src={athlete.portraitImage.src}
          alt={athlete.portraitImage.alt}
          fill
          sizes="(min-width: 1024px) 330px, 270px"
          className={styles.portrait}
          draggable={false}
          style={{
            objectPosition:
              athlete.portraitImage.objectPosition ?? "center bottom",
          }}
        />
      )}
      <div className={styles.athleteIdentity}>
        <p>{athleteGroups[athlete.group].position}</p>
        <h3>{athlete.name}</h3>
        <span className={styles.athleteArrow} aria-hidden="true">
          <InterfaceArrow direction="up-right" />
        </span>
      </div>
    </Link>
  );
}
