import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import Link from "next/link";
import {
  athleteGroups,
  type AthleteProfile,
} from "@/features/athletes/domain/athlete-profile";
import styles from "./athlete-card.module.css";

export default function AthleteCard({ athlete }: { athlete: AthleteProfile }) {
  return (
    <Link href={`/elenco/${athlete.slug}`} className={styles.card}>
      <span aria-hidden="true" className={styles.plane} />
      <Image
        src="/images/brand/ge-bage-escudo.png"
        alt=""
        width={1280}
        height={1537}
        sizes="36px"
        className={styles.crest}
      />
      {athlete.portraitImage && (
        <div className={styles.portraitFrame}>
          <Image
            src={athlete.portraitImage.src}
            alt={athlete.portraitImage.alt}
            fill
            sizes="(min-width: 1600px) 350px, (min-width: 1200px) 23vw, (min-width: 900px) 30vw, (min-width: 560px) 45vw, 90vw"
            className={styles.portrait}
            style={{
              objectPosition:
                athlete.portraitImage.objectPosition ?? "center bottom",
            }}
          />
        </div>
      )}
      {athlete.number !== undefined && (
        <span className={styles.number}>
          <span className="sr-only">Número documentado em 2026: </span>
          {athlete.number}
        </span>
      )}
      <div className={styles.identity}>
        <p className="mb-3 text-[0.65rem] font-medium tracking-[0.15em] text-foreground-secondary uppercase">
          {athleteGroups[athlete.group].position}
        </p>
        <h3 className={styles.name}>{athlete.name}</h3>
        <span aria-hidden="true" className={styles.arrow}>
          <InterfaceArrow direction="up-right" />
        </span>
      </div>
    </Link>
  );
}
