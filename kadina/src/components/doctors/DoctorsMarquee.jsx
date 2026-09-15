import { useId, useState } from "react";
import Link from "../routing/LocalizedLink";

function DoctorCard({ doctor, lang, duplicate }) {
  return (
    <li className="w-[var(--doctor-width)] shrink-0">
      <Link
        className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-accent)]"
        tabIndex={duplicate ? -1 : undefined}
        onMouseDown={duplicate ? event => event.preventDefault() : undefined}
        to={`/doctors/${doctor.slug}`}
      >
        <div className="aspect-[4/5] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          {doctor.image ? (
            <img alt={duplicate ? "" : doctor.name} className="h-full w-full object-cover object-top" decoding="async" height="1440" loading="lazy" src={doctor.image} width="1080" />
          ) : (
            <div className="doctor-portrait-placeholder flex h-full items-center justify-center p-6 text-center" role="img" aria-label={lang === "ar" ? `صورة تعريفية بديلة للطبيبة ${doctor.name}` : `Portrait placeholder for ${doctor.name}`}>
              <span className="text-xl font-bold text-[var(--color-accent)]">{doctor.name}</span>
            </div>
          )}
        </div>
        <div className="border-b border-[var(--color-border)] py-4">
          <h3 className="text-[clamp(1.125rem,1.5vw,1.375rem)] font-bold leading-snug text-[var(--color-heading)]">{doctor.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{doctor.specialty}</p>
        </div>
      </Link>
    </li>
  );
}

// Shared from the existing home rail; the CSS loop remains the single implementation.
export default function DoctorsMarquee({ doctors, lang, autoplay = true, leadingControl }) {
  const id = useId();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {autoplay && <div className="ds-container">
        <div className={leadingControl ? "mt-6 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4" : "flex justify-end"}>
          {leadingControl}
          <button aria-controls={id} aria-pressed={paused} className="min-h-11 px-3 text-sm font-bold text-[var(--color-accent)] motion-reduce:hidden" onClick={() => setPaused(value => !value)} type="button">
            {paused ? (lang === "ar" ? "استئناف الحركة" : "Resume motion") : (lang === "ar" ? "إيقاف الحركة" : "Pause motion")}
          </button>
        </div>
      </div>}
      <div
        aria-label={lang === "ar" ? "أطباء كادينا" : "Kadina doctors"}
        className="doctors-marquee mt-7 overflow-x-hidden focus-within:overflow-x-auto motion-reduce:overflow-x-auto overscroll-x-contain [scrollbar-width:thin] [--doctor-gap:1rem] [--doctor-width:62vw] sm:[--doctor-gap:1.5rem] sm:[--doctor-width:36vw] lg:[--doctor-width:23vw] 2xl:[--doctor-width:20rem]"
        dir="ltr"
        data-paused={paused || interacting || hovered}
        data-static={!autoplay || undefined}
        onFocus={event => {
          event.target.closest("a")?.scrollIntoView({
            behavior: "instant",
            block: "nearest",
            inline: "nearest",
          });
        }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.scrollLeft = 0;
        }}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        onPointerCancel={() => setInteracting(false)}
        onPointerLeave={() => { setInteracting(false); setHovered(false); }}
        role="region"
      >
        <div className="doctors-marquee-track flex w-max" dir="ltr" id={id}>
          {(autoplay ? [false, true] : [false]).map(duplicate => (
            <ul aria-hidden={duplicate || undefined} className="flex shrink-0 gap-[var(--doctor-gap)] pe-[var(--doctor-gap)]" data-marquee-copy={duplicate ? "true" : undefined} dir={lang === "ar" ? "rtl" : "ltr"} key={String(duplicate)}>
              {doctors.map(doctor => <DoctorCard doctor={doctor} duplicate={duplicate} key={doctor.slug} lang={lang} />)}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
