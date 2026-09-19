import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useScrolled, scrollToSection } from "../hooks/useScrollAnimation";
import { siteConfig } from "../config/siteConfig";
import LanguageSwitcher from "./LanguageSwitcher";
import MagneticButton from "./MagneticButton";

export const DESKTOP_NAV = ["menu", "about", "gallery", "reservation", "location"];

export function Logo({ onClick, className = "" }) {
  const { t } = useLanguage();
  return (
    <a
      href="#home"
      aria-label={`${siteConfig.restaurantName}: ${t.a11y.home}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`font-display text-2xl font-semibold tracking-tight text-ink ${className}`}
    >
      {siteConfig.restaurantName}
    </a>
  );
}

export default function Header({ activeId, onOpenMenu, menuOpen }) {
  const { t } = useLanguage();
  const scrolled = useScrolled(40);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "mt-2 border-line bg-white/80 py-1.5 shadow-[0_8px_30px_-18px_rgba(201,130,141,0.6)] backdrop-blur-xl"
            : "mt-4 border-transparent bg-white/30 py-3 backdrop-blur-md"
        }`}
      >
        <Logo />

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-1 lg:flex">
          {DESKTOP_NAV.map((id) => {
            const active = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "text-deep" : "text-muted hover:text-ink"}`}
              >
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-blush" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {t.nav[id]}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <MagneticButton as="a" href="#reservation" onClick={(e) => { e.preventDefault(); scrollToSection("reservation"); }} className="btn btn-primary hidden !min-h-[42px] !px-5 lg:inline-flex">
            {t.cta.reserve}
          </MagneticButton>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t.a11y.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
