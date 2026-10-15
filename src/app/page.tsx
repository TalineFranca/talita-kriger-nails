import Agenda from "@/components/Agenda";
import Depoimentos from "@/components/Depoimentos";
import Estudio from "@/components/Estudio";
import Footer from "@/components/Footer";
import Galeria from "@/components/Galeria";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicos from "@/components/Servicos";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Galeria />
        <Servicos />
        <Depoimentos />
        <Estudio />
        <Agenda />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
