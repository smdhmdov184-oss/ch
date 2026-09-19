import { Candy, Cherry, Cookie, Droplet, IceCreamCone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import IngredientCard from "./IngredientCard";
import DessertArt from "./DessertArt";

const ICONS = [Candy, Cherry, IceCreamCone, Cookie, Droplet];

export default function Ingredients() {
  const { t } = useLanguage();
  const items = t.inside.items.map((item, i) => ({ ...item, Icon: ICONS[i], index: i }));
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section id="inside" aria-labelledby="inside-title" className="section-y relative">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.inside.eyebrow}</p>
          <h2 id="inside-title" className="display mt-3 text-[clamp(2.2rem,6vw,4rem)]">
            {t.inside.title}
          </h2>
          <p className="mt-4 text-muted">{t.inside.intro}</p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)_1fr]">
          <motion.div className="relative mx-auto w-[min(72vw,22rem)] lg:order-2 lg:w-full" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-blush" />
            <DessertArt label={t.hero.visualAlt} className="relative h-auto w-full" />
          </motion.div>

          {/* mobile: one list in order; desktop: split around the centre */}
          <ul className="space-y-4 lg:hidden">
            {items.map((it) => (
              <IngredientCard key={it.index} {...it} from={it.index % 2 ? "right" : "left"} />
            ))}
          </ul>
          <ul className="hidden space-y-6 lg:order-1 lg:block">
            {left.map((it) => (
              <IngredientCard key={it.index} {...it} from="left" />
            ))}
          </ul>
          <ul className="hidden space-y-6 lg:order-3 lg:block">
            {right.map((it) => (
              <IngredientCard key={it.index} {...it} from="right" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
