import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useScrollAnimation";

/** Button/link that leans slightly toward the pointer on desktop. Inert on touch and reduced motion. */
export default function MagneticButton({ as = "button", strength = 0.22, className = "", children, ...props }) {
  const Comp = motion[as];
  const ref = useRef(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const enabled = finePointer && !reduce;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Comp ref={ref} style={enabled ? { x: sx, y: sy } : undefined} onPointerMove={onMove} onPointerLeave={onLeave} className={className} {...props}>
      {children}
    </Comp>
  );
}
