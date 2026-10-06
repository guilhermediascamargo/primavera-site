import type { ClubHotspot } from "./club-hotspot";

export const interiorBlendSeconds = 0.22;

export async function playClubEntrance(
  video: {
    currentTime: number;
    muted: boolean;
    play: () => Promise<void>;
  } | null,
  onFailure: () => void,
) {
  try {
    if (!video) throw new Error("Vídeo não disponível");
    video.muted = true;
    video.currentTime = 0;
    await video.play();
  } catch {
    onFailure();
  }
}

export function shouldRevealInterior(
  time: number,
  duration: number,
  ready: boolean,
) {
  return (
    ready &&
    Number.isFinite(duration) &&
    duration > 0 &&
    Number.isFinite(time) &&
    time >= 0 &&
    duration - time <= interiorBlendSeconds
  );
}

/** Posiciona um único card medido dentro da cena, preservando o marcador. */
export function placeClubCard(
  point: ClubHotspot,
  scene: { width: number; height: number },
  card: { width: number; height: number },
) {
  const margin = 8;
  const gap = 28;
  const x = (scene.width * point.position.x) / 100;
  const y = (scene.height * point.position.y) / 100;
  const offsetY =
    scene.width >= 1024 ? (scene.height * (point.cardOffsetY ?? 0)) / 100 : 0;
  const clamp = (value: number, max: number) =>
    Math.max(margin, Math.min(value, max - margin));
  const candidates = {
    right: {
      x: x + gap,
      y: clamp(y - card.height / 2 + offsetY, scene.height - card.height),
    },
    left: {
      x: x - gap - card.width,
      y: clamp(y - card.height / 2 + offsetY, scene.height - card.height),
    },
    top: { x: x - card.width / 2, y: y - gap - card.height },
    bottom: { x: x - card.width / 2, y: y + gap },
  };
  const opposite = {
    right: "left",
    left: "right",
    top: "bottom",
    bottom: "top",
  } as const;
  const choices = [
    point.placement,
    opposite[point.placement],
    "right",
    "left",
    "top",
    "bottom",
  ] as const;
  const placement =
    choices.find((side) => {
      const candidate = candidates[side];
      return (
        candidate.x >= margin &&
        candidate.y >= margin &&
        candidate.x + card.width <= scene.width - margin &&
        candidate.y + card.height <= scene.height - margin
      );
    }) ?? point.placement;
  const position =
    scene.width < 768
      ? {
          x: scene.width - card.width - margin,
          y: scene.height - card.height - margin,
        }
      : candidates[placement];
  const left = clamp(position.x, scene.width - card.width);
  const top = clamp(position.y, scene.height - card.height);
  // O conector termina no ponto mais próximo da borda do card.
  const endX = Math.max(left, Math.min(x, left + card.width));
  const endY = Math.max(top, Math.min(y, top + card.height));
  return { left, top, x, y, endX, endY };
}
