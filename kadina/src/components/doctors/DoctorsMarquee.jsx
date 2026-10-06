import { useEffect, useRef } from "react";
import Link from "../routing/LocalizedLink";

function DoctorCard({ doctor, lang, duplicate }) {
  return (
    <li className="w-[var(--doctor-width)] shrink-0" dir={lang === "ar" ? "rtl" : "ltr"}>
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

// Native scrolling keeps touch, keyboard and automatic motion on the same track.
export default function DoctorsMarquee({ doctors, lang, autoplay = true, leadingControl }) {
  const railRef = useRef(null);
  const interaction = useRef({ hovered: false, focused: false, touching: false, until: 0 });
  const drag = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let last = 0;
    let position = rail.scrollLeft;
    const tick = now => {
      const state = interaction.current;
      const paused = state.hovered || state.focused || state.touching || now < state.until;
      const distance = rail.querySelector("ul")?.getBoundingClientRect().width || 0;
      if (autoplay && !reduced.matches && !paused && distance > 0) {
        position += Math.min(now - (last || now), 50) * 0.016;
        if (position >= distance) position -= distance;
        rail.scrollLeft = position;
      } else position = rail.scrollLeft;
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, doctors.length]);

  const release = () => {
    interaction.current.touching = false;
    interaction.current.until = performance.now() + 1200;
    drag.current = null;
  };

  return (
    <>
      {leadingControl && <div className="ds-container">{leadingControl}</div>}
      <div
        aria-label={lang === "ar" ? "أطباء كادينا" : "Kadina doctors"}
        className="kadina-doctor-rail"
        data-static={!autoplay || undefined}
        data-lenis-prevent
        dir="ltr"
        ref={railRef}
        role="region"
        tabIndex={0}
        onFocus={() => { interaction.current.focused = true; }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.current.focused = false; }}
        onPointerEnter={event => { if (event.pointerType === "mouse") interaction.current.hovered = true; }}
        onPointerLeave={event => {
          interaction.current.hovered = false;
          if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) release();
        }}
        onPointerDown={event => {
          interaction.current.touching = true;
          if (event.pointerType === "mouse") drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={event => {
          if (!drag.current) return;
          const delta = event.clientX - drag.current.x;
          if (Math.abs(delta) > 5) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.scrollLeft = drag.current.scroll - delta;
          }
        }}
        onClickCapture={event => {
          if (interaction.current.dragged) { event.preventDefault(); interaction.current.dragged = false; }
        }}
        onPointerUp={() => { interaction.current.dragged = drag.current?.moved; release(); }}
        onPointerCancel={event => { if (event.pointerType !== "touch") release(); }}
        onLostPointerCapture={event => { if (event.pointerType !== "touch") release(); }}
        onDragStart={event => event.preventDefault()}
        onWheel={() => { interaction.current.until = performance.now() + 1200; }}
        onTouchStart={() => { interaction.current.touching = true; }}
        onTouchEnd={release}
        onTouchCancel={release}
      >
        <div className="kadina-doctor-track">
          {(autoplay ? [false, true] : [false]).map(duplicate => (
            <ul aria-hidden={duplicate || undefined} className="kadina-doctor-group" data-marquee-copy={duplicate ? "true" : undefined} dir="ltr" key={String(duplicate)}>
              {doctors.map(doctor => <DoctorCard doctor={doctor} duplicate={duplicate} key={doctor.slug} lang={lang} />)}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
