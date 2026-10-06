"use client";
import InterfaceArrow from "@/components/ui/interface-arrow";

import { useEffect, useState } from "react";
import styles from "./history-story.module.css";

export default function HistoryProgress() {
  const [chapter, setChapter] = useState({
    year: "1906",
    label: "Antes do Bagé",
  });

  useEffect(() => {
    const story = document.getElementById("history-story");
    if (!story || !("IntersectionObserver" in window)) return;
    const scenes = story.querySelectorAll<HTMLElement>(
      "[data-history-scene], #arquivo",
    );
    // Discrete chapter changes only: no scroll listener or per-pixel React state.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const scene = entry.target as HTMLElement;
          scene.dataset.seen = "true";
          setChapter({
            year: scene.dataset.year ?? "",
            label:
              scene.id === "arquivo" ? "Arquivo" : (scene.dataset.label ?? ""),
          });
        }
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.progress} aria-label="Navegação da História">
      <a href="#antes">
        História <span aria-hidden="true">/</span>
      </a>
      <span className={styles.current} aria-hidden="true">
        {chapter.year && <b>{chapter.year}</b>} {chapter.label}
      </span>
      <a href="#arquivo">
        Consultar cronologia{" "}
        <span aria-hidden="true">
          <InterfaceArrow direction="up-right" />
        </span>
      </a>
    </nav>
  );
}
