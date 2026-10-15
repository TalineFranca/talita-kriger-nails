import { ImageResponse } from "next/og";
import { contato, marca, seo } from "@/data/site";

export const alt = seo.ogImagemAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#EFE4D6",
          color: "#4A3A2F",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, textTransform: "uppercase", color: "#4A3A2F", opacity: 0.7 }}>
          {marca.profissao}
        </div>
        <div style={{ fontSize: 96, marginTop: 16 }}>{marca.nome}</div>
        <div style={{ fontSize: 32, marginTop: 24, maxWidth: 900, textAlign: "center", opacity: 0.8 }}>
          {marca.slogan}
        </div>
        <div style={{ fontSize: 26, marginTop: 40, opacity: 0.7 }}>
          {`${contato.cidade} · ${contato.instagram}`}
        </div>
      </div>
    ),
    size,
  );
}
