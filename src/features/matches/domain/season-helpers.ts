import type {
  Competition,
  MatchResult,
  MatchGoal,
  SeasonMatch,
  VenueFilter,
} from "./season-match";

export function isBageHome(match: Pick<SeasonMatch, "homeTeam">) {
  return match.homeTeam.slug === "bage";
}

export function recentSeasonMatches(
  matches: readonly SeasonMatch[],
  count = 3,
) {
  return [...matches]
    .sort((a, b) => (b.date ?? b.month).localeCompare(a.date ?? a.month))
    .slice(0, count);
}

// O resultado da partida é independente do agregado e da disputa de pênaltis.
export function resultForBage(match: SeasonMatch): MatchResult {
  const difference =
    (match.homeScore - match.awayScore) * (isBageHome(match) ? 1 : -1);
  return difference > 0 ? "win" : difference < 0 ? "loss" : "draw";
}

export function seasonSummary(matches: readonly SeasonMatch[]) {
  return matches.reduce(
    (summary, match) => {
      summary[resultForBage(match)]++;
      summary.played++;
      summary.goalsFor += isBageHome(match) ? match.homeScore : match.awayScore;
      summary.goalsAgainst += isBageHome(match)
        ? match.awayScore
        : match.homeScore;
      return summary;
    },
    { played: 0, win: 0, draw: 0, loss: 0, goalsFor: 0, goalsAgainst: 0 },
  );
}

export type MatchFilterEntry = {
  competition: Competition;
  isHome: boolean;
  month: string;
};

export function filterSeason<T extends MatchFilterEntry>(
  matches: readonly T[],
  competition: Competition | "all",
  venue: VenueFilter,
): T[] {
  return matches.filter(
    (match) =>
      (competition === "all" || match.competition === competition) &&
      (venue === "all" || match.isHome === (venue === "home")),
  );
}

export function groupByMonth<T extends { month: string }>(
  matches: readonly T[],
) {
  const groups = new Map<string, T[]>();
  for (const match of matches) {
    const group = groups.get(match.month) ?? [];
    group.push(match);
    groups.set(match.month, group);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export function monthLabel(month: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${month}-01T12:00:00Z`))
    .replace(" de ", " ");
}

export function matchDateLabel(
  match: Pick<SeasonMatch, "date" | "month" | "time">,
) {
  if (!match.date) return `${monthLabel(match.month)} · dia a confirmar`;
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  const date = `${match.date.slice(8)} ${months[Number(match.date.slice(5, 7)) - 1]} ${match.date.slice(0, 4)}`;
  if (!match.time) return date;
  const [hour, minute] = match.time.split(":");
  return `${date} · ${hour}H${minute === "00" ? "" : minute}`;
}

export function goalBeneficiary(match: SeasonMatch, goal: MatchGoal) {
  if (goal.kind !== "own-goal") return goal.teamSlug;
  return goal.teamSlug === match.homeTeam.slug
    ? match.awayTeam.slug
    : match.homeTeam.slug;
}
