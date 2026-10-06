"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteNavigation } from "@/components/site/site-navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

function HeaderNavigation({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overPhoto = pathname === "/" && !compact && !menuOpen;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setCompact(!entry.isIntersecting);
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);

    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-8 w-px"
      />
      <header
        className={`pointer-events-none sticky top-0 z-50 h-20 shrink-0 lg:h-24 ${pathname === "/" ? "-mb-20 lg:-mb-24" : ""}`}
      >
        <div
          className={`pointer-events-auto border-b transition-colors duration-200 motion-reduce:transition-none ${overPhoto ? "border-bage-ivory/20 bg-transparent" : "border-bage-charcoal bg-bage-black/98"}`}
        >
          <div
            className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-[height] duration-200 motion-reduce:transition-none lg:px-8 ${compact ? "h-16 lg:h-18" : "h-20 lg:h-24"}`}
          >
            <Link
              href="/"
              aria-label="Grêmio Esportivo Bagé — início"
              onClick={() => setMenuOpen(false)}
              className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde"
            >
              <Image
                src="/images/brand/ge-bage-escudo.png"
                alt=""
                width={1280}
                height={1537}
                sizes="48px"
                className={`w-auto shrink-0 transition-[height] duration-200 motion-reduce:transition-none ${compact ? "h-10" : "h-12 lg:h-14"}`}
              />
              <span className="font-display text-2xl font-bold tracking-wide">
                G.E. BAGÉ
              </span>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-foreground-secondary text-bage-ivory hover:border-bage-jalde focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde lg:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d={
                    menuOpen
                      ? "M6 6l12 12M6 18L18 6"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <nav
              id="site-navigation"
              aria-label="Navegação principal"
              className={`${menuOpen ? "block" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-bage-charcoal bg-bage-black px-6 py-4 lg:static lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0`}
            >
              <ul className="grid gap-1 lg:flex lg:items-center">
                {siteNavigation.map(({ href, label }) => {
                  const active =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(`${href}/`));

                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex min-h-11 items-center border-b-2 px-3 py-2 font-sans font-semibold hover:text-bage-jalde focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bage-jalde ${active ? "border-bage-jalde text-bage-jalde" : "border-transparent text-bage-ivory"}`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
