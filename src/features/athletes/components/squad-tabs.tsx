"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const areas = [
  { id: "professional", label: "Profissional" },
  { id: "youth", label: "Base" },
  { id: "leadership", label: "Diretoria" },
] as const;
type Area = (typeof areas)[number]["id"];

// Os painéis são compostos no servidor; só a seleção pertence ao cliente.
export default function SquadTabs({
  professional,
  youth,
  leadership,
}: Record<Area, ReactNode>) {
  const [active, setActive] = useState<Area>("professional");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = { professional, youth, leadership };

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target: number;
    switch (event.key) {
      case "ArrowRight":
        target = (index + 1) % areas.length;
        break;
      case "ArrowLeft":
        target = (index + areas.length - 1) % areas.length;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = areas.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const area = areas[target];
    if (area) {
      setActive(area.id);
      buttons.current[target]?.focus();
    }
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Áreas do futebol"
        className="mb-10 flex border-b border-bage-ivory/20 sm:mb-16"
      >
        {areas.map((area, index) => (
          <button
            key={area.id}
            type="button"
            role="tab"
            id={`tab-${area.id}`}
            aria-controls={`panel-${area.id}`}
            aria-selected={active === area.id}
            tabIndex={active === area.id ? 0 : -1}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            onClick={() => setActive(area.id)}
            onKeyDown={(event) => handleKey(event, index)}
            className={`relative min-h-14 min-w-0 px-2 py-4 text-[0.7rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-150 motion-reduce:transition-none sm:px-6 sm:text-sm sm:tracking-widest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde ${active === area.id ? "text-bage-ivory after:absolute after:inset-x-2 after:bottom-[-1px] after:h-[3px] after:bg-bage-jalde sm:after:inset-x-6" : "text-foreground-secondary hover:text-bage-ivory"}`}
          >
            {area.label}
          </button>
        ))}
      </div>
      {areas.map((area) => (
        <div
          key={area.id}
          id={`panel-${area.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${area.id}`}
          hidden={active !== area.id}
          tabIndex={0}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde"
        >
          {panels[area.id]}
        </div>
      ))}
    </>
  );
}
