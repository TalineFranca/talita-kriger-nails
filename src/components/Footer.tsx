import { contato, marca, rodape } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-offwhite/10 bg-cafe py-10 text-offwhite/70">
      <div className="container-site flex flex-col items-center gap-6 text-xs sm:flex-row sm:justify-between">
        <p className="font-display tracking-[0.3em] text-offwhite uppercase">{marca.nome}</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <li>
            <a href={contato.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-offwhite">
              <InstagramIcon className="size-4" />
              {contato.instagram}
            </a>
          </li>
          <li>
            <a href={contato.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-offwhite">
              <WhatsAppIcon className="size-4" />
              {contato.whatsappExibicao}
            </a>
          </li>
          <li>{contato.cidade}</li>
        </ul>

        <p>{rodape.direitos(ano)}</p>
      </div>
    </footer>
  );
}
