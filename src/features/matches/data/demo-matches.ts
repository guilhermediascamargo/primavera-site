import type {
  ScheduledMatch,
  TeamSummary,
} from "@/features/matches/domain/match-summary";

const bage: TeamSummary = {
  name: "Grêmio Esportivo Bagé",
  shortName: "Bagé",
  crest: "/images/brand/ge-bage-escudo.png",
};

const opponent: TeamSummary = { name: "Adversário" };

export const demoNextMatch: ScheduledMatch | null = {
  id: "demo-next-match",
  kickoffAt: "2026-10-18T16:00:00-03:00",
  competition: "Competição demonstrativa",
  season: "2026",
  homeTeam: bage,
  awayTeam: opponent,
  date: "18/10/2026",
  time: "16h",
  venue: "Local demonstrativo",
  status: "scheduled",
  contentStatus: "demo",
};
