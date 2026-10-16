"use client";

import { motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { depoimentos, type Depoimento } from "@/data/site";
import FadeIn from "./FadeIn";
import { ChevronIcon, HeartIcon, InstagramIcon, StarIcon, WhatsAppIcon } from "./Icons";
import Titulo from "./Titulo";

const VISIVEIS = 3;
const LIMITE_ARRASTE = 70;
const INTERVALO_MS = 6000;

const origemEstilo = {
  instagram: {
    Icone: InstagramIcon,
    icone: "bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    conversa: "bg-white",
    bolha: "rounded-3xl rounded-bl-md bg-nude",
  },
  whatsapp: {
    Icone: WhatsAppIcon,
    icone: "bg-[#25D366]",
    conversa: "bg-[#ece5dd]",
    bolha: "rounded-2xl rounded-tl-sm bg-white shadow-sm",
  },
};

function Mensagem({ d, digitar }: { d: Depoimento; digitar: boolean }) {
  const { Icone, ...estilo } = origemEstilo[d.origem];
  const entrada = { once: true, margin: "-40px" };

  return (
    <figure className="rounded-3xl bg-offwhite p-4 text-left shadow-soft ring-1 ring-cafe/5 select-none sm:p-5">
      <header className="flex items-center gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-white ${estilo.icone}`}>
          <Icone className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] tracking-[0.12em] text-cafe/55 uppercase">{depoimentos.origens[d.origem]}</p>
          <figcaption className="truncate text-sm font-medium">{d.nome}</figcaption>
        </div>
      </header>

      <div className={`relative mt-4 min-h-32 rounded-2xl p-3 ${estilo.conversa}`}>
        {digitar && (
          <motion.div
            aria-hidden
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={entrada}
            transition={{ delay: 1.1, duration: 0.2 }}
            className={`absolute top-3 left-3 flex items-center gap-1 px-4 py-3 ${estilo.bolha}`}
          >
            <span className="sr-only">{depoimentos.digitando}</span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="size-1.5 rounded-full bg-cafe/60"
              />
            ))}
          </motion.div>
        )}
        <motion.blockquote
          initial={digitar ? { opacity: 0, y: 10, scale: 0.95 } : false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={entrada}
          transition={{ delay: digitar ? 1.25 : 0, type: "spring", stiffness: 260, damping: 22 }}
          className={`w-fit max-w-[92%] origin-top-left px-4 py-3 text-sm leading-relaxed ${estilo.bolha}`}
        >
          {d.texto}
        </motion.blockquote>
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex gap-1 text-estrela" role="img" aria-label={depoimentos.estrelasLabel(d.estrelas)}>
          {Array.from({ length: d.estrelas }, (_, s) => (
            <StarIcon key={s} className="size-4" />
          ))}
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-nude text-rose">
          <HeartIcon className="size-4" />
        </span>
      </footer>
    </figure>
  );
}

export default function Depoimentos() {
  const { itens } = depoimentos;
  const total = itens.length;
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useInView(ref, { margin: "-100px" });

  const navegar = useCallback((passo: number) => setAtual((a) => (a + passo + total) % total), [total]);

  // Passa sozinho enquanto está na tela; reinicia o tempo a cada troca
  useEffect(() => {
    if (reduzir || pausado || !emVista) return;
    const id = setTimeout(() => navegar(1), INTERVALO_MS);
    return () => clearTimeout(id);
  }, [reduzir, pausado, emVista, navegar, atual]);

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -LIMITE_ARRASTE || info.velocity.x < -500) navegar(1);
    else if (info.offset.x > LIMITE_ARRASTE || info.velocity.x > 500) navegar(-1);
  };

  return (
    <section id={depoimentos.id} className="section-y overflow-hidden">
      <div className="container-site grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <FadeIn className="text-center md:text-left">
          <Titulo {...depoimentos.titulo} complementoClassName="text-rose" />
          <p className="mx-auto mt-6 max-w-sm leading-relaxed text-cafe/70 md:mx-0">{depoimentos.texto}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            ref={ref}
            onPointerEnter={(e) => e.pointerType === "mouse" && setPausado(true)}
            onPointerLeave={() => setPausado(false)}
            className="mx-auto grid w-full max-w-sm pb-10"
          >
            {itens.map((d, i) => {
              const pos = (i - atual + total) % total;
              const frente = pos === 0;
              return (
                <motion.div
                  key={d.nome}
                  aria-hidden={!frente}
                  style={{ zIndex: total - pos }}
                  animate={{
                    y: pos * 18,
                    scale: 1 - pos * 0.05,
                    rotate: frente ? 0 : pos % 2 ? 2.5 : -2.5,
                    opacity: pos < VISIVEIS ? 1 - pos * 0.2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  drag={frente ? "x" : false}
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileDrag={{ scale: 1.03, rotate: 0 }}
                  onDragEnd={aoSoltar}
                  className={`origin-top [grid-area:1/1] ${frente ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"}`}
                >
                  {/* key muda quando vira a da frente, para repetir o "digitando" */}
                  <Mensagem key={frente ? `frente-${atual}` : "fundo"} d={d} digitar={frente && !reduzir} />
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navegar(-1)}
              aria-label={depoimentos.anterior}
              className="grid size-10 place-items-center rounded-full border border-cafe/15 transition hover:bg-nude"
            >
              <ChevronIcon direction="left" className="size-5" />
            </button>
            <ul className="flex gap-2">
              {itens.map((d, i) => (
                <li key={d.nome}>
                  <button
                    type="button"
                    onClick={() => setAtual(i)}
                    aria-label={depoimentos.irPara(i + 1)}
                    aria-current={i === atual}
                    className={`block h-2 rounded-full transition-all duration-300 ${i === atual ? "w-6 bg-rose" : "w-2 bg-cafe/20 hover:bg-cafe/40"}`}
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navegar(1)}
              aria-label={depoimentos.proxima}
              className="grid size-10 place-items-center rounded-full border border-cafe/15 transition hover:bg-nude"
            >
              <ChevronIcon direction="right" className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-center text-xs tracking-[0.2em] text-cafe/45 uppercase">{depoimentos.dica}</p>
        </FadeIn>
      </div>
    </section>
  );
}
