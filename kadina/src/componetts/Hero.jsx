import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "../components/routing/LocalizedLink";
import { fadeUp, heroSequence, heroWord, staggerFast } from "./motionPresets";

const OffersModal = lazy(() => import("./OffersModal"));

export default function Hero({ t, lang = "ar" }) {
  const [canParallax, setCanParallax] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const titleWords = t.hero.title.trim().split(/\s+/);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setCanParallax(media.matches && !shouldReduceMotion);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [shouldReduceMotion]);

  return (
    <>
      <section className="home-hero relative min-h-[32rem] overflow-hidden bg-[var(--color-surface-dark)] pt-[var(--nav-h)] sm:min-h-[38rem] lg:min-h-[min(82svh,46rem)]" id="home" ref={heroRef}>
      <motion.img
        alt={t.hero.imageAlt}
        className="absolute inset-x-0 bottom-0 h-[calc(100%_-_var(--nav-h))] w-full object-cover object-[58%_center] sm:object-center"
        decoding="async"
        fetchPriority="high"
        loading="eager"
        src="/homeBG.webp"
        style={{ y: canParallax ? backgroundY : 0 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[calc(100%_-_var(--nav-h))] bg-[linear-gradient(180deg,rgba(48,32,18,.06),rgba(48,32,18,.18)_58%,var(--color-surface)_100%)] lg:bg-[linear-gradient(180deg,rgba(48,32,18,.28),rgba(48,32,18,.74))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,var(--color-surface))] lg:h-1/2 lg:bg-[linear-gradient(180deg,transparent,rgba(48,32,18,.55))]" />

      <div className="pointer-events-none absolute inset-y-[20%] left-6 hidden items-center border-s border-[var(--color-border-on-dark)] ps-3 text-[.65rem] font-bold tracking-[.18em] text-[var(--color-text-on-dark-muted)] lg:flex">
        <span className="[writing-mode:vertical-rl]">KADINA MEDICAL CENTER</span>
      </div>
      <div className="pointer-events-none absolute inset-y-[20%] right-6 hidden items-center border-e border-[var(--color-border-on-dark)] pe-3 text-[.65rem] font-bold tracking-[.18em] text-[var(--color-text-on-dark-muted)] lg:flex">
        <span className="[writing-mode:vertical-rl]">RIYADH · EST. 2013</span>
      </div>

      <div className="ds-container relative z-10 hidden min-h-[calc(min(82svh,46rem)-var(--nav-h))] items-center justify-center py-14 lg:flex">
        <motion.div animate="visible" className="mx-auto w-full max-w-4xl text-center" initial={shouldReduceMotion ? false : "hidden"} variants={heroSequence}>
          <motion.p className="text-xs font-black tracking-[.14em] text-[var(--color-accent)] sm:text-sm" variants={fadeUp}>{t.hero.eyebrow}</motion.p>
          <motion.h1 aria-label={t.hero.title} className="on-dark-heading mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[1] tracking-[-.05em] drop-shadow-[0_4px_18px_rgba(48,32,18,.42)]" variants={staggerFast}>
            <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-[.2em]">
              {titleWords.map((word, index) => <motion.span className="inline-block" key={`${word}-${index}`} variants={heroWord}>{word}</motion.span>)}
            </span>
          </motion.h1>
          <motion.p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-[var(--color-accent)] sm:text-base lg:text-lg" variants={fadeUp}>{t.hero.highlight}</motion.p>
          <motion.p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[var(--color-text-on-dark-muted)] sm:text-base sm:leading-8" variants={fadeUp}>{t.hero.description}</motion.p>
          <motion.div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row" variants={fadeUp}>
            <Link className="ds-button ds-button-primary w-full px-6 sm:w-auto sm:min-w-44" to="/booking">
              {lang === "ar" ? "احجز موعدك الآن" : "Book your appointment"}
            </Link>
            <button
              aria-expanded={offersOpen}
              aria-haspopup="dialog"
              className="ds-button ds-button-on-dark w-full border-[var(--color-border-strong)] bg-transparent px-6 text-[var(--color-text-on-dark)] backdrop-blur-sm hover:bg-[var(--color-accent-wash)] sm:w-auto sm:min-w-44"
              onClick={() => setOffersOpen(true)}
              type="button"
            >
              {t.hero.offersCta}
            </button>
          </motion.div>
        </motion.div>
      </div>
      </section>
      {offersOpen ? (
        <Suspense fallback={null}>
          <OffersModal
            lang={lang}
            onClose={() => setOffersOpen(false)}
            open={offersOpen}
            t={t}
          />
        </Suspense>
      ) : null}
    </>
  );
}
