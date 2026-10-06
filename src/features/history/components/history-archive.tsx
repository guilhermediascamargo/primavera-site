import { historyChronology } from "../data/chronology";
import styles from "./history-story.module.css";

export default function HistoryArchive() {
  return (
    <section
      id="arquivo"
      className={styles.archive}
      aria-labelledby="archive-title"
    >
      <p className={styles.eyebrow}>Para voltar a uma data</p>
      <h2 id="archive-title">Arquivo jalde-negro.</h2>
      <details>
        <summary>
          Consultar a cronologia <span aria-hidden="true">+</span>
        </summary>
        <dl>
          {historyChronology.map(({ date, text }) => (
            <div key={date}>
              <dt>{date}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </details>
      <p className={styles.archiveNote}>
        Esta narrativa acompanha a pesquisa histórica fornecida para o projeto.
        Primeiro presidente, relação completa de fundadores e data jurídica
        exata da aquisição do Pedra Moura permanecem em aberto. A memória também
        exige cuidado.
      </p>
    </section>
  );
}
