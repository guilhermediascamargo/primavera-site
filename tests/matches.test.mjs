import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  matches2026,
  seasonTeams,
  seasonVenues,
} = require("../src/features/matches/data/matches-2026.ts");
const {
  seasonSummary,
  resultForBage,
  isBageHome,
  filterSeason,
  groupByMonth,
  matchDateLabel,
  goalBeneficiary,
  recentSeasonMatches,
} = require("../src/features/matches/domain/season-helpers.ts");

test("últimos resultados usam a ordem cronológica sem alterar o dataset", () => {
  const input = [...matches2026].reverse();
  const original = [...input];
  const latest = recentSeasonMatches(input, 1)[0];
  assert.equal(latest.id, "a2-15");
  assert.equal(latest.date, "2026-09-27");
  assert.equal(latest.homeTeam.slug, "bage");
  assert.equal(latest.awayTeam.slug, "brasil-pelotas");
  assert.deepEqual([latest.homeScore, latest.awayScore], [4, 1]);
  assert.deepEqual(input, original);
  assert.deepEqual(recentSeasonMatches([]), []);
});

test("temporada fornecida: 23 jogos únicos, 12 em casa, 11 fora e balanço correto", () => {
  assert.equal(new Set(matches2026.map((match) => match.id)).size, 23);
  assert.deepEqual(seasonSummary(matches2026), {
    played: 23,
    win: 6,
    draw: 8,
    loss: 9,
    goalsFor: 20,
    goalsAgainst: 26,
  });
  assert.equal(matches2026.filter(isBageHome).length, 12);
  assert.deepEqual(
    matches2026.map((match) => match.time),
    [
      "20:00",
      "20:00",
      "19:30",
      "15:00",
      "16:00",
      "15:00",
      "15:00",
      "14:00",
      "15:00",
      "19:30",
      "15:00",
      "19:00",
      "15:00",
      "17:00",
      "19:30",
      "19:30",
      "15:00",
      "19:00",
      "15:00",
      "19:00",
      "15:00",
      "20:00",
      "15:00",
    ],
  );
  assert.deepEqual(
    seasonSummary(
      matches2026.filter((match) => match.competition === "Copa FGF"),
    ),
    {
      played: 8,
      win: 3,
      draw: 2,
      loss: 3,
      goalsFor: 7,
      goalsAgainst: 7,
    },
  );
  // Os placares fornecidos somam 19 sofridos na A2. Preservados por decisão do responsável.
  assert.deepEqual(
    seasonSummary(
      matches2026.filter((match) => match.competition === "Série A2"),
    ),
    {
      played: 15,
      win: 3,
      draw: 6,
      loss: 6,
      goalsFor: 13,
      goalsAgainst: 19,
    },
  );
  for (const match of matches2026) {
    assert.equal(
      [match.homeTeam, match.awayTeam].filter((team) => team.slug === "bage")
        .length,
      1,
    );
    assert.equal(match.status, "finished");
    assert.match(match.time, /^\d{2}:\d{2}$/);
    assert.equal(match.goals.length, match.homeScore + match.awayScore);
    for (const team of [match.homeTeam, match.awayTeam]) {
      const expected =
        team === match.homeTeam ? match.homeScore : match.awayScore;
      assert.equal(
        match.goals.filter((goal) => goalBeneficiary(match, goal) === team.slug)
          .length,
        expected,
        match.id,
      );
    }
    for (const goal of match.goals) assert.match(goal.minute, /^\d+' [12]T$/);
    if (isBageHome(match)) assert.equal(match.venue, seasonVenues.pedraMoura);
    if (match.date) assert.equal(match.date.slice(0, 7), match.month);
  }
  assert.equal(
    matches2026.find((match) => match.id === "a2-07").date,
    "2026-08-22",
  );
  assert.equal(
    matches2026.find((match) => match.id === "a2-06").date,
    "2026-08-26",
  );
});

test("resultado do jogo, agregado e pênaltis são independentes; gol contra tem beneficiário correto", () => {
  const game = matches2026.find((match) => match.id === "fgf-sf-02");
  assert.deepEqual(game.aggregate, [1, 1]);
  assert.deepEqual(game.shootout, [3, 0]);
  assert.equal(game.phaseOrRound, "Semifinal — volta");
  assert.equal(
    matches2026.find((match) => match.id === "fgf-sf-01").phaseOrRound,
    "Semifinal — ida",
  );
  assert.equal(resultForBage(game), "win");
  assert.deepEqual(seasonSummary([game]), {
    played: 1,
    win: 1,
    draw: 0,
    loss: 0,
    goalsFor: 1,
    goalsAgainst: 0,
  });
  assert.equal(
    resultForBage(matches2026.find((match) => match.id === "fgf-05")),
    "loss",
  );
  assert.equal(
    resultForBage(matches2026.find((match) => match.id === "a2-12")),
    "draw",
  );
  const apafut = matches2026.find((match) => match.id === "a2-04");
  assert.equal(apafut.goals[0].scorer, "Edmilson");
  assert.equal(apafut.goals[0].teamSlug, "bage");
  assert.equal(apafut.goals[0].kind, "own-goal");
  assert.equal(
    goalBeneficiary(apafut, apafut.goals[0]),
    seasonTeams.apafut.slug,
  );
  assert.equal(apafut.goals.filter((goal) => goal.scorer === "Pará").length, 1);
  assert.equal(
    matches2026.find((match) => match.id === "a2-08").goals[0].kind,
    "penalty",
  );
});

test("filtros combinam competição e mando; meses preservam ordem cronológica", () => {
  const entries = matches2026.map((match) => ({
    ...match,
    isHome: isBageHome(match),
  }));
  const expected = [
    ["all", "all", 23],
    ["all", "home", 12],
    ["all", "away", 11],
    ["Copa FGF", "all", 8],
    ["Copa FGF", "home", 4],
    ["Copa FGF", "away", 4],
    ["Série A2", "all", 15],
    ["Série A2", "home", 8],
    ["Série A2", "away", 7],
  ];
  for (const [competition, venue, count] of expected)
    assert.equal(filterSeason(entries, competition, venue).length, count);
  assert.deepEqual(
    groupByMonth(entries).map(([month, games]) => [month, games.length]),
    [
      ["2026-05", 3],
      ["2026-06", 4],
      ["2026-07", 1],
      ["2026-08", 7],
      ["2026-09", 8],
    ],
  );
  assert.deepEqual(filterSeason([], "all", "all"), []);
  assert.deepEqual(seasonSummary([]), {
    played: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  });
});

test("datas, horários, estádios e escudos completos; mesma foto por estádio", () => {
  const first = matches2026.find((match) => match.id === "fgf-01");
  assert.equal(first.date, "2026-05-13");
  assert.equal(first.month, "2026-05");
  assert.equal(matchDateLabel(first), "13 MAI 2026 · 20H");
  assert.equal(
    matchDateLabel(matches2026.find((match) => match.id === "fgf-03")),
    "27 MAI 2026 · 19H30",
  );
  assert.equal(matches2026.filter((match) => !match.date).length, 0);
  assert.equal(
    matches2026.find((match) => match.id === "fgf-06").venue,
    seasonVenues.bocaDoLobo,
  );
  assert.equal(matches2026.filter((match) => !match.venue?.image).length, 0);
  assert.equal(
    Object.values(seasonTeams).filter((team) => team.crest).length,
    18,
  );
  const stadiumPhotos = new Map();
  for (const match of matches2026) {
    assert.ok(match.venue.city);
    assert.notEqual(match.date, "2026-05-08");
    assert.ok(
      ![match.homeTeam, match.awayTeam].some((team) => team.name === "Stand"),
    );
    if (stadiumPhotos.has(match.venue.name))
      assert.equal(match.venue.image, stadiumPhotos.get(match.venue.name));
    stadiumPhotos.set(match.venue.name, match.venue.image);
  }
  for (const path of [
    ...Object.values(seasonVenues).map((venue) => venue.image),
    ...Object.values(seasonTeams).flatMap((team) =>
      team.crest ? [team.crest] : [],
    ),
  ])
    assert.ok(existsSync(new URL("../public" + path, import.meta.url)), path);
});
