"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { contato, header, marca, navegacao } from "@/data/site";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${rolou && !aberto ? "bg-offwhite/90 backdrop-blur-md" : ""}`}>
      <div className="container-site relative z-10 flex h-16 items-center justify-between sm:h-18">
        <a href="#inicio" onClick={fechar} className="font-display text-sm tracking-[0.3em] uppercase">
          {marca.nome}
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.8rem] tracking-wide">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-opacity hover:opacity-60">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contato.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-cafe px-5 py-2 transition-colors hover:bg-cafe hover:text-offwhite"
              >
                {header.cta}
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? header.fecharMenu : header.abrirMenu}
          className="-mr-2 grid size-11 place-items-center md:hidden"
        >
          {aberto ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex flex-col justify-center bg-nude md:hidden"
          >
            <ul className="container-site space-y-5">
              {navegacao.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={item.href} onClick={fechar} className="font-display text-4xl tracking-[0.12em] uppercase">
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-site mt-12">
              <a
                href={contato.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={fechar}
                className="inline-block rounded-full bg-cafe px-8 py-4 text-sm text-offwhite"
              >
                {header.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
