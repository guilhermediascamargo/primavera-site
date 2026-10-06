export type Competition = "Copa FGF" | "Série A2";
export type VenueFilter = "all" | "home" | "away";
export type MatchResult = "win" | "draw" | "loss";

export type SeasonTeam = {
  slug: string;
  name: string;
  abbreviation: string;
  crest?: string;
};

export type MatchVenue = {
  name: string;
  city?: string;
  image?: string;
};

export type SeasonMatch = {
  id: string;
  month: string;
  date?: string;
  time?: string;
  competition: Competition;
  phaseOrRound: string;
  homeTeam: SeasonTeam;
  awayTeam: SeasonTeam;
  homeScore: number;
  awayScore: number;
  status: "finished";
  venue?: MatchVenue;
  goals: readonly MatchGoal[];
  aggregate?: readonly [number, number];
  shootout?: readonly [number, number];
};

export type MatchGoal = {
  scorer: string;
  teamSlug: string;
  minute: string;
  kind?: "own-goal" | "penalty";
};
