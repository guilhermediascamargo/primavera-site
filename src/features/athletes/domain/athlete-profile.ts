export const athleteGroups = {
  goalkeeper: { title: "Goleiros", position: "Goleiro" },
  defender: { title: "Defensores", position: "Defensor" },
  midfielder: { title: "Meio-campistas", position: "Meio-campista" },
  forward: { title: "Atacantes", position: "Atacante" },
} as const;

export type AthleteGroup = keyof typeof athleteGroups;

type AthleteImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type AthleteProfile = {
  slug: string;
  name: string;
  number?: number;
  group: AthleteGroup;
  birthDate?: string;
  birthplace?: string;
  joinedBage?: string;
  biography?: string;
  portraitImage?: AthleteImage;
  actionImage?: AthleteImage;
};
