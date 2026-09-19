import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import DessertArt from "./DessertArt";

const STEPS = 5;

function Heading() {
  const { t } = useLanguage();
  return (
    <div>
      <p className="eyebrow">{t.story.eyebrow}</p>
      <h2 id="story-title" className="display mt-3 text-[clamp(2rem,5.5vw,3.6rem)]">
        {t.story.title}
      </h2>
    </div>
  );
}

function StorySticky() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS - 1, Math.floor(v * STEPS))));

  const rotate = useTransform(scrollYProgress, [0, 1], [-9, 9]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 1.06]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const current = t.story.steps[step];

  return (
    <section id="story" ref={ref} aria-labelledby="story-title" className="relative bg-white" style={{ height: `${STEPS * 90}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/70 blur-3xl" />
        <div className="container-x relative grid w-full items-center gap-4 pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-0">
          <div className="order-2 lg:order-1">
            <Heading />
            <div className="mt-6 min-h-[8.5rem] sm:min-h-[9.5rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                  <p className="text-sm font-semibold text-deep">
                    {t.story.stepLabel} {step + 1} / {STEPS}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-medium sm:text-4xl">{current.name}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{current.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 h-px w-full max-w-md bg-line" aria-hidden="true">
              <motion.div className="h-full origin-left bg-rose" style={{ scaleX: barScale }} />
            </div>
          </div>

          <motion.div className="order-1 mx-auto w-[min(74vw,42svh)] lg:order-2 lg:w-full lg:max-w-[34rem]" style={{ rotate, scale }}>
            <DessertArt progress={scrollYProgress} label={t.hero.visualAlt} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Reduced-motion version: no pinning, no scroll-linked transforms. */
function StoryStatic() {
  const { t } = useLanguage();
  return (
    <section id="story" aria-labelledby="story-title" className="section-y bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Heading />
          <ol className="mt-8 space-y-6">
            {t.story.steps.map((s, i) => (
              <li key={s.name}>
                <p className="text-sm font-semibold text-deep">
                  {t.story.stepLabel} {i + 1} / {STEPS}
                </p>
                <h3 className="font-display text-2xl font-medium">{s.name}</h3>
                <p className="mt-1 max-w-md text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <DessertArt label={t.hero.visualAlt} className="mx-auto h-auto w-full max-w-md" />
      </div>
    </section>
  );
}

export default function ScrollShowcase() {
  const reduce = useReducedMotion();
  return reduce ? <StoryStatic /> : <StorySticky />;
}
