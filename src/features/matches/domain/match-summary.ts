export type TeamSummary = {
  name: string;
  shortName?: string;
  crest?: string;
};

type MatchDetails = {
  id: string;
  competition: string;
  season: string;
  homeTeam: TeamSummary;
  awayTeam: TeamSummary;
  date?: string;
  time?: string;
  venue?: string;
  contentStatus: "verified" | "demo";
};

export type ScheduledMatch = MatchDetails & {
  // Instante ISO com fuso explícito; não deduzir a partir dos textos de exibição.
  kickoffAt?: string;
  status: "scheduled";
  score?: never;
};

export type FinishedMatch = MatchDetails & {
  status: "finished";
  score: { home: number; away: number };
};

export type MatchSummary = ScheduledMatch | FinishedMatch;
