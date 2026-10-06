import AthleteCard from "@/features/athletes/components/athlete-card";
import { professionalAthletes } from "@/features/athletes/data/professional-athletes";
import {
  athleteGroups,
  type AthleteGroup,
} from "@/features/athletes/domain/athlete-profile";

export default function ProfessionalSquad() {
  return (
    <>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Profissional
        </h2>
        <p className="flex items-baseline gap-2 text-sm text-foreground-secondary">
          <span className="font-sport text-5xl font-semibold text-bage-ivory">
            {professionalAthletes.length}
          </span>{" "}
          atletas
        </p>
      </div>
      <div className="space-y-16 sm:space-y-24">
        {(Object.keys(athleteGroups) as AthleteGroup[]).map((group) => {
          const athletes = professionalAthletes.filter(
            (athlete) => athlete.group === group,
          );
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <div className="mb-6 flex items-baseline gap-5 border-t border-bage-ivory/20 pt-5">
                <h2
                  id={`group-${group}`}
                  className="text-lg font-semibold tracking-tight sm:text-2xl"
                >
                  {athleteGroups[group].title}
                </h2>
                <span
                  className="font-sport text-4xl font-semibold text-bage-jalde"
                  aria-label={`${athletes.length} atletas`}
                >
                  {String(athletes.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
                {athletes.map((athlete) => (
                  <li key={athlete.slug} className="min-w-0">
                    <AthleteCard athlete={athlete} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
