import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useScrollAnimation";

const INTERACTIVE = "[data-cursor],a,button,summary,select,label,[role='button']";

/** Desktop-only follower. The native cursor is never hidden, so it stays accessible. */
export default function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });
  const [mode, setMode] = useState("idle"); // idle | link | text | label:<TEXT>
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer || reduce) return undefined;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      if (target && target.closest("input,textarea")) return setMode("text");
      const el = target ? target.closest(INTERACTIVE) : null;
      if (!el) return setMode("idle");
      setMode(el.dataset.cursor ? `label:${el.dataset.cursor}` : "link");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer, reduce, x, y]);

  if (!finePointer || reduce) return null;

  const label = mode.startsWith("label:") ? mode.slice(6) : "";
  const size = label ? 78 : mode === "link" ? 44 : 14;

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        className="flex items-center justify-center rounded-full border border-rose bg-rose/15 text-[0.62rem] font-semibold tracking-[0.2em] text-deep backdrop-blur-[1px]"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity: visible && mode !== "text" ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
