import { useRef } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { siteConfig } from "../config/siteConfig";
import { useCountUp } from "../hooks/useScrollAnimation";

function Stat({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className="border-t border-gold/40 pt-5">
      <p className="font-display text-5xl font-medium text-ink sm:text-6xl">
        <span className="sr-only">
          {value}
          {suffix}
        </span>
        <span aria-hidden="true">
          {n}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {siteConfig.stats.map((s) => (
        <Stat key={s.key} value={s.value} suffix={s.suffix} label={t.about.stats[s.key]} />
      ))}
    </div>
  );
}
