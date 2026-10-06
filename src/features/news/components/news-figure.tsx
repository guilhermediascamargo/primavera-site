import Image from "next/image";
import type { NewsImage } from "../domain/news-article";
import styles from "./news.module.css";

export default function NewsFigure({
  image,
  cover = false,
}: {
  image: NewsImage;
  cover?: boolean;
}) {
  return (
    <figure className={cover ? styles.coverFigure : styles.bodyFigure}>
      <div className={styles.figureImage}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            cover
              ? "(max-width: 1536px) 90vw, 1380px"
              : "(max-width: 1066px) 90vw, 960px"
          }
          preload={cover}
        />
      </div>
      {(image.credit || image.provisional) && (
        <figcaption className={styles.caption}>
          {image.provisional && (
            <span>
              Imagem de referência, sem identificação de partida ou data.
            </span>
          )}
          {image.credit && <span>Foto: {image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
