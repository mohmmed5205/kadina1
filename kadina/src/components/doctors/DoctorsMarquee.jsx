import { useId, useRef, useState } from "react";
import Link from "../routing/LocalizedLink";

function DoctorCard({ doctor, lang, duplicate }) {
  return (
    <li className="w-[var(--doctor-width)] shrink-0">
      <Link
        aria-hidden={duplicate || undefined}
        className={`group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--color-accent)] ${duplicate ? "pointer-events-none select-none" : ""}`}
        tabIndex={duplicate ? -1 : undefined}
        to={`/doctors/${doctor.slug}`}
      >
        <div className="aspect-[4/5] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          {doctor.image ? (
            <img
              alt={duplicate ? "" : doctor.name}
              className="h-full w-full object-cover object-top"
              decoding="async"
              height="1440"
              loading="lazy"
              src={doctor.image}
              width="1080"
            />
          ) : (
            <div
              aria-label={
                lang === "ar"
                  ? `صورة تعريفية بديلة للطبيبة ${doctor.name}`
                  : `Portrait placeholder for ${doctor.name}`
              }
              className="doctor-portrait-placeholder flex h-full items-center justify-center p-6 text-center"
              role="img"
            >
              <span className="text-xl font-bold text-[var(--color-accent)]">
                {doctor.name}
              </span>
            </div>
          )}
        </div>

        <div className="border-b border-[var(--color-border)] py-4">
          <h3 className="text-[clamp(1.125rem,1.5vw,1.375rem)] font-bold leading-snug text-[var(--color-heading)]">
            {doctor.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            {doctor.specialty}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function DoctorsMarquee({
  doctors,
  lang,
  autoplay = true,
  leadingControl,
}) {
  const id = useId();
  const resumeTimer = useRef(null);
  const [interacting, setInteracting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const stopResumeTimer = () => {
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const pauseForInteraction = () => {
    stopResumeTimer();
    setInteracting(true);
  };

  const resumeAfterInteraction = (delay = 900) => {
    stopResumeTimer();
    resumeTimer.current = window.setTimeout(() => {
      setInteracting(false);
      resumeTimer.current = null;
    }, delay);
  };

  return (
    <>
      {leadingControl && (
        <div className="ds-container">
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
            {leadingControl}
          </div>
        </div>
      )}

      <div
        aria-label={lang === "ar" ? "أطباء كادينا" : "Kadina doctors"}
        className="doctors-marquee mt-7 cursor-grab overscroll-x-contain active:cursor-grabbing [--doctor-gap:1rem] [--doctor-width:62vw] sm:[--doctor-gap:1.5rem] sm:[--doctor-width:36vw] lg:[--doctor-width:23vw] 2xl:[--doctor-width:20rem]"
        data-paused={interacting || hovered || undefined}
        data-static={!autoplay || undefined}
        dir="ltr"
        id={id}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.scrollLeft = 0;
            resumeAfterInteraction(500);
          }
        }}
        onFocus={(event) => {
          pauseForInteraction();
          event.target.closest("a")?.scrollIntoView({
            behavior: "instant",
            block: "nearest",
            inline: "nearest",
          });
        }}
        onPointerCancel={() => resumeAfterInteraction()}
        onPointerDown={pauseForInteraction}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false);
          resumeAfterInteraction(500);
        }}
        onPointerUp={() => resumeAfterInteraction()}
        onScroll={() => {
          pauseForInteraction();
          resumeAfterInteraction(1100);
        }}
        role="region"
      >
        <div className="doctors-marquee-track flex w-max" dir="ltr">
          {(autoplay ? [false, true] : [false]).map((duplicate) => (
            <ul
              aria-hidden={duplicate || undefined}
              className="flex shrink-0 gap-[var(--doctor-gap)] pe-[var(--doctor-gap)]"
              data-marquee-copy={duplicate ? "true" : undefined}
              dir={lang === "ar" ? "rtl" : "ltr"}
              key={String(duplicate)}
            >
              {doctors.map((doctor) => (
                <DoctorCard
                  doctor={doctor}
                  duplicate={duplicate}
                  key={doctor.slug}
                  lang={lang}
                />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
