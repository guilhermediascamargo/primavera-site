import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AthleteProfile from "@/features/athletes/components/athlete-profile";
import {
  getAthleteBySlug,
  professionalAthletes,
} from "@/features/athletes/data/professional-athletes";
import { athleteGroups } from "@/features/athletes/domain/athlete-profile";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return professionalAthletes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthleteBySlug(slug);
  if (!athlete) notFound();
  return {
    title: `${athlete.name} | Grêmio Esportivo Bagé`,
    description: `${athlete.name}, ${athleteGroups[athlete.group].position.toLowerCase()} do elenco profissional do Grêmio Esportivo Bagé.`,
  };
}

export default async function AthletePage({ params }: Props) {
  const { slug } = await params;
  const athlete = getAthleteBySlug(slug);
  if (!athlete) notFound();
  return <AthleteProfile athlete={athlete} />;
}
