"use client";
import InterfaceArrow from "@/components/ui/interface-arrow";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteNavigation } from "./site-navigation";
import styles from "./site-footer.module.css";

export default function FooterExperience() {
  const pathname = usePathname();
  function returnToTop() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document
      .querySelector<HTMLAnchorElement>('header a[href="/"]')
      ?.focus({ preventScroll: true });
  }
  return (
    <div className={styles.controls}>
      <nav aria-label="Navegação do rodapé">
        <ul className={styles.navigation}>
          {siteNavigation.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(`${href}/`))
                    ? "page"
                    : undefined
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        className={styles.top}
        onClick={returnToTop}
        aria-label="Voltar ao topo"
      >
        <span aria-hidden="true">
          <InterfaceArrow direction="up" />
        </span>{" "}
        Topo
      </button>
    </div>
  );
}
