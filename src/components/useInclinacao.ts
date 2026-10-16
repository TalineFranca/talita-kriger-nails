"use client";

import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

const mola = { stiffness: 150, damping: 18 };

/** Inclinação 3D e brilho seguindo o mouse. Desligado em telas de toque e com movimento reduzido. */
export default function useInclinacao(graus = 8) {
  const reduzir = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [graus, -graus]), mola);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-graus, graus]), mola);
  const brilhoX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const brilhoY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const brilho = useMotionTemplate`radial-gradient(circle at ${brilhoX} ${brilhoY}, rgb(255 255 255 / 0.3), transparent 55%)`;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduzir || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onPointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    ativo: !reduzir,
    estilo: reduzir ? undefined : { rotateX, rotateY },
    brilho,
    eventos: { onPointerMove, onPointerLeave },
  };
}
