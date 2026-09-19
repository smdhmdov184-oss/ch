import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { scrollToSection } from "../hooks/useScrollAnimation";
import { Logo } from "./Header";
import LanguageSwitcher from "./LanguageSwitcher";

const ITEMS = ["home", "menu", "about", "gallery", "reservation", "location"];

export default function MobileMenu({ open, onClose, activeId }) {
  const { t } = useLanguage();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const go = (id) => {
    onClose();
    // wait one tick so body scroll-lock is released before scrolling
    setTimeout(() => (id === "home" ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToSection(id)), 80);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.mobileNav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col bg-white px-6 pb-8 lg:hidden"
          style={{ minHeight: "100dvh", paddingTop: "max(1rem, env(safe-area-inset-top))" }}
        >
          <div className="flex items-center justify-between py-2">
            <Logo onClick={onClose} />
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.a11y.closeMenu} className="flex h-11 w-11 items-center justify-center rounded-full border border-line">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label={t.a11y.mobileNav} className="mt-8 flex flex-1 flex-col justify-center gap-1">
            {ITEMS.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                aria-current={activeId === id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`border-b border-line py-4 font-display text-4xl font-medium ${activeId === id ? "text-deep" : "text-ink"}`}
              >
                {t.nav[id]}
              </motion.a>
            ))}
          </nav>

          <div className="flex flex-col gap-5 pt-6">
            <button type="button" onClick={() => go("reservation")} className="btn btn-primary w-full">
              {t.cta.reserve}
            </button>
            <LanguageSwitcher className="self-center" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
