import InterfaceArrow from "@/components/ui/interface-arrow";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HistoryArchive from "./history-archive";
import HistoryProgress from "./history-progress";
import styles from "./history-story.module.css";

function Scene({
  id,
  year,
  label,
  className = "",
  children,
}: {
  id: string;
  year: string;
  label: string;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-history-scene
      data-year={year}
      data-label={label}
      aria-labelledby={`${id}-title`}
      className={`${styles.scene} ${className}`}
    >
      {children}
    </section>
  );
}

function FieldLine() {
  return (
    <svg
      className={styles.fieldLine}
      viewBox="0 0 600 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 180H60V30H540V330H60V180H300V30M300 180V330M60 100H150V260H60M540 100H450V260H540" />
      <circle cx="300" cy="180" r="55" />
    </svg>
  );
}

export default function HistoryStory() {
  return (
    <main id="history-story" className={styles.story}>
      <HistoryProgress />
      <Scene
        id="antes"
        year="1906"
        label="Antes do Bagé"
        className={styles.opening}
      >
        <div className={styles.openingTop}>
          <h1>História</h1>
          <p>
            Grêmio Esportivo Bagé
            <br />
            Uma história para percorrer.
          </p>
        </div>
        <p className={styles.openingYear} aria-hidden="true">
          1906
        </p>
        <div className={styles.openingCopy}>
          <p className={styles.eyebrow}>01 / Setembro de 1906</p>
          <h2 id="antes-title">
            O Bagé ainda
            <br />
            não existia.
          </h2>
          <p className={styles.prose}>
            Antes do jalde-negro, Bagé já aprendia a viver o futebol.
          </p>
          <p className={styles.smallProse}>
            Em 7 de setembro, há registro de uma exibição ligada ao Sport Club
            Rio Grande. Ainda naquele mês surge o antigo Sport Club Bagé — um
            clube distinto daquele que nasceria em 1920.
          </p>
          <a className={styles.textLink} href="#origens">
            Percorra as origens{" "}
            <span aria-hidden="true">
              <InterfaceArrow direction="down" />
            </span>
          </a>
        </div>
        <span className={styles.edgeNote} aria-hidden="true">
          O tempo começa antes do nome.
        </span>
      </Scene>

      <Scene
        id="origens"
        year="1910 / 1913"
        label="Duas origens"
        className={styles.origins}
      >
        <p className={styles.eyebrow}>02 / Duas origens</p>
        <h2 id="origens-title" className={styles.heading}>
          Antes de uma camisa,
          <br />
          duas histórias.
        </h2>
        <div className={styles.originGrid}>
          <div className={styles.rioBranco}>
            <p className={styles.originYear}>1910</p>
            <h3>
              Rio
              <br />
              Branco
            </h3>
            <p>
              Já em atividade em 1910. O amarelo está associado à sua
              identidade, que também tem registros históricos de verde.
            </p>
            <span className={styles.originRule} aria-hidden="true" />
          </div>
          <div className={styles.julho}>
            <p className={styles.originYear}>1913</p>
            <h3>
              14 de
              <br />
              Julho
            </h3>
            <p>
              Fundado em <time dateTime="1913-06-15">15 de junho de 1913</time>.
              O preto acompanha esta outra origem do jalde-negro.
            </p>
            <span className={styles.originRule} aria-hidden="true" />
          </div>
        </div>
        <p className={styles.convergeNote}>Duas trajetórias. Um encontro.</p>
      </Scene>

      <Scene
        id="fundacao"
        year="1920"
        label="Nasce o G.E. Bagé"
        className={styles.foundation}
      >
        <p className={styles.eyebrow}>03 / O encontro</p>
        <p className={styles.fusion}>
          Rio Branco <span aria-hidden="true">+</span> 14 de Julho
        </p>
        <time className={styles.foundationDate} dateTime="1920-08-05">
          05.08.
          <br />
          <span>1920</span>
        </time>
        <div className={styles.foundationCopy}>
          <h2 id="fundacao-title">
            Nascia o Grêmio
            <br />
            Esportivo Bagé.
          </h2>
          <p>
            O amarelo e o preto, agora juntos.
            <br />
            Uma identidade: jalde-negra.
          </p>
        </div>
        <div className={styles.fusionBands} aria-hidden="true">
          <span />
          <span />
        </div>
      </Scene>

      <Scene
        id="casa"
        year="1920–1922"
        label="Procurando uma casa"
        className={styles.homeSearch}
      >
        <div className={styles.stickyCopy}>
          <p className={styles.eyebrow}>04 / Um lugar para pertencer</p>
          <h2 id="casa-title" className={styles.heading}>
            Procurando
            <br />
            uma casa.
          </h2>
          <FieldLine />
          <p className={styles.smallProse}>
            O caminho encontra um campo.
            <br />O campo começa a virar casa.
          </p>
        </div>
        <div className={styles.homeSteps}>
          <article>
            <p className={styles.stepYear}>1920</p>
            <h3>Os primeiros passos.</h3>
            <p>
              Primeiros campos, primeiros jogos. Em{" "}
              <time dateTime="1920-09-05">5 de setembro</time>, o primeiro jogo
              oficial apontado pela pesquisa termina em 1 a 1 contra uma equipe
              de São Gabriel.
            </p>
          </article>
          <article>
            <p className={styles.stepYear}>1921</p>
            <h3>Uma cidade. Dois lados.</h3>
            <p>
              <time dateTime="1921-07-31">31 de julho</time>. O primeiro Ba-Gua
              documentado: Bagé 2 a 2 Guarany. O clássico já acontece no local
              associado ao atual Pedra Moura.
            </p>
            <p className={styles.annotation}>
              A rivalidade entra nesta história para ficar.
            </p>
          </article>
          <article>
            <p className={styles.stepYear}>1922</p>
            <h3>A casa ganha raízes.</h3>
            <p>
              Menino Deus/Pedra Moura se consolida como casa do Bagé. Vem também
              o primeiro título citadino.
            </p>
          </article>
        </div>
      </Scene>

      <Scene
        id="imortais"
        year="1925"
        label="Os Imortais de 25"
        className={styles.immortals}
      >
        <div className={styles.immortalsAnchor}>
          <p className={styles.eyebrow}>05 / Os Imortais de 25</p>
          <p className={styles.immortalsYear}>1925</p>
          <h2 id="imortais-title">
            Campeão
            <br />
            gaúcho.
          </h2>
        </div>
        <div className={styles.immortalsBeats}>
          <div className={styles.beat}>
            <p className={styles.eyebrow}>Uma campanha inteira.</p>
            <p className={styles.invincible}>Invicto.</p>
          </div>
          <div className={styles.beat}>
            <p className={styles.eyebrow}>
              <time dateTime="1925-11-22">22 de novembro de 1925</time>
            </p>
            <p
              className={styles.score}
              role="img"
              aria-label="Bagé 2, Grêmio Porto-Alegrense 1"
            >
              <span>2</span>
              <i aria-hidden="true">—</i>
              <span>1</span>
            </p>
            <p className={styles.matchNames}>Bagé / Grêmio Porto-Alegrense</p>
            <p className={styles.smallProse}>
              Estádio da Baixada, Porto Alegre.
              <br />
              Na decisão, 2 a 1 para o Bagé.
            </p>
          </div>
          <div className={styles.beat}>
            <p className={styles.immortalName}>
              Os Imortais
              <br />
              de 25.
            </p>
            <p className={styles.smallProse}>
              O nome que ficou na memória jalde-negra.
            </p>
          </div>
        </div>
      </Scene>

      <Scene
        id="continuidade"
        year="1927–1957"
        label="Não foi um acaso"
        className={styles.continuity}
      >
        <p className={styles.eyebrow}>06 / Presença</p>
        <h2 id="continuidade-title" className={styles.heading}>
          Não foi
          <br />
          um acaso.
        </h2>
        <p className={styles.prose}>O Bagé voltou a decidir o estadual.</p>
        <ul
          className={styles.yearRun}
          aria-label="Anos em que o Bagé voltou à decisão estadual"
        >
          <li>1927</li>
          <li>1928</li>
          <li>1940</li>
          <li>1944</li>
          <li>1957</li>
        </ul>
        <div className={styles.landNote}>
          <span>Pedra Moura / Década de 1930</span>
          <p>
            A casa passa a ser definitivamente do clube com a aquisição do
            terreno. Os registros divergem entre 1934 e 1937.
          </p>
        </div>
      </Scene>

      <Scene
        id="bagua"
        year="1940"
        label="O clássico em sete"
        className={styles.derby}
      >
        <div className={styles.derbyTop}>
          <p className={styles.eyebrow}>1940 / Ba-Gua</p>
          <h2 id="bagua-title">
            O clássico
            <br />
            em sete.
          </h2>
        </div>
        <p
          className={`${styles.score} ${styles.derbyScore}`}
          role="img"
          aria-label="Bagé 7, Guarany 0"
        >
          <span>7</span>
          <i aria-hidden="true">—</i>
          <span>0</span>
        </p>
        <div className={styles.derbyBottom}>
          <p>Bagé × Guarany</p>
          <p>
            O maior triunfo jalde-negro
            <br />
            documentado no Ba-Gua.
          </p>
        </div>
      </Scene>

      <Scene
        id="pele"
        year="1957"
        label="Pelé no Pedra Moura"
        className={styles.newspaper}
      >
        <div className={styles.paperMasthead}>
          <p>Memória do Pedra Moura</p>
          <time dateTime="1957-03-24">24.03.1957</time>
        </div>
        <p className={styles.eyebrow}>O mundo passa pela nossa casa.</p>
        <h2 id="pele-title">
          Pelé.
          <br />
          16 anos.
          <br />
          Pedra Moura.
        </h2>
        <div className={styles.paperColumns}>
          <p className={styles.paperLead}>
            Naquele domingo, a cidade jogou do mesmo lado.
          </p>
          <div>
            <p>
              O Santos esteve em Bagé para enfrentar um combinado formado por
              jogadores de Bagé e Guarany. O encontro terminou em 1 a 1.
            </p>
            <p>
              Pelé marcou. A pesquisa histórica registra esse gol como seu
              primeiro no Rio Grande do Sul.
            </p>
          </div>
          <div className={styles.paperResult}>
            <b>1 — 1</b>
            <p>
              Combinado de
              <br />
              Bagé e Guarany
              <br />
              <span>×</span>
              <br />
              Santos
            </p>
          </div>
        </div>
        <p className={styles.paperFoot}>
          Composição editorial contemporânea / sem reprodução de jornal
          histórico.
        </p>
      </Scene>

      <Scene
        id="resistir"
        year="1964–1985"
        label="Subir. Voltar. Resistir."
        className={styles.resilience}
      >
        <div className={styles.stickyCopy}>
          <p className={styles.eyebrow}>07 / A camisa permanece</p>
          <h2 id="resistir-title" className={styles.heading}>
            Subir.
            <br />
            Voltar.
            <br />
            <span>Resistir.</span>
          </h2>
        </div>
        <ol className={styles.terraces}>
          <li>
            <span>1964</span>
            <div>
              <h3>Segunda Divisão Gaúcha</h3>
              <p>Campeão.</p>
            </div>
          </li>
          <li>
            <span>1974</span>
            <div>
              <h3>Copa Governador do Estado</h3>
              <p>Campeão. O Ba-Gua decisivo fez parte da fase por pontos.</p>
            </div>
          </li>
          <li>
            <span>1977</span>
            <div>
              <h3>Copa Cícero Soares</h3>
              <p>Campeão.</p>
            </div>
          </li>
          <li>
            <span>1982</span>
            <div>
              <h3>Segunda Divisão</h3>
              <p>Campeão.</p>
            </div>
          </li>
          <li>
            <span>1985</span>
            <div>
              <h3>Segunda Divisão</h3>
              <p>Campeão, novamente.</p>
            </div>
          </li>
        </ol>
      </Scene>

      <Scene
        id="luzes"
        year="1977"
        label="O Pedra Moura acende"
        className={styles.lights}
      >
        <div className={styles.lightsHeading}>
          <p className={styles.eyebrow}>Pedra Moura / 1977</p>
          <h2 id="luzes-title" className={styles.heading}>
            A casa
            <br />
            acende.
          </h2>
          <p>
            A iluminação do estádio abre
            <br />
            um novo capítulo no Pedra Moura.
          </p>
        </div>
        <figure className={styles.stadiumFigure}>
          <div className={styles.stadiumFrame}>
            <Image
              src="/images/stadiums/pedra-moura.jpg"
              alt="Bandeira jalde-negra, arquibancadas e torre de iluminação do Estádio Pedra Moura"
              width={1280}
              height={719}
              sizes="(max-width: 767px) 100vw, 90vw"
              className={styles.stadiumImage}
            />
          </div>
          <figcaption>
            Pedra Moura / fotografia atual do acervo do site. A imagem não
            registra a iluminação de 1977.
          </figcaption>
        </figure>
      </Scene>

      <Scene
        id="centenario"
        year="2020"
        label="Cem anos"
        className={styles.centennial}
      >
        <p className={styles.eyebrow}>08 / 1920 → 2020</p>
        <p className={styles.hundred} aria-hidden="true">
          100<span>anos</span>
        </p>
        <div className={styles.centennialCopy}>
          <h2 id="centenario-title">
            Um século.
            <br />A mesma paixão.
          </h2>
          <p>
            Em 2020, o Grêmio Esportivo Bagé chega aos cem anos. O passado se
            torna memória. A memória segue presente.
          </p>
        </div>
      </Scene>

      <Scene
        id="presente"
        year="Hoje"
        label="A história continua"
        className={styles.present}
      >
        <p className={styles.eyebrow}>O próximo capítulo</p>
        <h2 id="presente-title">
          Mais de um século depois,
          <br />a história continua
          <br />
          <span>entrando em campo.</span>
        </h2>
        <div className={styles.presentBottom}>
          <p>
            A memória é nossa.
            <br />O que vem pela frente, também.
          </p>
          <nav aria-label="Continue pelo Bagé">
            <Link className={styles.textLink} href="/clube">
              Clube{" "}
              <span aria-hidden="true">
                <InterfaceArrow direction="up-right" />
              </span>
            </Link>
            <Link className={styles.textLink} href="/elenco">
              Elenco{" "}
              <span aria-hidden="true">
                <InterfaceArrow direction="up-right" />
              </span>
            </Link>
            <Link className={styles.textLink} href="/noticias">
              Notícias{" "}
              <span aria-hidden="true">
                <InterfaceArrow direction="up-right" />
              </span>
            </Link>
          </nav>
        </div>
      </Scene>
      <HistoryArchive />
    </main>
  );
}
