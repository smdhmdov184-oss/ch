import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, LANGUAGES, DEFAULT_LANGUAGE } from "../data/translations";

const STORAGE_KEY = "site-language";
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): language still works for this session */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
