import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { galleryImages } from "../data/galleryData";
import ImageWithFallback from "./ImageWithFallback";
import Stats from "./Stats";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative overflow-hidden bg-blush/40">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-petal/30 blur-3xl" />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-title" className="display mt-3 text-[clamp(2.3rem,5.6vw,4.2rem)]">
              {t.about.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.about.story}</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-medium">{t.about.philosophyTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.about.philosophy}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium">{t.about.qualityTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.about.quality}</p>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full rounded-[2.5rem] border border-gold/50" />
            <ImageWithFallback src={galleryImages[4].src} alt={t.about.imageAlt} width={900} height={1100} className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover" />
          </motion.div>
        </div>

        <Stats />
      </div>
    </section>
  );
}
