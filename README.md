# Talita Kriger | Nail Designer

Landing page em Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Editando o conteúdo

Todos os textos, contatos, preços, horários, depoimentos e políticas ficam em
**`src/data/site.ts`**. Os componentes não têm texto fixo.

Antes de publicar, troque os dados fictícios:

- `whatsappNumero` e `contato.whatsappExibicao`: número real
- `contato.endereco`, `contato.mapsEmbedUrl` e `contato.mapsUrl`: endereço real
  (Google Maps → Compartilhar → Incorporar um mapa → copie o `src` do iframe)
- `seo.url`: domínio do site
- preços, durações, horários, textos lorem ipsum e depoimentos

## Imagens

As fotos são placeholders em `public/images/`. Para trocar, coloque a foto real
(`.jpg` ou `.webp`) na pasta e atualize o caminho em `src/data/site.ts`
(`hero.imagem`, `estudio.imagem`, `galeria.imagens`).

## Cores (Tailwind)

Definidas em `src/app/globals.css` (`@theme`): `nude`, `offwhite`, `cafe`,
`rose` (só detalhes), `bolha`, `estrela`. Uso: `bg-nude`, `text-cafe`...

## Títulos das seções

Cada seção tem um `titulo` em `src/data/site.ts` com `texto` (caixa alta) e
`complemento` opcional (linha em itálico logo abaixo).
