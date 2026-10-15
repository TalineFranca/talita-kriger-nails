import { Fragment } from "react";
import { contato, hero, marca } from "@/data/site";
import FadeIn from "./FadeIn";
import HeroFoto from "./HeroFoto";
import { ArrowIcon, MapPinIcon } from "./Icons";
import Titulo from "./Titulo";

export default function Hero() {
  return (
    <section id="inicio" className="pt-24 pb-20 sm:pt-32 md:pb-28">
      <div className="container-site grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-12">
        <div className="mx-auto md:order-last">
          <HeroFoto imagem={hero.imagem} />
        </div>

        <div className="text-center md:text-left">
          <FadeIn delay={0.1}>
            <Titulo as="h1" tamanho="lg" texto={marca.nome} complemento={marca.profissao} />
          </FadeIn>

          <FadeIn delay={0.2} className="mt-8 space-y-2">
            <p className="font-medium sm:text-lg">{marca.slogan}</p>
            <p className="text-sm text-cafe/70">
              {hero.especialidades.map((item, i) => (
                <Fragment key={item}>
                  {i > 0 && <span className="mx-2 text-rose">|</span>}
                  {item}
                </Fragment>
              ))}
            </p>
            <p className="flex items-center justify-center gap-1.5 text-sm text-cafe/70 md:justify-start">
              <MapPinIcon className="size-4 text-rose" />
              {hero.cidade}
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-8">
            <a
              href={contato.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-cafe py-4 pr-6 pl-8 text-sm text-offwhite transition-colors hover:bg-cafe/90"
            >
              {hero.cta}
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
