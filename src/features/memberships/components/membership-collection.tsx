"use client";
import InterfaceArrow from "@/components/ui/interface-arrow";

import Image from "next/image";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import {
  membershipFamilies,
  type MembershipPlan,
} from "../data/membership-plans";
import { membershipWhatsApp } from "../domain/membership-contact";
import styles from "./membership-page.module.css";

const mobileQuery = "(max-width: 47.99rem)";

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isMobileViewport() {
  return window.matchMedia(mobileQuery).matches;
}

function serverViewport() {
  return false;
}

export default function MembershipCollection({
  plans,
}: {
  plans: readonly MembershipPlan[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const selected = plans.find((plan) => plan.id === selectedId);
  const grids = useRef(new Map<MembershipPlan["family"], HTMLUListElement>());
  const [gridColumns, setGridColumns] = useState<
    Partial<Record<MembershipPlan["family"], number>>
  >({});
  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    isMobileViewport,
    serverViewport,
  );

  useEffect(() => {
    function measureColumns() {
      const columns: Partial<Record<MembershipPlan["family"], number>> = {};
      for (const [familyId, grid] of grids.current) {
        columns[familyId] = getComputedStyle(grid)
          .gridTemplateColumns.trim()
          .split(/\s+/).length;
      }
      setGridColumns((previous) =>
        membershipFamilies.every(
          (family) => previous[family.id] === columns[family.id],
        )
          ? previous
          : columns,
      );
    }
    const observer = new ResizeObserver(measureColumns);
    for (const grid of grids.current.values()) observer.observe(grid);
    measureColumns();
    return () => observer.disconnect();
  }, []);

  function select(plan: MembershipPlan) {
    setSelectedId(plan.id);
    setFlippedId(flippedId === plan.id ? null : plan.id);
  }

  function showDetails(event: MouseEvent<HTMLAnchorElement>, panelId: string) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    event.preventDefault();
    panel.focus({ preventScroll: true });
    panel.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function renderDetails(familyId: MembershipPlan["family"]) {
    return (
      <section
        id={`membership-details-${familyId}`}
        className={`${styles.details} ${styles.selectionTone}`}
        data-tone={selected?.tone}
        hidden={selected?.family !== familyId}
        aria-label="Detalhes da modalidade selecionada"
        tabIndex={-1}
      >
        {selected?.family === familyId && (
          <>
            <div className={styles.detailIdentity}>
              <p className={styles.eyebrow}>
                {
                  membershipFamilies.find((family) => family.id === familyId)
                    ?.title
                }{" "}
                / Selecionada
              </p>
              <h4>{selected.name}</h4>
              <p className={styles.detailPrice}>
                R$ <strong>{selected.monthlyPrice}</strong>
                <span>/mês</span>
              </p>
            </div>
            <div className={styles.detailBenefits}>
              <strong className={styles.demoTag}>
                Benefícios demonstrativos · não oficiais
              </strong>
              <ul>
                {selected.demoBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p>
                Confirme valores e condições diretamente com o clube. Esta
                página não realiza associação online.
              </p>
              <a
                href={membershipWhatsApp(selected.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryLink}
              >
                Consultar esta modalidade{" "}
                <span aria-hidden="true">
                  <InterfaceArrow direction="up-right" />
                </span>
                <span className="sr-only"> (abre WhatsApp em nova aba)</span>
              </a>
            </div>
          </>
        )}
      </section>
    );
  }

  return (
    <div className={styles.families}>
      {membershipFamilies.map((family, index) => (
        <section
          key={family.id}
          className={styles.family}
          data-focused={selected?.family === family.id}
          aria-labelledby={`family-${family.id}`}
        >
          <div className={styles.familyHeading}>
            <span aria-hidden="true">0{index + 1}</span>
            <h3 id={`family-${family.id}`}>{family.title}</h3>
          </div>
          <ul
            className={styles.cardGrid}
            ref={(grid) => {
              if (grid) grids.current.set(family.id, grid);
              else grids.current.delete(family.id);
            }}
          >
            {plans
              .filter((plan) => plan.family === family.id)
              .map((plan, planIndex, familyPlans) => {
                const flipped = flippedId === plan.id;
                const active = selectedId === plan.id;
                const selectedIndex = familyPlans.findIndex(
                  (item) => item.id === selectedId,
                );
                const columns = gridColumns[family.id] ?? 1;
                const selectedRowEnd = Math.min(
                  familyPlans.length - 1,
                  Math.floor(selectedIndex / columns) * columns + columns - 1,
                );
                return (
                  <Fragment key={plan.id}>
                    <li>
                      <button
                        type="button"
                        className={`${styles.card} ${styles.selectionTone}`}
                        data-tone={plan.tone}
                        data-flipped={flipped}
                        data-selected={active}
                        data-plan-id={plan.id}
                        aria-label={`${flipped ? "Voltar à frente de" : "Ver benefícios demonstrativos de"} ${plan.name}, R$ ${plan.monthlyPrice} por mês`}
                        aria-pressed={active}
                        aria-controls={
                          active ? `membership-details-${family.id}` : undefined
                        }
                        onClick={() => select(plan)}
                      >
                        <span className={styles.cardInner}>
                          <span
                            className={`${styles.face} ${styles.front}`}
                            aria-hidden={flipped}
                          >
                            <span className={styles.cardHeader}>
                              <Image
                                src="/images/brand/ge-bage-escudo.png"
                                alt=""
                                width={1280}
                                height={1537}
                                sizes="32px"
                                className={styles.cardCrest}
                              />
                              <span>GRÊMIO ESPORTIVO BAGÉ</span>
                              <span className={styles.cardYear}>2026</span>
                            </span>
                            <span className={styles.cardName}>
                              <small>Sócio</small>
                              {plan.name.replace(/^Sócio /, "")}
                            </span>
                            <span className={styles.cardBottom}>
                              <span className={styles.cardInstruction}>
                                Virar cartão{" "}
                                <span aria-hidden="true">
                                  <InterfaceArrow direction="clockwise" />
                                </span>
                                <small>MODELO · SEM VALIDADE</small>
                              </span>
                              <span className={styles.price}>
                                <small>R$</small>
                                {plan.monthlyPrice}
                                <small>/mês</small>
                              </span>
                            </span>
                          </span>
                          <span
                            className={`${styles.face} ${styles.back}`}
                            aria-hidden={!flipped}
                          >
                            <span className={styles.demoTag}>
                              Demonstrativo
                            </span>
                            <span className={styles.backTitle}>
                              {plan.name}
                            </span>
                            <span className={styles.backBenefits}>
                              {plan.demoBenefits.slice(0, 2).map((benefit) => (
                                <span key={benefit}>· {benefit}</span>
                              ))}
                            </span>
                            <span className={styles.backFoot}>
                              Detalhes abaixo{" "}
                              <span aria-hidden="true">
                                <InterfaceArrow direction="down" />
                              </span>{" "}
                              · Toque para voltar
                            </span>
                          </span>
                        </span>
                      </button>
                      {active && (
                        <a
                          href={`#membership-details-${family.id}`}
                          className={styles.detailsLink}
                          aria-label={`Ver detalhes de ${plan.name}`}
                          onClick={(event) =>
                            showDetails(
                              event,
                              `membership-details-${family.id}`,
                            )
                          }
                        >
                          Ver detalhes{" "}
                          <span aria-hidden="true">
                            <InterfaceArrow direction="down" />
                          </span>
                        </a>
                      )}
                      {isMobile && active && renderDetails(family.id)}
                    </li>
                    {!isMobile &&
                      selected?.family === family.id &&
                      planIndex === selectedRowEnd && (
                        <li className={styles.detailsRow}>
                          {renderDetails(family.id)}
                        </li>
                      )}
                  </Fragment>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
