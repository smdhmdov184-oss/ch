import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import { useActiveSection } from "./hooks/useScrollAnimation";
import SeoHead from "./components/SeoHead";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import ScrollShowcase from "./components/ScrollShowcase";
import Ingredients from "./components/Ingredients";
import MenuSection from "./components/MenuSection";
import FeaturedProduct from "./components/FeaturedProduct";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reservation from "./components/Reservation";
import Location from "./components/Location";
import Footer from "./components/Footer";

const NAV_SECTION_IDS = ["home", "menu", "about", "gallery", "reservation", "location"];

function Site() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <SeoHead />
      <a href="#main" className="sr-only z-[100] rounded-full bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t.a11y.skip}
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Header activeId={activeId} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
      <main id="main">
        <Hero />
        <ScrollShowcase />
        <Ingredients />
        <MenuSection />
        <FeaturedProduct />
        <About />
        <Gallery />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Site />
      </LanguageProvider>
    </MotionConfig>
  );
}
