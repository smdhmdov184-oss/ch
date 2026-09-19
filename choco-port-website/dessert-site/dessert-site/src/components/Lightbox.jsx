import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import ImageWithFallback from "./ImageWithFallback";

export default function Lightbox({ images, index, onClose, onChange }) {
  const { lang, t } = useLanguage();
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const total = images.length;
  const image = images[index];

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const buttons = Array.from(document.querySelectorAll("#lightbox button"));
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const navBtn = "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white";

  return (
    <motion.div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
      style={{ height: "100dvh" }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
        <p className="text-sm" aria-live="polite">
          {t.gallery.counter.replace("{n}", index + 1).replace("{total}", total)}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className={navBtn}>
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
        <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label={t.gallery.prev} className={`${navBtn} absolute left-3 z-10 hidden sm:flex`}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <motion.div key={image.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-full items-center justify-center">
          <ImageWithFallback src={image.src} alt={image.alt[lang]} className="max-h-[78dvh] max-w-full rounded-2xl object-contain" eager />
        </motion.div>
        <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label={t.gallery.next} className={`${navBtn} absolute right-3 z-10 hidden sm:flex`}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {/* mobile buttons under the image (swipe also works) */}
      <div className="flex items-center justify-center gap-6 py-4 sm:hidden" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label={t.gallery.prev} className={navBtn}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label={t.gallery.next} className={navBtn}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}
