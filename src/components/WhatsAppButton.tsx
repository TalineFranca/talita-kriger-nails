"use client";

import { motion } from "framer-motion";
import { contato, whatsappFlutuante } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={contato.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappFlutuante.label}
      title={whatsappFlutuante.label}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-cafe text-offwhite shadow-soft border-2 border-offwhite transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
    >
      {/* Ondas pulsando em volta do botão */}
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <span aria-hidden className="absolute -inset-1 rounded-full border-2 border-[#25D366] motion-safe:animate-pulse" />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  );
}
