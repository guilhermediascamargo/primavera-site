import Image from "next/image";
import type { TeamSummary } from "@/features/matches/domain/match-summary";

export default function TeamIdentity({
  team,
  small = false,
}: {
  team: TeamSummary;
  small?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3 text-center">
      <div
        className={`relative flex shrink-0 items-center justify-center ${small ? "h-10 w-10" : "h-18 w-18"}`}
      >
        {team.crest ? (
          <Image
            src={team.crest}
            alt=""
            fill
            sizes={small ? "40px" : "72px"}
            className="object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className={`flex h-full w-full items-center justify-center border border-foreground-secondary/40 font-display text-foreground-secondary ${small ? "text-xl" : "text-3xl"}`}
          >
            {team.name.trim().slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      <span
        title={team.name}
        className="max-w-full font-display text-lg leading-tight font-semibold wrap-anywhere"
      >
        {team.shortName ?? team.name}
      </span>
    </div>
  );
}
