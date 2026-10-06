export type Countdown =
  | { status: "unconfirmed" }
  | { status: "elapsed" }
  | {
      status: "upcoming";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };

export function getCountdown(
  kickoffAt: string | undefined,
  now: number,
): Countdown {
  if (!kickoffAt || !Number.isFinite(now)) return { status: "unconfirmed" };
  const parts = kickoffAt.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|[+-]\d{2}:\d{2})$/,
  );
  if (!parts) return { status: "unconfirmed" };
  const year = Number(parts[1]),
    month = Number(parts[2]),
    day = Number(parts[3]);
  const calendar = new Date(Date.UTC(year, month - 1, day));
  const kickoff = Date.parse(kickoffAt);
  if (
    !Number.isFinite(kickoff) ||
    calendar.getUTCFullYear() !== year ||
    calendar.getUTCMonth() !== month - 1 ||
    calendar.getUTCDate() !== day ||
    Number(parts[4]) > 23 ||
    Number(parts[5]) > 59 ||
    Number(parts[6]) > 59
  )
    return { status: "unconfirmed" };
  const seconds = Math.ceil((kickoff - now) / 1000);
  if (seconds <= 0) return { status: "elapsed" };
  return {
    status: "upcoming",
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}
