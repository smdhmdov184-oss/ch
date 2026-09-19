import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { CATEGORY_KEYS, menuItems } from "../data/menuData";
import MenuCard from "./MenuCard";

export default function MenuSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState("all");
  const items = useMemo(() => (active === "all" ? menuItems : menuItems.filter((i) => i.category === active)), [active]);

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-y bg-gradient-to-b from-white via-blush/40 to-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">{t.menu.eyebrow}</p>
            <h2 id="menu-title" className="display mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
              {t.menu.title}
            </h2>
            <p className="mt-4 text-muted">{t.menu.intro}</p>
          </div>

          <div role="group" aria-label={t.menu.title} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {CATEGORY_KEYS.map((key) => {
              const selected = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(key)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    selected ? "border-transparent text-white" : "border-line bg-white text-muted hover:border-rose hover:text-ink"
                  }`}
                >
                  {selected && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{t.menu.categories[key]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {t.menu.shown.replace("{n}", items.length)}
        </p>

        <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.li key={item.id} layout initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <MenuCard item={item} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
