export type ClubHotspot = {
  readonly id: string;
  readonly index: string;
  readonly kind: "shirt" | "trophy" | "crest";
  readonly eyebrow: string;
  readonly title: string;
  readonly meta?: string;
  readonly description: string;
  readonly position: { readonly x: number; readonly y: number };
  readonly placement: "left" | "right" | "top" | "bottom";
  readonly cardOffsetY?: number;
  readonly href?: "/historia";
  readonly linkLabel?: string;
};
