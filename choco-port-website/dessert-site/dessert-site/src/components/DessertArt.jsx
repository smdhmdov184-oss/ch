import { motion, useMotionValue, useTransform } from "framer-motion";

/** Reveals a layer while `progress` (0..1) moves through `range`. */
function Layer({ progress, range, from = -34, children }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [from, 0]);
  return <motion.g style={{ opacity, y }}>{children}</motion.g>;
}

const Strawberry = ({ x, y, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <path d="M0 0C-24-4-26 28 0 44C26 28 24-4 0 0Z" fill="#E4577F" />
    <path d="M-11 1L0-10L11 1L0 6Z" fill="#7FA36B" />
    <g fill="#FCE7F3">
      <circle cx="-8" cy="14" r="1.6" />
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="-2" cy="24" r="1.6" />
      <circle cx="9" cy="24" r="1.6" />
      <circle cx="-10" cy="28" r="1.6" />
    </g>
  </g>
);

const Sparkle = ({ x, y, s = 1 }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-14Q2-2 14 0Q2 2 0 14Q-2 2-14 0Q-2-2 0-14Z" fill="#C9828D" />
);

/**
 * Layered dessert illustration. Pass a MotionValue (0..1) as `progress` to build it up layer by layer;
 * without it, the complete dessert is shown. Used as the Hero fallback and the scroll-story centrepiece.
 */
export default function DessertArt({ progress, className = "", label }) {
  const complete = useMotionValue(1);
  const p = progress ?? complete;

  return (
    <svg viewBox="0 0 400 380" className={className} role="img" aria-label={label} focusable="false">
      {/* plate */}
      <ellipse cx="200" cy="316" rx="180" ry="38" fill="#FCE7F3" />
      <ellipse cx="200" cy="309" rx="160" ry="30" fill="#fff" stroke="#F3D5E1" strokeWidth="2" />
      <ellipse cx="200" cy="309" rx="120" ry="20" fill="none" stroke="#F3D5E1" strokeWidth="1.5" />

      {/* 1 chocolate base */}
      <Layer progress={p} range={[0.02, 0.16]}>
        <rect x="100" y="256" width="200" height="46" rx="18" fill="#5B3A36" />
        <rect x="112" y="228" width="176" height="42" rx="16" fill="#6E4640" />
        <path d="M134 236v26M162 236v26M190 236v26M218 236v26M246 236v26M272 236v26" stroke="#4A2E2B" strokeWidth="3" strokeLinecap="round" />
      </Layer>

      {/* 2 strawberries */}
      <Layer progress={p} range={[0.22, 0.34]}>
        <Strawberry x={132} y={214} rotate={-14} />
        <Strawberry x={268} y={214} rotate={14} />
        <Strawberry x={200} y={224} />
      </Layer>

      {/* 3 vanilla ice cream */}
      <Layer progress={p} range={[0.42, 0.54]} from={-46}>
        <circle cx="200" cy="184" r="58" fill="#FFF7FB" stroke="#F3D5E1" strokeWidth="3" />
        <path d="M150 204Q200 232 250 204" fill="none" stroke="#F9A8D4" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="180" cy="162" rx="16" ry="9" fill="#fff" opacity=".9" transform="rotate(-25 180 162)" />
      </Layer>

      {/* 4 chocolate sauce */}
      <Layer progress={p} range={[0.62, 0.74]} from={-24}>
        <path
          d="M144 180C148 140 252 140 256 180C248 174 244 198 238 180C232 172 228 206 220 182C212 170 206 200 198 180C190 170 184 202 176 182C168 172 164 196 156 182C152 178 148 184 144 180Z"
          fill="#4A2A2A"
        />
      </Layer>

      {/* 5 cherry and sparkles */}
      <Layer progress={p} range={[0.82, 0.94]} from={-30}>
        <circle cx="200" cy="130" r="13" fill="#E4577F" />
        <path d="M200 118Q204 100 220 96" stroke="#7FA36B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <Sparkle x={86} y={150} s={1} />
        <Sparkle x={318} y={120} s={0.8} />
        <Sparkle x={334} y={222} s={0.6} />
      </Layer>
    </svg>
  );
}
