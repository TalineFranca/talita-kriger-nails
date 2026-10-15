import type { Titulo as TituloData } from "@/data/site";

type TituloProps = TituloData & {
  as?: "h1" | "h2";
  tamanho?: "md" | "lg";
  className?: string;
  complementoClassName?: string;
};

const textoTamanho = {
  md: "text-3xl tracking-[0.18em] sm:text-4xl md:text-5xl",
  lg: "text-5xl leading-[1.05] tracking-[0.08em] sm:text-6xl lg:text-7xl",
};

const complementoTamanho = {
  md: "mt-2 text-xl sm:text-2xl",
  lg: "mt-4 text-2xl sm:text-3xl",
};

export default function Titulo({
  texto,
  complemento,
  as: Tag = "h2",
  tamanho = "md",
  className = "",
  complementoClassName = "text-cafe/60",
}: TituloProps) {
  return (
    <Tag className={`font-display font-normal ${className}`}>
      <span className={`block uppercase ${textoTamanho[tamanho]}`}>{texto}</span>
      {complemento && (
        <span className={`block italic tracking-wide ${complementoTamanho[tamanho]} ${complementoClassName}`}>{complemento}</span>
      )}
    </Tag>
  );
}
