import type { ClubHotspot } from "../domain/club-hotspot";

// Caminhos reais dos assets fornecidos, preservados sem renomear ou editar.
export const clubMedia = {
  entryPoster: "/images/club/entry-poster.webp",
  interior: "/images/club/interior.webp",
  entrance: "/images/videos/club/entrance.mp4",
} as const;

export const clubHotspots = [
  {
    id: "camisa",
    index: "01 / 05",
    kind: "shirt",
    eyebrow: "Identidade jalde-negra",
    title: "Camisa principal 2026",
    description:
      "A camisa principal da temporada leva o jalde e o preto, cores que acompanham a identidade do Grêmio Esportivo Bagé. No espaço do clube, o uniforme aparece como uma das expressões mais visíveis da tradição jalde-negra.",
    position: { x: 25.6, y: 48 },
    placement: "right",
    cardOffsetY: 25,
  },
  {
    id: "gaucho-1925",
    index: "02 / 05",
    kind: "trophy",
    eyebrow: "Conquistas",
    title: "1x Campeão Gaúcho",
    meta: "1925",
    description:
      "Conquista estadual de 1925, uma das maiores glórias da história do Grêmio Esportivo Bagé.",
    position: { x: 13.5, y: 37 },
    placement: "right",
    cardOffsetY: -20,
    href: "/historia",
    linkLabel: "Ver na História",
  },
  {
    id: "copa-governador-1974",
    index: "03 / 05",
    kind: "trophy",
    eyebrow: "Conquistas",
    title: "1x Campeão da Copa Governador do Estado",
    meta: "1974",
    description:
      "Título conquistado em 1974, marcando mais um momento importante da trajetória jalde-negra.",
    position: { x: 13.5, y: 56 },
    placement: "right",
    cardOffsetY: -35,
    href: "/historia",
    linkLabel: "Ver na História",
  },
  {
    id: "segunda-divisao",
    index: "04 / 05",
    kind: "trophy",
    eyebrow: "Conquistas",
    title: "3x Campeão Gaúcho da 2ª Divisão",
    meta: "1964 · 1982 · 1985",
    description:
      "Títulos conquistados em 1964, 1982 e 1985, reforçando a tradição competitiva do Bagé no futebol gaúcho.",
    position: { x: 13.5, y: 73 },
    placement: "right",
    cardOffsetY: 20,
    href: "/historia",
    linkLabel: "Ver na História",
  },
  {
    id: "escudo",
    index: "05 / 05",
    kind: "crest",
    eyebrow: "Desde 1920",
    title: "Símbolo Jalde-Negro",
    meta: "Grêmio Esportivo Bagé · Bagé/RS",
    description:
      "Fundado em 5 de agosto de 1920, o Grêmio Esportivo Bagé carrega no escudo as iniciais GEB e as cores que identificam o Jalde-Negro. Um símbolo de pertencimento, tradição e ligação com a cidade de Bagé.",
    position: { x: 49.2, y: 39 },
    placement: "bottom",
    href: "/historia",
    linkLabel: "Conhecer a História",
  },
] as const satisfies readonly ClubHotspot[];
