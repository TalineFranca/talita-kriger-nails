import { depoimentos } from "@/data/site";
import FadeIn from "./FadeIn";
import { HeartIcon, StarIcon } from "./Icons";
import Titulo from "./Titulo";

export default function Depoimentos() {
  return (
    <section id={depoimentos.id} className="section-y overflow-hidden bg-nude">
      <div className="container-site">
        <FadeIn className="mb-16 text-center sm:mb-20">
          <Titulo {...depoimentos.titulo} complementoClassName="text-rose" />
        </FadeIn>

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-8 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {depoimentos.itens.map((d, i) => (
            <li key={d.nome} className="w-[82%] shrink-0 snap-center md:w-auto">
              <FadeIn delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col items-center rounded-3xl bg-offwhite px-5 pb-7 text-center shadow-soft">
                  <span className="-mt-8 grid size-16 place-items-center rounded-full border-4 border-offwhite bg-rose text-offwhite">
                    <HeartIcon className="size-7" />
                  </span>
                  <blockquote className="mt-6 w-full flex-1 rounded-2xl bg-bolha px-5 py-4 text-left text-sm leading-relaxed text-offwhite">
                    {d.texto}
                  </blockquote>
                  <div className="mt-5 flex gap-1 text-estrela" role="img" aria-label={depoimentos.estrelasLabel(d.estrelas)}>
                    {Array.from({ length: d.estrelas }, (_, s) => (
                      <StarIcon key={s} className="size-5" />
                    ))}
                  </div>
                  <figcaption className="mt-3 text-xs tracking-[0.2em] text-cafe/60 uppercase">{d.nome}</figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
