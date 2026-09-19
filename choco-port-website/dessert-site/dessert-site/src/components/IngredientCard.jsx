import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function IngredientCard({ index, name, text, Icon, from = "left" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const offset = from === "left" ? -36 : 36;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: offset }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 shadow-[0_18px_40px_-30px_rgba(201,130,141,0.7)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-deep">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-xs font-semibold text-gold">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-2xl font-medium leading-tight">{name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </motion.li>
  );
}
