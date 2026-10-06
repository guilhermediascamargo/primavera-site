import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import { membershipPlans } from "../data/membership-plans";
import { membershipWhatsApp } from "../domain/membership-contact";
import MembershipCollection from "./membership-collection";
import styles from "./membership-page.module.css";

export default function MembershipPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Grêmio Esportivo Bagé / Sócios</p>
          <h1>
            Seja sócio
            <br />
            do <span>Bagé.</span>
          </h1>
          <p className={styles.intro}>
            Conheça as modalidades e fale diretamente com o clube para
            informações e adesão.
          </p>
          <div className={styles.heroActions}>
            <a href="#modalidades" className={styles.primaryLink}>
              Ver modalidades{" "}
              <span aria-hidden="true">
                <InterfaceArrow direction="down" />
              </span>
            </a>
            <a
              href={membershipWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Falar com o clube{" "}
              <span aria-hidden="true">
                <InterfaceArrow direction="up-right" />
              </span>
              <span className="sr-only"> (abre WhatsApp em nova aba)</span>
            </a>
          </div>
        </div>
        <div className={styles.heroCredential} aria-hidden="true">
          <Image
            src="/images/brand/ge-bage-escudo.png"
            alt=""
            width={1280}
            height={1537}
            sizes="100px"
            className={styles.heroCrest}
          />
          <span className={styles.heroClub}>GRÊMIO ESPORTIVO BAGÉ</span>
          <span className={styles.heroMember}>Sócio</span>
          <span className={styles.heroYear}>2026</span>
          <span className={styles.heroPrototype}>
            MODELO DE CARTEIRINHA / PROTÓTIPO
          </span>
        </div>
      </header>

      <section
        id="modalidades"
        className={styles.collection}
        aria-labelledby="memberships-title"
      >
        <div className={styles.collectionHeading}>
          <h2 id="memberships-title">Modalidades</h2>
          <span>15 opções</span>
        </div>
        <aside
          className={styles.notice}
          aria-label="Aviso sobre benefícios demonstrativos"
        >
          <strong>Benefícios demonstrativos</strong>
          <p>
            Os benefícios desta versão são ilustrativos e serão substituídos
            pelas condições oficiais do clube. Este site não realiza associação
            online. A adesão acontece diretamente com o clube.
          </p>
        </aside>
        <MembershipCollection plans={membershipPlans} />
      </section>

      <section
        className={styles.contact}
        aria-labelledby="membership-contact-title"
      >
        <div>
          <h2 id="membership-contact-title">Ainda tem dúvidas?</h2>
          <p>Fale com o clube pelo WhatsApp: (53) 99956-1400.</p>
        </div>
        <a
          href={membershipWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryLink}
        >
          Falar com o clube{" "}
          <span aria-hidden="true">
            <InterfaceArrow direction="up-right" />
          </span>
          <span className="sr-only"> (abre WhatsApp em nova aba)</span>
        </a>
      </section>
    </main>
  );
}
