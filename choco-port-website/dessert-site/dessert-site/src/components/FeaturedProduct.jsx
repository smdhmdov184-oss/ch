import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { featuredProduct } from "../data/menuData";
import { siteConfig } from "../config/siteConfig";
import ImageWithFallback from "./ImageWithFallback";
import OrderButton from "./OrderButton";

export default function FeaturedProduct() {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const ringY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
  const tr = featuredProduct.translations[lang];

  return (
    <section id="featured" ref={ref} aria-labelledby="featured-title" className="section-y">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg">
          <motion.div aria-hidden="true" style={{ y: ringY }} className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] border border-gold/50" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-blush">
            <motion.div style={{ y: imageY, scale: 1.12 }}>
              <ImageWithFallback src={featuredProduct.image} alt={t.featured.imageAlt} width={900} height={1000} className="aspect-[4/5] h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>

        <div>
          <p className="eyebrow">{t.featured.eyebrow}</p>
          <h2 id="featured-title" className="display mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
            {tr.name}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{tr.description}</p>

          <h3 className="mt-8 text-sm font-semibold">{t.featured.ingredients}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tr.ingredients.map((ing) => (
              <li key={ing} className="rounded-full border border-line bg-blush/60 px-4 py-1.5 text-sm text-ink">
                {ing}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <p className="font-display text-5xl font-medium text-deep">
              {featuredProduct.price} {siteConfig.currency}
            </p>
            <OrderButton itemName={tr.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
