"use client";

import { useEffect, useState } from "react";
import { getCountdown, type Countdown } from "../domain/countdown";
import styles from "./match-countdown.module.css";

export default function MatchCountdown({
  kickoffAt,
}: {
  kickoffAt: string | undefined;
}) {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  useEffect(() => {
    function update() {
      setCountdown(getCountdown(kickoffAt, Date.now()));
    }
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [kickoffAt]);
  return (
    <div
      className={styles.countdown}
      aria-label="Contagem regressiva para o próximo jogo"
      aria-live="off"
    >
      {countdown?.status === "upcoming" ? (
        <>
          <p className={styles.label}>Faltam</p>
          <dl className={styles.units}>
            {(countdown.days > 0
              ? [
                  ["Dias", countdown.days],
                  ["Horas", countdown.hours],
                  ["Min", countdown.minutes],
                  ["Seg", countdown.seconds],
                ]
              : [
                  ["Horas", countdown.hours],
                  ["Min", countdown.minutes],
                  ["Seg", countdown.seconds],
                ]
            ).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{String(value).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <p className={styles.neutral}>
          {countdown?.status === "elapsed"
            ? "Horário previsto alcançado."
            : countdown?.status === "unconfirmed"
              ? "Data e horário a confirmar."
              : "Contagem até o horário previsto."}
        </p>
      )}
    </div>
  );
}
