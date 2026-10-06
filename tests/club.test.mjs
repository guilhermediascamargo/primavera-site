import assert from "node:assert/strict";
import { statSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  clubHotspots,
  clubMedia,
} = require("../src/features/club/data/club-hotspots.ts");
const {
  placeClubCard,
  playClubEntrance,
  shouldRevealInterior,
} = require("../src/features/club/domain/club-scene.ts");

test("Clube: cinco pontos únicos, camisa, três taças e escudo em coordenadas válidas", () => {
  assert.equal(clubHotspots.length, 5);
  assert.equal(new Set(clubHotspots.map(({ id }) => id)).size, 5);
  assert.deepEqual(
    ["shirt", "trophy", "crest"].map(
      (kind) => clubHotspots.filter((point) => point.kind === kind).length,
    ),
    [1, 3, 1],
  );
  for (const point of clubHotspots) {
    assert.ok(["left", "right", "top", "bottom"].includes(point.placement));
    assert.match(point.index, /^0[1-5] \/ 05$/);
    for (const value of Object.values(point.position)) {
      assert.ok(Number.isFinite(value) && value >= 0 && value <= 100);
    }
    for (const field of ["id", "eyebrow", "title", "description"]) {
      assert.equal(typeof point[field], "string");
      assert.ok(point[field].trim().length > 0);
    }
  }
  assert.equal(new Set(clubHotspots.map(({ index }) => index)).size, 5);
});

test("Clube: conquistas fornecidas e links restritos à História", () => {
  const trophies = clubHotspots.filter(({ kind }) => kind === "trophy");
  assert.deepEqual(
    trophies.map(({ meta }) => meta),
    ["1925", "1974", "1964 · 1982 · 1985"],
  );
  assert.equal(
    clubHotspots.find(({ kind }) => kind === "shirt").title,
    "Camisa principal 2026",
  );
  assert.equal(
    clubHotspots.find(({ kind }) => kind === "crest").title,
    "Símbolo Jalde-Negro",
  );
  for (const point of clubHotspots) {
    if (point.href) {
      assert.equal(point.href, "/historia");
      assert.ok(point.linkLabel);
    }
  }
  assert.equal(clubHotspots.filter(({ href }) => href).length, 4);
});

test("Clube: primeiro frame, interior e vídeo locais existem, sem fachada antiga", () => {
  assert.deepEqual(Object.keys(clubMedia).sort(), [
    "entrance",
    "entryPoster",
    "interior",
  ]);
  for (const path of Object.values(clubMedia)) {
    assert.ok(path.startsWith("/"));
    assert.doesNotMatch(path, /facade|fachada-master|interior-master/);
    assert.ok(!path.includes(".."));
    const asset = statSync(new URL(`../public${path}`, import.meta.url));
    assert.ok(asset.isFile() && asset.size > 0);
  }
  assert.equal(clubMedia.entryPoster, "/images/club/entry-poster.webp");
  assert.equal(clubMedia.interior, "/images/club/interior.webp");
});

test("Clube: cards e conectores ficam dentro da cena nas cinco larguras", () => {
  for (const width of [320, 390, 768, 1280, 1440]) {
    const scene = { width, height: (width * 9) / 16 };
    const card = {
      width: width < 768 ? width * 0.76 : 300,
      height: width < 768 ? scene.height * 0.6 - 8 : 260,
    };
    for (const point of clubHotspots) {
      const result = placeClubCard(point, scene, card);
      assert.ok(result.left >= 8 && result.top >= 8);
      assert.ok(result.left + card.width <= scene.width - 8);
      assert.ok(result.top + card.height <= scene.height - 8);
      assert.ok(
        result.endX >= result.left && result.endX <= result.left + card.width,
      );
      assert.ok(
        result.endY >= result.top && result.endY <= result.top + card.height,
      );
      if (width < 768) assert.equal(result.top, scene.height - card.height - 8);
    }
  }
  const point = { ...clubHotspots[0], position: { x: 95, y: 50 } };
  const result = placeClubCard(
    point,
    { width: 1280, height: 720 },
    { width: 300, height: 220 },
  );
  assert.ok(
    result.left + 300 < result.x,
    "Quando não cabe à direita, usa o lado oposto",
  );
});

test("Clube: blend somente nos últimos 220ms, com imagem pronta e duração válida", () => {
  assert.equal(shouldRevealInterior(7, 7.23, true), false);
  assert.equal(shouldRevealInterior(7.02, 7.23, true), true);
  assert.equal(shouldRevealInterior(7.23, 7.23, false), false);
  for (const duration of [NaN, Infinity, 0, -1])
    assert.equal(shouldRevealInterior(7, duration, true), false);
  assert.equal(shouldRevealInterior(NaN, 7.23, true), false);
});

test("Clube: reprodução reinicia silenciosa; ausência, rejeição e erro acionam fallback", async () => {
  let failures = 0;
  const fail = () => failures++;
  const video = { currentTime: 4, muted: false, play: async () => {} };
  await playClubEntrance(video, fail);
  assert.equal(video.currentTime, 0);
  assert.equal(video.muted, true);
  assert.equal(failures, 0);
  await playClubEntrance(null, fail);
  await playClubEntrance(
    { ...video, play: () => Promise.reject(new Error("Bloqueado")) },
    fail,
  );
  await playClubEntrance(
    {
      ...video,
      play: () => {
        throw new Error("Falha de mídia");
      },
    },
    fail,
  );
  assert.equal(failures, 3);
});
