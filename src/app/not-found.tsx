import InterfaceArrow from "@/components/ui/interface-arrow";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-5 py-16 sm:px-12">
      <p
        aria-hidden="true"
        className="font-sport text-[clamp(6rem,20vw,12rem)] leading-none font-semibold text-bage-jalde"
      >
        404
      </p>
      <h1 className="mt-6 text-3xl tracking-tight sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-foreground-secondary">
        O endereço solicitado não existe neste site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 w-fit items-center gap-6 border-b border-bage-jalde py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bage-jalde"
      >
        Voltar ao início{" "}
        <span aria-hidden="true">
          <InterfaceArrow direction="right" />
        </span>
      </Link>
    </main>
  );
}
