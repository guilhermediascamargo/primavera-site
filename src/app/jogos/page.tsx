import type { Metadata } from "next";
import MatchesSeasonPage from "@/features/matches/components/matches-page";

export const metadata: Metadata = {
  title: "Jogos 2026 | Grêmio Esportivo Bagé",
  description:
    "Resultados e trajetória do GE Bagé na Copa FGF e na Série A2 de 2026. Protótipo não oficial.",
};

export default function MatchesPage() {
  return <MatchesSeasonPage />;
}
