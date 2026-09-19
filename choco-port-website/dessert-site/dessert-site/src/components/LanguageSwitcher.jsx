import { LANGUAGES } from "../data/translations";
import { useLanguage } from "../hooks/useLanguage";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.a11y.language} className={`inline-flex items-center gap-1 text-xs font-semibold tracking-widest ${className}`}>
      {LANGUAGES.map((code, i) => (
        <span key={code} className="inline-flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-line">|</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            lang={code}
            className={`min-h-[36px] min-w-[36px] rounded-full px-2 uppercase transition-colors ${
              lang === code ? "bg-blush text-deep underline decoration-rose decoration-2 underline-offset-4" : "text-muted hover:text-ink"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
