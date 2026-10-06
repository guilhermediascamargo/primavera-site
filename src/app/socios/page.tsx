import type { Metadata } from "next";
import MembershipPage from "@/features/memberships/components/membership-page";

export const metadata: Metadata = {
  title: "Sócios | Grêmio Esportivo Bagé",
  description:
    "Conheça as modalidades de sócio e consulte o clube pelo WhatsApp. Benefícios ilustrativos neste protótipo, sem associação online.",
};

export default function MembersPage() {
  return <MembershipPage />;
}
