"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { contato, galeria, type Imagem } from "@/data/site";
import FadeIn from "./FadeIn";
import { ArrowIcon, ChevronIcon, CloseIcon, ExpandIcon } from "./Icons";
import Titulo from "./Titulo";
import useInclinacao from "./useInclinacao";

const LIMITE_ARRASTE = 80;

const slide = {
  entrar: (direcao: number) => ({ opacity: 0, x: direcao * 60 }),
  centro: { opacity: 1, x: 0 },
  sair: (direcao: number) => ({ opacity: 0, x: direcao * -60 }),
};

type CartaoFotoProps = {
  imagem: Imagem;
  apagada: boolean;
  onFocar: () => void;
  onAbrir: () => void;
};

function CartaoFoto({ imagem, apagada, onFocar, onAbrir }: CartaoFotoProps) {
  const { ativo, estilo, brilho, eventos } = useInclinacao(10);

  return (
    <div className="perspective-[800px]">
      <motion.button
        type="button"
        {...eventos}
        onPointerEnter={onFocar}
        onFocus={onFocar}
        onClick={onAbrir}
        aria-label={imagem.alt}
        style={estilo}
        whileTap={{ scale: 0.95 }}
        className={`group relative block aspect-square w-full overflow-hidden rounded-xl bg-nude shadow-sm transition-[opacity,filter,box-shadow] duration-500 hover:z-10 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe sm:rounded-2xl ${
          apagada ? "opacity-50 saturate-50" : ""
        }`}
      >
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          sizes="(min-width: 768px) 16rem, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        />
        {ativo && (
          <motion.span
            aria-hidden
            style={{ background: brilho }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <span
          aria-hidden
          className="absolute right-2 bottom-2 grid size-8 scale-75 place-items-center rounded-full bg-offwhite/90 text-cafe opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:size-10"
        >
          <ExpandIcon className="size-4" />
        </span>
      </motion.button>
    </div>
  );
}

export default function Galeria() {
  const { imagens, lightbox } = galeria;
  const total = imagens.length;
  const [[ativa, direcao], setEstado] = useState<[number | null, number]>([null, 0]);
  const [focada, setFocada] = useState<number | null>(null);

  const abrir = (i: number) => setEstado([i, 0]);
  const fechar = useCallback(() => setEstado([null, 0]), []);
  const navegar = useCallback(
    (passo: number) => setEstado(([i]) => [i === null ? i : (i + passo + total) % total, passo]),
    [total],
  );
  const irPara = (i: number) => setEstado(([atual]) => [i, atual !== null && i < atual ? -1 : 1]);

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -LIMITE_ARRASTE || info.velocity.x < -500) navegar(1);
    else if (info.offset.x > LIMITE_ARRASTE || info.velocity.x > 500) navegar(-1);
  };

  useEffect(() => {
    if (ativa === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [ativa, fechar, navegar]);

  return (
    <section id={galeria.id} className="section-y">
      <div className="container-site">
        <FadeIn className="mb-12 text-center sm:mb-16">
          <Titulo {...galeria.titulo} />
        </FadeIn>

        <ul className="mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:gap-4" onPointerLeave={() => setFocada(null)}>
          {imagens.map((img, i) => (
            <li key={img.src}>
              <FadeIn delay={(i % 3) * 0.08}>
                <CartaoFoto
                  imagem={img}
                  apagada={focada !== null && focada !== i}
                  onFocar={() => setFocada(i)}
                  onAbrir={() => abrir(i)}
                />
              </FadeIn>
            </li>
          ))}
        </ul>

        <FadeIn className="mt-10 text-center">
          <a
            href={contato.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
          >
            {galeria.verMais}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>

      <AnimatePresence>
        {ativa !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={imagens[ativa].alt}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-cafe/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fechar}
          >
            <button
              type="button"
              onClick={fechar}
              aria-label={lightbox.fechar}
              className="absolute top-4 right-4 grid size-11 place-items-center text-offwhite transition-opacity hover:opacity-60"
            >
              <CloseIcon className="size-7" />
            </button>

            <div className="relative flex w-full items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navegar(-1);
                }}
                aria-label={lightbox.anterior}
                className="absolute left-0 z-10 hidden size-11 place-items-center text-offwhite transition-opacity hover:opacity-60 sm:left-6 sm:grid"
              >
                <ChevronIcon direction="left" className="size-7" />
              </button>

              <div className="relative aspect-4/5 w-full max-w-[min(88vw,62vh)]" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence initial={false} custom={direcao} mode="popLayout">
                  <motion.div
                    key={ativa}
                    custom={direcao}
                    variants={slide}
                    initial="entrar"
                    animate="centro"
                    exit="sair"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={aoSoltar}
                    className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden rounded-3xl active:cursor-grabbing"
                  >
                    <Image src={imagens[ativa].src} alt={imagens[ativa].alt} fill sizes="88vw" draggable={false} className="pointer-events-none object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navegar(1);
                }}
                aria-label={lightbox.proxima}
                className="absolute right-0 z-10 hidden size-11 place-items-center text-offwhite transition-opacity hover:opacity-60 sm:right-6 sm:grid"
              >
                <ChevronIcon direction="right" className="size-7" />
              </button>
            </div>

            <p className="font-display text-sm tracking-[0.3em] text-offwhite/70">{lightbox.contador(ativa + 1, total)}</p>

            <ul className="no-scrollbar flex max-w-full gap-2 overflow-x-auto px-1 py-1" onClick={(e) => e.stopPropagation()}>
              {imagens.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => irPara(i)}
                    aria-label={img.alt}
                    aria-current={i === ativa}
                    className={`relative block size-12 overflow-hidden rounded-lg transition sm:size-14 ${
                      i === ativa ? "opacity-100 ring-2 ring-offwhite" : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
