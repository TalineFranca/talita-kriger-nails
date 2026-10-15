/**
 * TODOS os textos, contatos, valores e imagens do site ficam aqui.
 * Para atualizar o site, edite apenas este arquivo.
 *
 * Dados marcados como fictícios (lorem ipsum, 0000, R$ 000,00) devem ser
 * trocados pelos dados reais antes de publicar.
 */

export type Imagem = {
  src: string;
  alt: string;
};

export type NavItem = {
  label: string;
  href: `#${string}`;
};

/** Título das seções: texto em caixa alta + complemento opcional em itálico */
export type Titulo = {
  texto: string;
  complemento?: string;
};

export type Servico = {
  nome: string;
  descricao: string;
  preco: string;
  duracao?: string;
};

export type Depoimento = {
  nome: string;
  texto: string;
  estrelas: number;
};

export type Horario = {
  dia: string;
  horario: string;
};

/* ------------------------------------------------------------------ */
/* Contato                                                             */
/* ------------------------------------------------------------------ */

const whatsappNumero = "5569900000000"; // DDI + DDD + número, só dígitos (fictício)
const whatsappMensagem = "Olá, Talita! Vim pelo site e gostaria de agendar um horário.";

export const contato = {
  whatsappExibicao: "(69) 90000-0000",
  whatsappUrl: `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMensagem)}`,
  instagram: "@talitakriger_nails",
  instagramUrl: "https://www.instagram.com/talitakriger_nails/",
  endereco: "Rua Lorem Ipsum, 000 - Bairro Dolor",
  cidade: "Vilhena - RO",
  // Troque pelo link "Incorporar um mapa" do Google Maps com o endereço real
  mapsEmbedUrl: "https://www.google.com/maps?q=Vilhena+-+RO&output=embed",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vilhena+-+RO",
};

/* ------------------------------------------------------------------ */
/* Marca e SEO                                                         */
/* ------------------------------------------------------------------ */

export const marca = {
  nome: "Talita Kriger",
  profissao: "Nail Designer",
  slogan: "Unhas que valorizam sua beleza e elevam sua autoestima",
};

export const seo = {
  url: "https://www.talitakriger.com.br", // fictício: troque pelo domínio real
  titulo: "Talita Kriger | Nail Designer em Vilhena - RO",
  descricao:
    "Alongamento, banho em gel e blindagem em Vilhena - RO. Unhas que valorizam sua beleza e elevam sua autoestima. Agende seu horário pelo WhatsApp.",
  palavrasChave: [
    "nail designer Vilhena",
    "alongamento em gel Vilhena",
    "manicure Vilhena RO",
    "banho em gel",
    "blindagem de unhas",
    "Talita Kriger",
  ],
  locale: "pt_BR",
  ogImagemAlt: "Talita Kriger | Nail Designer em Vilhena - RO",
};

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

export const navegacao: NavItem[] = [
  { label: "Nails", href: "#nails" },
  { label: "Valores", href: "#valores" },
  { label: "Clientes", href: "#clientes" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Agenda", href: "#agenda" },
];

export const header = {
  cta: "Agendar",
  abrirMenu: "Abrir menu",
  fecharMenu: "Fechar menu",
};

/* ------------------------------------------------------------------ */
/* Seções                                                              */
/* ------------------------------------------------------------------ */

export const hero = {
  especialidades: ["Alongamento", "banho em gel", "blindagem"],
  cidade: "Vilhena-RO",
  cta: "Agende seu horário",
  imagem: {
    src: "/images/hero.svg",
    alt: "Talita Kriger, nail designer em Vilhena - RO",
  } satisfies Imagem,
};

export const galeria = {
  id: "nails",
  titulo: { texto: "Nails", complemento: "meus trabalhos" } satisfies Titulo,
  verMais: "Mais trabalhos no Instagram",
  lightbox: {
    fechar: "Fechar",
    anterior: "Foto anterior",
    proxima: "Próxima foto",
    contador: (atual: number, total: number) => `${atual} / ${total}`,
  },
  imagens: Array.from({ length: 9 }, (_, i) => ({
    src: `/images/galeria/foto-${i + 1}.svg`,
    alt: `Trabalho de unhas ${i + 1} - Talita Kriger`,
  })) satisfies Imagem[],
};

export const servicos = {
  id: "valores",
  titulo: { texto: "Serviços", complemento: "& valores" } satisfies Titulo,
  cta: "Agendar pelo WhatsApp",
  itens: [
    { nome: "Alongamento em gel", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 000,00", duracao: "0h00" },
    { nome: "Manutenção do alongamento", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 000,00", duracao: "0h00" },
    { nome: "Banho em gel", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 000,00", duracao: "0h00" },
    { nome: "Blindagem", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 000,00", duracao: "0h00" },
    { nome: "Pés", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 000,00", duracao: "0h00" },
    { nome: "Remoção", descricao: "Lorem ipsum dolor sit amet consectetur.", preco: "R$ 00,00" },
    { nome: "Adicionais", descricao: "Decoração, francesinha, pedrarias.", preco: "a partir de R$ 00,00" },
  ] satisfies Servico[],
};

export const depoimentos = {
  id: "clientes",
  titulo: { texto: "Momento", complemento: "feedback" } satisfies Titulo,
  estrelasLabel: (n: number) => `${n} de 5 estrelas`,
  itens: [
    {
      nome: "Lorem Ipsum",
      texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.",
      estrelas: 5,
    },
    {
      nome: "Dolor Sit",
      texto: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta.",
      estrelas: 5,
    },
    {
      nome: "Amet Consectetur",
      texto: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
      estrelas: 5,
    },
  ] satisfies Depoimento[],
};

export const estudio = {
  id: "estudio",
  titulo: { texto: "Estúdio" } satisfies Titulo,
  saudacao: "Prazer, eu sou a Talita.",
  texto:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Maecenas faucibus mollis interdum.",
  imagem: {
    src: "/images/estudio.svg",
    alt: "Estúdio da Talita Kriger em Vilhena - RO",
  } satisfies Imagem,
};

export const agenda = {
  id: "agenda",
  titulo: { texto: "Agenda", complemento: "seu horário" } satisfies Titulo,
  aviso: "Atendimento somente com hora marcada",
  cta: "Agendar pelo WhatsApp",
  comoChegar: "Como chegar",
  mapaTitulo: "Mapa com a localização do estúdio Talita Kriger",
  horarios: [
    { dia: "Segunda a sexta", horario: "00h às 00h" },
    { dia: "Sábado", horario: "00h às 00h" },
    { dia: "Domingo", horario: "Fechado" },
  ] satisfies Horario[],
};

export const rodape = {
  direitos: (ano: number) => `© ${ano} ${marca.nome}`,
};

export const whatsappFlutuante = {
  label: "Agendar pelo WhatsApp",
};
