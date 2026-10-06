import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import Link from "next/link";
import {
  athleteGroups,
  type AthleteProfile as Profile,
} from "@/features/athletes/domain/athlete-profile";
import styles from "./athlete-profile.module.css";

export default function AthleteProfile({ athlete }: { athlete: Profile }) {
  const facts = [
    { label: "Nascimento", value: athlete.birthDate },
    { label: "Naturalidade", value: athlete.birthplace },
    { label: "No Bagé desde", value: athlete.joinedBage },
  ].filter((fact) => fact.value);

  return (
    <main>
      <section
        className={`${styles.hero} ${athlete.portraitImage ? "" : styles.withoutPortrait}`}
        aria-labelledby="athlete-name"
      >
        <div className={styles.context}>
          <Link
            href="/elenco"
            className="inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-widest uppercase hover:text-bage-jalde focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde"
          >
            <span aria-hidden="true">
              <InterfaceArrow direction="left" />
            </span>{" "}
            Elenco
          </Link>
        </div>
        {!athlete.portraitImage && (
          <span aria-hidden="true" className={styles.graphic} />
        )}
        {athlete.number !== undefined && (
          <span aria-hidden="true" className={styles.number}>
            {athlete.number}
          </span>
        )}
        <div className={styles.portrait}>
          {athlete.portraitImage && (
            <Image
              src={athlete.portraitImage.src}
              alt={athlete.portraitImage.alt}
              fill
              sizes="(min-width: 1024px) 65vw, 100vw"
              preload
              className="object-contain"
              style={{
                objectPosition:
                  athlete.portraitImage.objectPosition ?? "center bottom",
              }}
            />
          )}
        </div>
        <Image
          src="/images/brand/ge-bage-escudo.png"
          alt=""
          width={1280}
          height={1537}
          sizes="(min-width: 1024px) 72px, 48px"
          className={styles.crest}
        />
        <div className={styles.identity}>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase">
            <span aria-hidden="true" className="h-px w-9 bg-bage-jalde" />
            Grêmio Esportivo Bagé
          </p>
          <h1 id="athlete-name" className={styles.name}>
            {athlete.name}
          </h1>
          <p className="mt-5 text-sm font-semibold tracking-[0.2em] uppercase sm:text-base">
            {athleteGroups[athlete.group].position}
            {athlete.number !== undefined && (
              <span className="sr-only">
                , número documentado em 2026: {athlete.number}
              </span>
            )}
          </p>
        </div>
      </section>
      {(facts.length > 0 || athlete.biography || athlete.actionImage) && (
        <div className="bg-bage-ivory text-bage-black">
          {facts.length > 0 && (
            <dl className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-10 px-5 py-10 sm:grid-cols-2 sm:px-12 lg:grid-cols-4 lg:px-[5vw] lg:py-14">
              {facts.map(({ label, value }) => (
                <div key={label} className="border-b border-bage-black/20 py-5">
                  <dt className="text-xs font-semibold tracking-widest uppercase">
                    {label}
                  </dt>
                  <dd className="mt-3 text-xl font-semibold wrap-anywhere">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {(athlete.biography || athlete.actionImage) && (
            <section
              aria-label={`Sobre ${athlete.name}`}
              className={`mx-auto grid max-w-[1600px] gap-10 px-5 pt-6 pb-20 sm:px-12 lg:gap-20 lg:px-[5vw] lg:pt-12 lg:pb-28 ${athlete.actionImage ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_1.4fr]"}`}
            >
              <h2 className="max-w-[12ch] text-4xl leading-tight font-bold tracking-[-0.04em] sm:text-5xl">
                Sobre {athlete.name}
                <span className="text-bage-black" aria-hidden="true">
                  .
                </span>
              </h2>
              {athlete.biography && (
                <p className="max-w-2xl text-lg leading-relaxed text-bage-charcoal sm:text-xl">
                  {athlete.biography}
                </p>
              )}
              {athlete.actionImage && (
                <div className="relative aspect-[3/2] lg:col-span-2">
                  <Image
                    src={athlete.actionImage.src}
                    alt={athlete.actionImage.alt}
                    fill
                    sizes="(min-width: 1600px) 1440px, 90vw"
                    className="object-cover"
                    style={{
                      objectPosition:
                        athlete.actionImage.objectPosition ?? "center",
                    }}
                  />
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </main>
  );
}
