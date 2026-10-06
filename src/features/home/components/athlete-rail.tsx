"use client";
import InterfaceArrow from "@/components/ui/interface-arrow";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import styles from "./home-hub.module.css";

export default function AthleteRail({
  children,
  loopChildren,
}: {
  children: ReactNode;
  loopChildren: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const drag = useRef<{
    id: number;
    x: number;
    scroll: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [paused, setPaused] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  function pause() {
    pausedRef.current = true;
    setPaused(true);
  }

  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 64rem) and (hover: hover) and (pointer: fine)",
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      setAutomatic(desktop.matches && !reduce.matches);
    }
    update();
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function updateEdges() {
      if (track)
        setEdges((previous) => {
          const start = track.scrollLeft <= 1;
          const end =
            track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
          return previous.start === start && previous.end === end
            ? previous
            : { start, end };
        });
    }
    updateEdges();
    const resize = new ResizeObserver(updateEdges);
    resize.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      resize.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, [automatic]);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!automatic || paused || !track || !set) return;
    let visible = false;
    let frame = 0;
    let previous = 0;
    let offset = track.scrollLeft;
    function advance(now: number) {
      if (visible && !document.hidden && !pausedRef.current) {
        const width = set?.offsetWidth ?? 0;
        if (width > 0 && track) {
          offset = (offset + Math.min(now - previous, 40) * 0.024) % width;
          track.scrollLeft = offset;
        }
      }
      previous = now;
      frame = requestAnimationFrame(advance);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.2 },
    );
    observer.observe(track);
    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [automatic, paused]);

  function move(direction: number) {
    pause();
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    pause();
    suppressClick.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      scroll: event.currentTarget.scrollLeft,
      moved: false,
    };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const distance = event.clientX - state.x;
    if (!state.moved && Math.abs(distance) < 6) return;
    state.moved = true;
    if (!event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.currentTarget.scrollLeft = state.scroll - distance;
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = drag.current?.moved ?? false;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className={styles.rail}>
      <div className={styles.railControls}>
        {automatic && (
          <button
            type="button"
            className={styles.playControl}
            onClick={() => {
              pausedRef.current = !paused;
              setPaused(!paused);
            }}
            aria-label={
              paused
                ? "Retomar movimento do elenco"
                : "Pausar movimento do elenco"
            }
          >
            {paused ? "Retomar" : "Pausar"}
          </button>
        )}
        <button
          type="button"
          aria-label="Atletas anteriores"
          aria-controls="home-athletes"
          disabled={edges.start}
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">
            <InterfaceArrow direction="left" />
          </span>
        </button>
        <button
          type="button"
          aria-label="Próximos atletas"
          aria-controls="home-athletes"
          disabled={edges.end}
          onClick={() => move(1)}
        >
          <span aria-hidden="true">
            <InterfaceArrow direction="right" />
          </span>
        </button>
      </div>
      <div
        id="home-athletes"
        ref={trackRef}
        className={styles.track}
        data-autoplay={automatic && !paused}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") pause();
        }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={pause}
        onFocusCapture={pause}
        onKeyDown={pause}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        <ul
          ref={setRef}
          className={styles.railSet}
          data-athlete-set="primary"
          aria-label="Elenco profissional"
        >
          {children}
        </ul>
        {automatic && (
          <ul
            className={styles.railSet}
            aria-hidden="true"
            data-athlete-set="loop"
          >
            {loopChildren}
          </ul>
        )}
      </div>
    </div>
  );
}
