"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { estudio, type Destaque } from "@/data/site";
import FadeIn from "./FadeIn";
import { HeartIcon } from "./Icons";
import Titulo from "./Titulo";
import useInclinacao from "./useInclinacao";

const formatar = (n: number) => n.toLocaleString("pt-BR");

function Contador({ valor, prefixo = "", sufixo = "" }: Omit<Destaque, "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-60px" });
  const reduzir = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!emVista || !el) return;
    const escrever = (v: number) => (el.textContent = `${prefixo}${formatar(Math.round(v))}${sufixo}`);
    if (reduzir) return void escrever(valor);
    const controles = animate(0, valor, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: escrever });
    return () => controles.stop();
  }, [emVista, reduzir, valor, prefixo, sufixo]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefixo}0{sufixo}
    </span>
  );
}

export default function Estudio() {
  const { ativo, estilo, brilho, eventos } = useInclinacao(6);

  return (
    <section id={estudio.id} className="section-y overflow-hidden bg-nude">
      <div className="container-site">
        <FadeIn className="mb-12 text-center sm:mb-16">
          <Titulo {...estudio.titulo} />
        </FadeIn>

        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          <FadeIn className="relative mx-auto w-full max-w-sm perspective-[1000px]">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-cafe/20" />
            <motion.div
              {...eventos}
              style={estilo}
              className="group relative aspect-4/5 overflow-hidden rounded-3xl bg-offwhite shadow-soft"
            >
              <Image
                src={estudio.imagem.src}
                alt={estudio.imagem.alt}
                fill
                sizes="(min-width: 768px) 24rem, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {ativo && (
                <motion.div
                  aria-hidden
                  style={{ background: brilho }}
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 14 }}
              className="absolute -right-3 -bottom-8 sm:-right-8"
            >
              <motion.div
                animate={ativo ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08, rotate: 4 }}
                className="relative size-28 overflow-hidden rounded-full border-4 border-nude bg-offwhite shadow-soft sm:size-32"
              >
                <Image src={estudio.foto.src} alt={estudio.foto.alt} fill sizes="8rem" className="object-cover" />
              </motion.div>
              <span className="absolute -top-1 -left-1 grid size-9 place-items-center rounded-full bg-rose text-offwhite shadow-soft">
                <HeartIcon className="size-4" />
              </span>
            </motion.div>
          </FadeIn>

          <div className="text-center md:text-left">
            <FadeIn delay={0.1}>
              <p className="font-display text-2xl text-cafe italic">{estudio.saudacao}</p>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-cafe/75 md:mx-0">{estudio.texto}</p>
            </FadeIn>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm md:mx-0">
              {estudio.diferenciais.map((d, i) => (
                <li key={d}>
                  <FadeIn delay={0.2 + i * 0.08} y={12} className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-offwhite text-rose">
                      <HeartIcon className="size-3.5" />
                    </span>
                    {d}
                  </FadeIn>
                </li>
              ))}
            </ul>

            <FadeIn delay={0.3}>
              <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 md:mx-0">
                {estudio.destaques.map((d) => (
                  <div
                    key={d.label}
                    className="rounded-2xl bg-offwhite px-2 py-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <dt className="sr-only">{d.label}</dt>
                    <dd className="font-display text-2xl sm:text-3xl">
                      <Contador {...d} />
                    </dd>
                    <dd aria-hidden className="mt-1 text-[0.65rem] leading-tight tracking-wide text-cafe/60 uppercase">
                      {d.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
