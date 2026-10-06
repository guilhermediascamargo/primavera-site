import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { getCountdown } = require("../src/features/matches/domain/countdown.ts");
const {
  membershipPlans,
} = require("../src/features/memberships/data/membership-plans.ts");
const {
  membershipWhatsApp,
} = require("../src/features/memberships/domain/membership-contact.ts");

test("countdown: fuso explícito, dias, menos de 24h, limite e dados não confirmados", () => {
  const kickoff = "2026-10-18T16:00:00-03:00";
  const instant = Date.parse("2026-10-18T19:00:00Z");
  assert.deepEqual(
    getCountdown(
      kickoff,
      instant - (2 * 86400 + 16 * 3600 + 24 * 60 + 8) * 1000,
    ),
    {
      status: "upcoming",
      days: 2,
      hours: 16,
      minutes: 24,
      seconds: 8,
    },
  );
  assert.deepEqual(getCountdown(kickoff, instant - 3600000), {
    status: "upcoming",
    days: 0,
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
  for (const now of [instant, instant + 1000]) {
    assert.deepEqual(getCountdown(kickoff, now), { status: "elapsed" });
  }
  for (const date of [
    undefined,
    "",
    "inválida",
    "2026-10-18",
    "2026-10-18T16:00:00",
    "2026-02-30T16:00:00-03:00",
  ]) {
    assert.deepEqual(getCountdown(date, instant), { status: "unconfirmed" });
  }
  assert.deepEqual(getCountdown(kickoff, NaN), { status: "unconfirmed" });
});

test("Sócios: 15 preços fornecidos, grupos e WhatsApp sem promessa de benefícios", () => {
  const expected = {
    "Sócio Torcedor": 60,
    "Sócio Torcedor Premium": 75,
    "Sócio Conselheiro Ouro": 150,
    "Sócio Conselheiro Prata": 140,
    "Sócio Conselheiro Bronze": 120,
    "Sócio Dependente": 30,
    "Sócio Fúria": 30,
    "Sócio Infantil": 10,
    "Sócio Parceiro Social": 10,
    "Sócio Juvenil": 20,
    "Sócio Escolinha": 50,
    "Sócio Família Jalde-negra": 30,
    "Sócio Sem Fronteiras": 30,
    "Sócio Segurança Pública": 40,
    "Sócio Educação": 40,
  };
  assert.equal(membershipPlans.length, 15);
  assert.equal(new Set(membershipPlans.map((plan) => plan.id)).size, 15);
  assert.deepEqual(
    Object.fromEntries(
      membershipPlans.map((plan) => [plan.name, plan.monthlyPrice]),
    ),
    expected,
  );
  for (const plan of membershipPlans) {
    assert.ok(
      ["supporter", "council", "community", "special"].includes(plan.family),
    );
    assert.ok(plan.demoBenefits.length > 0);
    const contact = new URL(membershipWhatsApp(plan.name));
    assert.equal(contact.hostname, "wa.me");
    assert.equal(contact.pathname, "/5553999561400");
    assert.equal(
      contact.searchParams.get("text"),
      `Olá! Gostaria de receber mais informações sobre a modalidade ${plan.name} do Grêmio Esportivo Bagé.`,
    );
    for (const benefit of plan.demoBenefits)
      assert.ok(!contact.searchParams.get("text").includes(benefit));
  }
});
