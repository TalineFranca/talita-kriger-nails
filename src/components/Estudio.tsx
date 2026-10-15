import Image from "next/image";
import { estudio } from "@/data/site";
import FadeIn from "./FadeIn";
import Titulo from "./Titulo";

export default function Estudio() {
  return (
    <section id={estudio.id} className="section-y">
      <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <FadeIn className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-cafe/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-nude">
            <Image src={estudio.imagem.src} alt={estudio.imagem.alt} fill sizes="(min-width: 768px) 24rem, 90vw" className="object-cover" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="text-center md:text-left">
          <Titulo {...estudio.titulo} />
          <p className="mt-10 font-display text-2xl text-cafe italic">{estudio.saudacao}</p>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-cafe/75 md:mx-0">{estudio.texto}</p>
        </FadeIn>
      </div>
    </section>
  );
}
