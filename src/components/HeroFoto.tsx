"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import type { Imagem } from "@/data/site";

const mola = { stiffness: 150, damping: 18 };

export default function HeroFoto({ imagem }: { imagem: Imagem }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();

  // Inclinação 3D e brilho seguindo o mouse (posição de -0.5 a 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), mola);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), mola);
  const brilhoX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const brilhoY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const brilho = useMotionTemplate`radial-gradient(circle at ${brilhoX} ${brilhoY}, rgb(255 255 255 / 0.28), transparent 55%)`;

  // Parallax: foto e aro em velocidades diferentes ao rolar
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFoto = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yMoldura = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const aoMover = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const aoSair = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={ref} className="relative perspective-[1000px]">
      <motion.div
        aria-hidden
        style={reduzir ? undefined : { y: yMoldura }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute -inset-2 rounded-full border border-cafe/20 sm:-inset-3"
      />

      <motion.div style={reduzir ? undefined : { y: yFoto }}>
        <motion.div
          animate={reduzir ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            onPointerMove={reduzir ? undefined : aoMover}
            onPointerLeave={aoSair}
            style={reduzir ? undefined : { rotateX, rotateY }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(50% at 50% 50%)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative size-52 overflow-hidden rounded-full bg-nude shadow-soft sm:size-72 lg:size-100"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={imagem.src}
                alt={imagem.alt}
                fill
                priority
                sizes="(min-width: 1024px) 25rem, (min-width: 640px) 18rem, 13rem"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
            {!reduzir && (
              <motion.div aria-hidden style={{ background: brilho }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
