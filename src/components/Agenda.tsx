import { agenda, contato } from "@/data/site";
import FadeIn from "./FadeIn";
import { ArrowIcon, MapPinIcon } from "./Icons";
import Titulo from "./Titulo";

export default function Agenda() {
  return (
    <section id={agenda.id} className="section-y bg-cafe text-offwhite">
      <div className="container-site grid gap-14 md:grid-cols-2 md:gap-20">
        <FadeIn>
          <div className="text-center md:text-left">
            <Titulo {...agenda.titulo} complementoClassName="text-rose" />
          </div>

          <ul className="mt-12 divide-y divide-offwhite/10 border-y border-offwhite/10">
            {agenda.horarios.map((h) => (
              <li key={h.dia} className="flex justify-between gap-4 py-4 text-sm">
                <span>{h.dia}</span>
                <span className="text-offwhite/70">{h.horario}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs tracking-[0.2em] text-rose uppercase">{agenda.aviso}</p>

          <p className="mt-8 flex items-start gap-2 text-sm text-offwhite/80">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-rose" />
            {contato.endereco}, {contato.cidade}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={contato.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-offwhite py-4 pr-6 pl-8 text-sm text-cafe transition-colors hover:bg-nude"
            >
              {agenda.cta}
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={contato.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-rose">
              {agenda.comoChegar}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="min-h-80">
          <iframe
            src={contato.mapsEmbedUrl}
            title={agenda.mapaTitulo}
            className="size-full min-h-80 rounded-sm border-0 grayscale sepia-[.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </FadeIn>
      </div>
    </section>
  );
}
