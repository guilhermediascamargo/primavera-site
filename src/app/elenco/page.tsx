import type { Metadata } from "next";
import SquadTabs from "@/features/athletes/components/squad-tabs";
import ProfessionalSquad from "@/features/athletes/components/professional-squad";
import YouthSquad from "@/features/athletes/components/youth-squad";
import FootballLeadership from "@/features/club/components/football-leadership";

export const metadata: Metadata = { title: "Elenco | Grêmio Esportivo Bagé" };

export default function SquadPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 pt-10 pb-20 sm:px-10 sm:pt-16 lg:px-12 lg:pb-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-foreground-secondary uppercase">
            Grêmio Esportivo Bagé
          </p>
          <h1 className="text-[clamp(4rem,10vw,9rem)] leading-none font-bold tracking-[-0.065em]">
            Elenco
            <span aria-hidden="true" className="text-bage-jalde">
              .
            </span>
          </h1>
        </div>
        <p className="pb-2 text-xs tracking-widest text-foreground-secondary uppercase">
          Futebol do clube
        </p>
      </div>
      <SquadTabs
        professional={<ProfessionalSquad />}
        youth={<YouthSquad />}
        leadership={<FootballLeadership />}
      />
    </main>
  );
}
