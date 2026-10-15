import { contato, servicos } from "@/data/site";
import FadeIn from "./FadeIn";
import { ArrowIcon } from "./Icons";
import Titulo from "./Titulo";

export default function Servicos() {
  return (
    <section id={servicos.id} className="section-y">
      <div className="container-site max-w-4xl">
        <FadeIn className="mb-12 text-center sm:mb-16">
          <Titulo {...servicos.titulo} />
        </FadeIn>

        <FadeIn>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {servicos.itens.map((s) => (
              <li key={s.nome} className="border-b border-cafe/10 py-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-lg sm:text-xl">{s.nome}</h3>
                  <span aria-hidden className="flex-1 translate-y-[-0.3em] border-b border-dotted border-cafe/25" />
                  <p className="shrink-0 text-sm font-medium">{s.preco}</p>
                </div>
                <p className="mt-1 text-xs text-cafe/60">
                  {s.descricao}
                  {s.duracao && <span className="text-cafe/45"> · {s.duracao}</span>}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <a
            href={contato.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-cafe py-4 pr-6 pl-8 text-sm text-offwhite transition-colors hover:bg-cafe/90"
          >
            {servicos.cta}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
