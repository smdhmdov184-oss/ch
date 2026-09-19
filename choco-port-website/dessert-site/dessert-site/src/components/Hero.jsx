import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { scrollToSection } from "../hooks/useScrollAnimation";
import { siteConfig } from "../config/siteConfig";
import MagneticButton from "./MagneticButton";
import SplineScene from "./SplineScene";
import DessertArt from "./DessertArt";

const ease = [0.22, 1, 0.36, 1];

function Line({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

function Floaters() {
  const items = [
    { cls: "left-[4%] top-[12%] h-5 w-5 bg-petal", d: 1.7 },
    { cls: "right-[6%] top-[22%] h-8 w-8 border border-gold", d: 1.85 },
    { cls: "bottom-[16%] left-[8%] h-10 w-10 bg-blush", d: 2 },
    { cls: "bottom-[10%] right-[12%] h-4 w-4 bg-rose/70", d: 2.15 },
  ];
  return items.map((f, i) => (
    <motion.span key={i} aria-hidden="true" className={`absolute rounded-full ${f.cls}`} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease, delay: f.d }} />
  ));
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-0" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blush/70 blur-3xl" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-0 lg:pt-28">
        {/* text */}
        <div className="order-2 lg:order-1">
          <motion.p {...fadeUp(0.5)} className="eyebrow">
            {t.hero.eyebrow}
          </motion.p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(2.9rem,9.5vw,6.6rem)]">
            <Line delay={0.65}>{t.hero.title[0]}</Line>
            <Line delay={0.78}>
              <em className="font-normal italic text-deep">{t.hero.title[1]}</em>
            </Line>
          </h1>
          <motion.p {...fadeUp(1.05)} className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.description}
          </motion.p>
          <motion.div {...fadeUp(1.2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton as="a" href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection("menu"); }} className="btn btn-primary">
              {t.cta.explore}
            </MagneticButton>
            <MagneticButton as="a" href="#reservation" onClick={(e) => { e.preventDefault(); scrollToSection("reservation"); }} className="btn btn-ghost">
              {t.cta.reserve}
            </MagneticButton>
          </motion.div>
        </div>

        {/* 3D / fallback visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 1 }}
          className="relative order-1 mx-auto aspect-square w-[min(78vw,26rem)] lg:order-2 lg:w-full lg:max-w-[38rem]"
        >
          <div aria-hidden="true" className="absolute inset-[6%] rounded-full border border-line" />
          <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-gradient-to-b from-blush to-white" />
          <Floaters />
          <SplineScene
            url={siteConfig.splineUrl}
            className="absolute inset-0"
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <DessertArt label={t.hero.visualAlt} className="w-[86%] animate-float" />
              </div>
            }
          />
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("story")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-label={t.hero.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted lg:flex"
      >
        {t.hero.scroll}
        <ArrowDown aria-hidden="true" className="h-4 w-4 animate-float" />
      </motion.button>
    </section>
  );
}
