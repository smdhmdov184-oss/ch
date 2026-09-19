import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteConfig, isConfigured } from "../config/siteConfig";
import { hasWhatsapp, reservationMessage, whatsappUrl } from "../config/links";
import MagneticButton from "./MagneticButton";

const EMPTY = { name: "", phone: "", date: "", time: "", guests: "", message: "" };
const GUEST_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));

const todayLocal = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in the visitor's timezone

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "name";
  if (!/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim()) || v.phone.replace(/\D/g, "").length < 7) e.phone = "phone";
  if (!v.date || v.date < todayLocal()) e.date = "date";
  if (!v.time) e.time = "time";
  if (!v.guests) e.guests = "guests";
  return e;
}

function Field({ id, label, error, errorText, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-deep">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          {errorText}
        </p>
      )}
    </div>
  );
}

export default function Reservation() {
  const { t } = useLanguage();
  const r = t.reservation;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | ready | sent | failed

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };
  const aria = (key) => ({
    id: `res-${key}`,
    "aria-invalid": errors[key] ? "true" : "false",
    "aria-describedby": errors[key] ? `res-${key}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(`res-${firstKey}`)?.focus();
      return;
    }

    if (isConfigured(siteConfig.reservationEndpoint)) {
      setStatus("sending");
      try {
        const res = await fetch(siteConfig.reservationEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        setStatus(res.ok ? "sent" : "failed");
      } catch {
        setStatus("failed");
      }
      return;
    }
    setStatus("ready"); // no backend: never claim the table is booked
  };

  const waHref = whatsappUrl(reservationMessage(t, values));
  const directWa = whatsappUrl(t.wa.reserve);
  const showForm = status === "idle" || status === "sending" || status === "failed";

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="section-y relative overflow-hidden bg-blush/40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-petal/30 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">{r.eyebrow}</p>
          <h2 id="reservation-title" className="display mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
            {r.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{r.intro}</p>
          {directWa && (
            <a href={directWa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {r.directWhatsapp}
            </a>
          )}
        </div>

        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(201,130,141,0.7)] sm:p-9">
          {showForm ? (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              {Object.keys(errors).some((k) => errors[k]) && (
                <p role="alert" className="flex items-center gap-2 rounded-2xl bg-blush px-4 py-3 text-sm font-medium text-deep sm:col-span-2">
                  <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {r.errors.summary}
                </p>
              )}
              {status === "failed" && (
                <p role="alert" className="flex items-center gap-2 rounded-2xl bg-blush px-4 py-3 text-sm font-medium text-deep sm:col-span-2">
                  <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {r.failed}
                </p>
              )}

              <Field id="res-name" label={r.fields.name} error={errors.name} errorText={r.errors.name}>
                <input {...aria("name")} type="text" autoComplete="name" value={values.name} onChange={set("name")} placeholder={r.placeholders.name} className="field" />
              </Field>
              <Field id="res-phone" label={r.fields.phone} error={errors.phone} errorText={r.errors.phone}>
                <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} placeholder={r.placeholders.phone} className="field" />
              </Field>
              <Field id="res-date" label={r.fields.date} error={errors.date} errorText={r.errors.date}>
                <input {...aria("date")} type="date" min={todayLocal()} value={values.date} onChange={set("date")} className="field" />
              </Field>
              <Field id="res-time" label={r.fields.time} error={errors.time} errorText={r.errors.time}>
                <input {...aria("time")} type="time" value={values.time} onChange={set("time")} className="field" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="res-guests" label={r.fields.guests} error={errors.guests} errorText={r.errors.guests}>
                  <select {...aria("guests")} value={values.guests} onChange={set("guests")} className="field">
                    <option value="" disabled>
                      —
                    </option>
                    {GUEST_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {r.guestsOption.replace("{n}", n)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="res-message" label={r.fields.message}>
                  <textarea id="res-message" rows={3} value={values.message} onChange={set("message")} placeholder={r.placeholders.message} className="field resize-none" />
                </Field>
              </div>
              <MagneticButton as="button" type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:col-span-2">
                {status === "sending" ? r.sending : r.submit}
              </MagneticButton>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} role="status" className="py-4">
              <CheckCircle2 aria-hidden="true" className="h-9 w-9 text-gold" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-3xl font-medium">{status === "sent" ? r.sentTitle : r.readyTitle}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                {status === "sent" ? r.sentText : hasWhatsapp() ? r.readyWhatsapp : r.notConnected}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {status === "ready" && waHref && (
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    {r.sendWhatsapp}
                  </a>
                )}
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost">
                  {r.edit}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
