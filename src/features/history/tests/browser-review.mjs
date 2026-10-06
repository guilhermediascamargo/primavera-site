// Optional browser validation using the environment's Playwright, without adding
// a dependency to the application. Run against an existing production server.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

assert.ok(
  process.env.HISTORY_PLAYWRIGHT_PATH,
  "Set HISTORY_PLAYWRIGHT_PATH to the available Playwright package.",
);
assert.ok(
  process.env.HISTORY_REVIEW_OUTPUT,
  "Set HISTORY_REVIEW_OUTPUT outside the repository.",
);
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HISTORY_PLAYWRIGHT_PATH);
const baseUrl = process.env.HISTORY_REVIEW_URL ?? "http://127.0.0.1:3000";
const output = process.env.HISTORY_REVIEW_OUTPUT;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.HISTORY_BROWSER_PATH
    ? { executablePath: process.env.HISTORY_BROWSER_PATH }
    : {}),
});
const results = [];
const scenes = [
  "antes",
  "origens",
  "fundacao",
  "casa",
  "imortais",
  "continuidade",
  "bagua",
  "pele",
  "resistir",
  "luzes",
  "centenario",
  "presente",
];

try {
  for (const width of [320, 390, 768, 1280, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${baseUrl}/historia`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("main h1").textContent(), "História");
    assert.equal(
      await page
        .locator("[role='img'][aria-label='Bagé 2, Grêmio Porto-Alegrense 1']")
        .count(),
      1,
    );
    assert.equal(
      await page
        .locator("[role='img'][aria-label='Bagé 7, Guarany 0']")
        .count(),
      1,
    );
    for (const scene of scenes) {
      await page.locator(`#${scene}`).evaluate((element) => {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 140,
          behavior: "instant",
        });
      });
      await page.waitForTimeout(120);
      const layout = await page.evaluate((id) => {
        const section = document.getElementById(id);
        const heading = section.querySelector("h2");
        const box = heading.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          headingFits: box.left >= 0 && box.right <= window.innerWidth,
          height: section.offsetHeight,
        };
      }, scene);
      assert.equal(
        layout.overflow,
        false,
        `${width}px / ${scene}: horizontal overflow`,
      );
      assert.equal(
        layout.headingFits,
        true,
        `${width}px / ${scene}: clipped heading`,
      );
      await page.screenshot({
        path: path.join(output, `${width}-${scene}.png`),
      });
      // Review both the beginning and progression of taller sticky scenes.
      if (layout.height > 1100) {
        await page.evaluate((id) => {
          const element = document.getElementById(id);
          window.scrollTo({
            top: element.offsetTop + element.offsetHeight * 0.55 - 140,
            behavior: "instant",
          });
        }, scene);
        await page.waitForTimeout(120);
        await page.screenshot({
          path: path.join(output, `${width}-${scene}-progression.png`),
        });
      }
    }
    await page.locator("#arquivo summary").focus();
    assert.equal(
      await page
        .locator("#arquivo summary")
        .evaluate((el) => getComputedStyle(el).outlineStyle),
      "solid",
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#arquivo details").getAttribute("open"),
      "",
    );
    assert.equal(await page.locator("#arquivo dt").count(), 19);
    await page.screenshot({ path: path.join(output, `${width}-archive.png`) });
    for (const href of ["/clube", "/elenco", "/noticias"]) {
      assert.equal(
        await page.locator(`#presente a[href='${href}']`).count(),
        1,
      );
    }
    await page.locator("#luzes").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const img = document.querySelector("#luzes img");
      return img.complete && img.naturalWidth > 0;
    });
    assert.deepEqual(errors, [], `${width}px: browser errors`);
    results.push({
      width,
      motion: "normal",
      scenes: scenes.length,
      overflow: false,
      archiveKeyboard: "passed",
      image: "loaded",
      browserErrors: errors,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const id of ["origens", "casa", "imortais", "luzes"]) {
      const motion = await page
        .locator(`#${id}`)
        .evaluate((el) =>
          [...el.querySelectorAll("*")].every(
            (child) =>
              getComputedStyle(child).animationName === "none" &&
              getComputedStyle(child).transitionDuration === "0s",
          ),
        );
      assert.equal(motion, true, `${width}px / ${id}: reduced motion`);
    }
    assert.equal(
      await page
        .locator("#imortais > div")
        .first()
        .evaluate((el) => getComputedStyle(el).position),
      "static",
    );
    await page.locator("#luzes").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(output, `${width}-reduced-motion.png`),
    });
    results.push({
      width,
      motion: "reduced",
      animations: "none",
      stickyScenes: "static",
    });
    await page.close();
  }
  const noJs = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  await noJs.goto(`${baseUrl}/historia`, { waitUntil: "networkidle" });
  assert.equal(await noJs.locator("[data-history-scene]").count(), 12);
  await noJs.locator("#arquivo summary").focus();
  await noJs.keyboard.press("Enter");
  assert.equal(await noJs.locator("#arquivo details").getAttribute("open"), "");
  assert.equal(await noJs.locator("#arquivo dt").count(), 19);
  await noJs.screenshot({ path: path.join(output, "390-no-javascript.png") });
  results.push({ javascript: false, scenes: 12, archiveKeyboard: "passed" });
  const shortPage = await browser.newPage({
    viewport: { width: 1280, height: 600 },
  });
  await shortPage.goto(`${baseUrl}/historia`, { waitUntil: "networkidle" });
  assert.equal(
    await shortPage
      .locator("#imortais > div")
      .first()
      .evaluate((el) => getComputedStyle(el).position),
    "static",
  );
  assert.equal(
    await shortPage
      .locator("#casa > div")
      .first()
      .evaluate((el) => getComputedStyle(el).position),
    "static",
  );
  results.push({ width: 1280, height: 600, stickyScenes: "static" });
  await writeFile(
    path.join(output, "results.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
