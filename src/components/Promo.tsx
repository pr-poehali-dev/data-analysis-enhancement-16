import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="/images/spiral-circles.jpg"
            alt="Abstract spiral circles"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <h3 className="absolute top-12 left-6 text-white uppercase z-10 text-sm md:text-base lg:text-lg tracking-widest">
        Почему выбирают нас
      </h3>

      <div className="absolute bottom-12 left-6 right-6 z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl">
        <div className="text-white border-l border-white/40 pl-4">
          <p className="text-3xl md:text-4xl font-bold mb-2">1200+</p>
          <p className="text-sm opacity-80 uppercase tracking-wide">Довольных туристов</p>
        </div>
        <div className="text-white border-l border-white/40 pl-4">
          <p className="text-3xl md:text-4xl font-bold mb-2">50+</p>
          <p className="text-sm opacity-80 uppercase tracking-wide">Направлений</p>
        </div>
        <div className="text-white border-l border-white/40 pl-4">
          <p className="text-3xl md:text-4xl font-bold mb-2">10 лет</p>
          <p className="text-sm opacity-80 uppercase tracking-wide">На рынке туризма</p>
        </div>
      </div>
    </div>
  );
}