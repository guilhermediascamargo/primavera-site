"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import InterfaceArrow from "@/components/ui/interface-arrow";
import { clubMedia } from "../data/club-hotspots";
import type { ClubHotspot } from "../domain/club-hotspot";
import {
  placeClubCard,
  playClubEntrance,
  shouldRevealInterior,
} from "../domain/club-scene";
import styles from "./club-experience.module.css";

type Phase = "entry" | "entering" | "interior";
type CardPosition = ReturnType<typeof placeClubCard>;

export default function ClubExperience({
  hotspots,
}: {
  hotspots: readonly ClubHotspot[];
}) {
  const [phase, setPhase] = useState<Phase>("entry");
  const [interiorRequested, setInteriorRequested] = useState(false);
  const [interiorReady, setInteriorReady] = useState(false);
  const [interiorVisible, setInteriorVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<CardPosition | null>(null);
  const phaseRef = useRef<Phase>("entry");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const entryRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef(new Map<string, HTMLButtonElement>());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const moveFocusRef = useRef(false);
  const cardFocusPendingRef = useRef(false);
  const active = hotspots.find((item) => item.id === selectedId);
  const highlighted = previewId ?? selectedId;

  const clearWait = useCallback(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);
  const stopFrames = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);
  const finish = useCallback(() => {
    if (phaseRef.current !== "entering") return;
    moveFocusRef.current = document.activeElement === skipRef.current;
    phaseRef.current = "interior";
    clearWait();
    stopFrames();
    videoRef.current?.pause();
    setInteriorRequested(true);
    setInteriorVisible(true);
    setPhase("interior");
  }, [clearWait, stopFrames]);

  function waitForVideo() {
    if (phaseRef.current !== "entering") return;
    clearWait();
    timerRef.current = setTimeout(finish, 10000);
  }
  function prepare() {
    setInteriorRequested(true);
    const video = videoRef.current;
    if (
      video &&
      video.preload !== "auto" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      video.preload = "auto";
    }
  }
  function enter() {
    if (phaseRef.current !== "entry") return;
    prepare();
    moveFocusRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      phaseRef.current = "interior";
      setInteriorVisible(true);
      setPhase("interior");
      return;
    }
    phaseRef.current = "entering";
    setPhase("entering");
    waitForVideo();
    void playClubEntrance(videoRef.current, () => {
      if (phaseRef.current === "entering") finish();
    });
  }
  function returnToEntry() {
    phaseRef.current = "entry";
    clearWait();
    stopFrames();
    const video = videoRef.current;
    video?.pause();
    if (video && video.readyState > 0) video.currentTime = 0;
    setVideoReady(false);
    setInteriorVisible(false);
    setSelectedId(null);
    setPreviewId(null);
    setCardPosition(null);
    moveFocusRef.current = true;
    setPhase("entry");
  }
  const closeCard = useCallback(() => {
    cardFocusPendingRef.current = false;
    if (selectedId)
      buttonsRef.current.get(selectedId)?.focus({ preventScroll: true });
    setSelectedId(null);
    setCardPosition(null);
  }, [selectedId]);

  // Mede apenas a cena e o único card ativo; ResizeObserver acompanha reflow e conteúdo.
  useLayoutEffect(() => {
    if (!active || !sceneRef.current || !cardRef.current) return;
    const scene = sceneRef.current;
    const card = cardRef.current;
    const measure = () =>
      setCardPosition(
        placeClubCard(
          active,
          { width: scene.clientWidth, height: scene.clientHeight },
          { width: card.offsetWidth, height: card.offsetHeight },
        ),
      );
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    observer.observe(card);
    const frame = requestAnimationFrame(measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [active]);

  useEffect(() => {
    if (active && cardPosition && cardFocusPendingRef.current) {
      closeRef.current?.focus({ preventScroll: true });
      cardFocusPendingRef.current = false;
    }
  }, [active, cardPosition]);

  useEffect(() => {
    if (!active) return;
    const onOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (
        !cardRef.current?.contains(event.target) &&
        !event.target.closest("[data-club-hotspot]")
      ) {
        closeCard();
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCard();
      }
    };
    document.addEventListener("click", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("click", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [active, closeCard]);

  useEffect(() => {
    let focusFrame: number | undefined;
    if (moveFocusRef.current) {
      const target =
        phase === "entry"
          ? entryRef.current
          : phase === "entering"
            ? skipRef.current
            : pointsRef.current;
      if (target) {
        focusFrame = requestAnimationFrame(() => {
          if (phaseRef.current !== phase || !target.isConnected) return;
          target.focus({ preventScroll: true });
          moveFocusRef.current = false;
        });
      }
    }
    if (phase !== "entering")
      return () => {
        if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
      };
    const onHidden = () => {
      if (document.hidden) finish();
    };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => {
      if (preference.matches) finish();
    };
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("blur", finish);
    preference.addEventListener("change", onPreference);
    return () => {
      if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("blur", finish);
      preference.removeEventListener("change", onPreference);
    };
  }, [phase, finish, interiorReady]);

  useEffect(() => {
    if (phase !== "entering" || !videoReady) return;
    const tick = () => {
      const video = videoRef.current;
      if (!video || phaseRef.current !== "entering") return;
      if (
        shouldRevealInterior(video.currentTime, video.duration, interiorReady)
      )
        setInteriorVisible(true);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return stopFrames;
  }, [phase, videoReady, interiorReady, stopFrames]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      phaseRef.current = "entry";
      clearWait();
      stopFrames();
      video?.pause();
    };
  }, [clearWait, stopFrames]);

  return (
    <div className={styles.experience} data-phase={phase}>
      <div ref={sceneRef} className={styles.scene}>
        <Image
          src={clubMedia.entryPoster}
          alt="Porta de entrada do espaço do Grêmio Esportivo Bagé, no primeiro frame do vídeo."
          aria-hidden={phase !== "entry"}
          fill
          sizes="(max-width: 1600px) 100vw, 1600px"
          preload
          unoptimized
          className={styles.image}
        />
        <video
          ref={videoRef}
          src={clubMedia.entrance}
          poster={clubMedia.entryPoster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className={styles.video}
          data-visible={videoReady && phase !== "entry"}
          onPlaying={() => {
            if (phaseRef.current !== "entering") return;
            clearWait();
            setVideoReady(true);
          }}
          onWaiting={waitForVideo}
          onEnded={finish}
          onPause={finish}
          onError={() => {
            setVideoReady(false);
            finish();
          }}
          onAbort={() => {
            setVideoReady(false);
            finish();
          }}
        />
        {interiorRequested && (
          <Image
            src={clubMedia.interior}
            alt="Interior do espaço do Bagé com camisa no manequim, taças na vitrine e escudo na parede."
            aria-hidden={phase !== "interior"}
            fill
            sizes="(max-width: 1600px) 100vw, 1600px"
            loading="eager"
            unoptimized
            className={`${styles.image} ${styles.interior}`}
            data-visible={interiorVisible && interiorReady}
            onLoad={() => setInteriorReady(true)}
            onTransitionEnd={(event) => {
              if (event.propertyName === "opacity" && interiorVisible)
                setVideoReady(false);
            }}
          />
        )}
        {/* O vídeo permanece atrás da imagem durante o blend; não há frame preto intermediário. */}
        {phase !== "interior" && (
          <button
            ref={entryRef}
            type="button"
            className={`${styles.sceneAction} ${styles.entryAction}`}
            data-visible={phase === "entry"}
            aria-hidden={phase !== "entry"}
            inert={phase !== "entry"}
            tabIndex={phase === "entry" ? 0 : -1}
            onPointerEnter={prepare}
            onFocus={prepare}
            onClick={enter}
          >
            Entrar <InterfaceArrow direction="right" />
          </button>
        )}
        {phase === "entering" && (
          <button
            ref={skipRef}
            type="button"
            className={`${styles.sceneAction} ${styles.skipAction}`}
            onClick={finish}
          >
            Pular entrada <InterfaceArrow direction="right" />
          </button>
        )}
        {phase === "interior" && interiorReady && (
          <>
            {highlighted && (
              <div
                aria-hidden="true"
                className={styles.spotlight}
                style={{
                  left: `${hotspots.find((point) => point.id === highlighted)?.position.x}%`,
                  top: `${hotspots.find((point) => point.id === highlighted)?.position.y}%`,
                }}
              />
            )}
            <div
              className={styles.points}
              ref={pointsRef}
              tabIndex={-1}
              role="group"
              aria-label="Explore o espaço"
            >
              {hotspots.map((item) => (
                <button
                  key={item.id}
                  ref={(button) => {
                    if (button) buttonsRef.current.set(item.id, button);
                    else buttonsRef.current.delete(item.id);
                  }}
                  type="button"
                  className={styles.hotspot}
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                  }}
                  data-club-hotspot={item.id}
                  data-active={selectedId === item.id}
                  data-highlighted={highlighted === item.id}
                  data-receded={!!highlighted && highlighted !== item.id}
                  aria-label={`${item.title}${item.meta ? `, ${item.meta}` : ""}`}
                  aria-expanded={selectedId === item.id}
                  aria-controls={
                    selectedId === item.id ? "club-detail-card" : undefined
                  }
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setPreviewId(item.id);
                  }}
                  onPointerLeave={() => setPreviewId(null)}
                  onFocus={() => setPreviewId(item.id)}
                  onBlur={() => setPreviewId(null)}
                  onClick={() => {
                    if (selectedId === item.id) closeCard();
                    else {
                      cardFocusPendingRef.current = true;
                      setCardPosition(null);
                      setSelectedId(item.id);
                    }
                  }}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
            {active && (
              <>
                {cardPosition && (
                  <svg
                    className={styles.connector}
                    width="100%"
                    height="100%"
                    aria-hidden="true"
                  >
                    <path
                      d={`M ${cardPosition.x} ${cardPosition.y} L ${cardPosition.endX} ${cardPosition.endY}`}
                    />
                  </svg>
                )}
                <section
                  key={active.id}
                  ref={cardRef}
                  id="club-detail-card"
                  className={styles.card}
                  data-positioned={!!cardPosition}
                  style={{
                    left: cardPosition?.left ?? 8,
                    top: cardPosition?.top ?? 8,
                  }}
                  aria-labelledby="club-card-title"
                >
                  <div className={styles.cardTop}>
                    <span className={styles.index}>{active.index}</span>
                    <button
                      ref={closeRef}
                      type="button"
                      className={styles.close}
                      aria-label={`Fechar informações de ${active.title}`}
                      onClick={closeCard}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="m6 6 12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={styles.cardBody}
                    tabIndex={0}
                    aria-label={`Conteúdo: ${active.title}`}
                  >
                    <p className={styles.eyebrow}>{active.eyebrow}</p>
                    <h2 id="club-card-title">{active.title}</h2>
                    {active.meta && (
                      <p className={styles.meta}>{active.meta}</p>
                    )}
                    <p className={styles.description}>{active.description}</p>
                    {active.href && (
                      <Link href={active.href} className={styles.historyLink}>
                        {active.linkLabel} <InterfaceArrow direction="right" />
                      </Link>
                    )}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>
      {phase === "interior" && (
        <div className={styles.tools}>
          <p>Explore o espaço</p>
          <button type="button" className={styles.back} onClick={returnToEntry}>
            <InterfaceArrow direction="left" /> Voltar à entrada
          </button>
        </div>
      )}
    </div>
  );
}
