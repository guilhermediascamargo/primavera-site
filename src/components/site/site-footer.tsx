import Image from "next/image";
import Link from "next/link";
import FooterExperience from "./footer-experience";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.identity}>
        <Image
          src="/images/brand/ge-bage-escudo.png"
          alt=""
          width={1280}
          height={1537}
          sizes="72px"
          className={styles.crest}
        />
        <span>Grêmio Esportivo Bagé</span>
      </Link>
      <FooterExperience />
      <div className={styles.legal}>
        <p>© 2026 Grêmio Esportivo Bagé.</p>
        <p>Protótipo não oficial.</p>
      </div>
    </footer>
  );
}
