import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
// O bundler resolve imports TS sem extensão; o Node nativo precisa dela.
// A adaptação é restrita à carga do dataset de News e não altera a aplicação.
const resolver = registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (
        error.code === "ERR_MODULE_NOT_FOUND" &&
        specifier.startsWith(".") &&
        context.parentURL?.includes("/src/features/news/")
      ) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});
export const {
  newsArticles,
} = require("../src/features/news/data/news-articles.ts");
export const {
  latestNews,
  homeFeaturedNews,
  relatedNews,
  getNewsBySlug,
  newsDateLabel,
} = require("../src/features/news/domain/news-helpers.ts");
resolver.deregister();
const { matches2026 } = require("../src/features/matches/data/matches-2026.ts");
const {
  seasonSummary,
} = require("../src/features/matches/domain/season-helpers.ts");

test("News: dez matérias válidas, slugs únicos, imagens locais e blocos completos", () => {
  assert.equal(newsArticles.length, 10);
  assert.equal(new Set(newsArticles.map(({ slug }) => slug)).size, 10);
  let internalImages = 0;
  for (const article of newsArticles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(["FUTEBOL", "CLUBE"].includes(article.category));
    assert.match(article.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(
      new Date(article.publishedAt).toISOString().slice(0, 10),
      article.publishedAt,
    );
    assert.ok(article.title.trim());
    assert.ok(article.excerpt.trim());
    assert.ok(article.body.length);
    const images = [article.cover];
    for (const block of article.body) {
      assert.ok(["paragraph", "heading", "image"].includes(block.type));
      if (block.type === "image") {
        assert.notDeepEqual(
          readFileSync(new URL("../public" + block.image.src, import.meta.url)),
          readFileSync(
            new URL("../public" + article.cover.src, import.meta.url),
          ),
          "A imagem interna não deve repetir a fotografia de capa",
        );
        images.push(block.image);
        internalImages++;
      } else assert.ok(block.text.trim());
    }
    for (const image of images) {
      assert.ok(image.src.startsWith("/images/"));
      assert.ok(image.alt.trim());
      assert.ok(
        existsSync(new URL("../public" + image.src, import.meta.url)),
        image.src,
      );
      assert.equal(image.provisional, true);
      assert.equal(
        image.credit,
        undefined,
        "Não atribuir crédito sem fonte conhecida",
      );
    }
  }
  assert.equal(internalImages, 4);
});

test("News: curadoria única 1/2/3 e ordenação sem alterar o cadastro", () => {
  const original = newsArticles.map(({ slug }) => slug);
  const featured = homeFeaturedNews(newsArticles);
  assert.equal(featured.length, 3);
  assert.deepEqual(
    featured.map(({ homeFeatured }) => homeFeatured),
    [1, 2, 3],
  );
  assert.deepEqual(
    featured.map(({ slug }) => slug),
    [
      "os-numeros-do-bage-na-temporada-2026",
      "bage-celebra-106-anos-com-vitoria-no-pedra-moura",
      "bage-vence-farroupilha-e-avanca-a-semifinal-da-copa-fgf",
    ],
  );
  const ordered = latestNews(newsArticles);
  assert.equal(ordered[0].publishedAt, "2026-09-28");
  assert.equal(ordered.at(-1).publishedAt, "2026-05-13");
  for (let i = 1; i < ordered.length; i++)
    assert.ok(ordered[i - 1].publishedAt >= ordered[i].publishedAt);
  assert.deepEqual(
    newsArticles.map(({ slug }) => slug),
    original,
  );
  assert.deepEqual(homeFeaturedNews([]), []);
});

test("News: relacionadas excluem a atual, priorizam categoria e completam por recência", () => {
  const current = homeFeaturedNews(newsArticles)[0];
  const related = relatedNews(newsArticles, current);
  assert.equal(related.length, 3);
  assert.equal(new Set(related.map(({ slug }) => slug)).size, 3);
  assert.ok(related.every(({ slug }) => slug !== current.slug));
  assert.equal(related[0].category, "CLUBE");
  assert.deepEqual(
    related.slice(1),
    latestNews(newsArticles)
      .filter(({ category }) => category === "FUTEBOL")
      .slice(0, 2),
  );
  assert.deepEqual(relatedNews([current], current), []);
  assert.deepEqual(relatedNews(newsArticles, current, 0), []);
  assert.equal(getNewsBySlug(newsArticles, "nao-existe"), undefined);
  assert.equal(getNewsBySlug(newsArticles, current.slug), current);
  assert.equal(newsDateLabel("2026-09-28"), "28 set 2026");
});

test("News: balanço e autores dos gols preservam a fonte esportiva", () => {
  const summary = seasonSummary(matches2026);
  const stats = homeFeaturedNews(newsArticles)[0];
  const statsText = stats.body
    .filter(({ type }) => type === "paragraph")
    .map(({ text }) => text)
    .join(" ");
  for (const text of [
    `${summary.played} partidas`,
    `${summary.win} vitórias`,
    `${summary.draw} empates`,
    `${summary.loss} derrotas`,
    `${summary.goalsFor} gols`,
    `sofreu ${summary.goalsAgainst}`,
    `saldo foi de ${summary.goalsFor - summary.goalsAgainst}`,
  ])
    assert.ok(statsText.includes(text), text);
  const match = matches2026.find(({ id }) => id === "a2-15");
  const article = getNewsBySlug(
    newsArticles,
    "bage-fecha-temporada-com-vitoria-no-pedra-moura",
  );
  assert.equal(article.publishedAt, match.date);
  const paragraphs = article.body.filter(({ type }) => type === "paragraph");
  for (const goal of match.goals) {
    const paragraph = paragraphs.find(({ text }) =>
      text.startsWith(goal.teamSlug === "bage" ? "Os gols" : "Pelo Brasil"),
    );
    assert.ok(paragraph.text.includes(`${goal.scorer} (${goal.minute})`));
  }
});
