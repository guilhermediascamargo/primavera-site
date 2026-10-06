import Image from "next/image";
import { competitionBrands } from "../data/competition-brands";
import styles from "./competition-identity.module.css";

export default function CompetitionIdentity({
  name,
}: {
  name: keyof typeof competitionBrands;
}) {
  return (
    <span className={styles.identity} data-competition={name}>
      <Image
        src={competitionBrands[name]}
        alt=""
        width={48}
        height={52}
        sizes="48px"
        className={styles.logo}
      />
      <span>{name}</span>
    </span>
  );
}
