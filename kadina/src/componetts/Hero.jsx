import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { fadeUp, heroSequence, heroWord, staggerFast } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";
import MagneticButton from "../components/motion/MagneticButton";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  trackContactAction,
} from "../utils/analytics";

const OffersModal = lazy(() => import("./OffersModal"));

export default function Hero({ t, lang = "ar" }) {
  const [canParallax, setCanParallax] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.28, 0.38]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleWords = t.hero.title.trim().split(/\s+/);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setCanParallax(media.matches && !shouldReduceMotion);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [shouldReduceMotion]);
  const whatsappUrl = createWhatsappUrl(
    lang === "ar"
      ? "مرحبًا، أرغب في حجز استشارة في مركز كادينا."
      : "Hello, I would like to book a consultation at Kadina Center.",
  );

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        className="home-hero relative min-h-[88svh] overflow-hidden bg-[var(--color-surface-dark)] sm:min-h-[92svh] lg:min-h-screen"
      >
        <motion.img
          alt={t.hero.imageAlt}
          className="absolute -inset-y-[7%] h-[114%] w-full object-cover object-[58%_center] sm:object-center"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          src="/homeBG.webp"
          style={{
            y: canParallax ? backgroundY : 0,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[var(--color-surface-dark)]"
          style={{ opacity: shouldReduceMotion ? 0.28 : overlayOpacity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(48,32,18,.92)_0%,rgba(48,32,18,.66)_45%,rgba(48,32,18,.14)_82%)] rtl:bg-[linear-gradient(270deg,rgba(48,32,18,.92)_0%,rgba(48,32,18,.66)_45%,rgba(48,32,18,.14)_82%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,32,18,.32)_0%,transparent_30%,rgba(48,32,18,.58)_100%)]" />

        <div className="ds-container relative z-10 flex min-h-[88svh] items-end pb-12 pt-[calc(var(--nav-h,4.25rem)+3rem)] sm:min-h-[92svh] sm:pb-16 lg:min-h-screen lg:pb-[clamp(5rem,10vh,8rem)]">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={heroSequence}
            className="w-full min-w-0 max-w-[60rem] text-start"
          >
            <motion.img
              variants={fadeUp}
              src="/kadina-logo3.webp"
              alt=""
              decoding="async"
              height="284"
              width="284"
              className="mb-8 hidden h-20 w-auto object-contain sm:block lg:mb-10 lg:h-24"
              style={{
                filter:
                  "drop-shadow(0 6px 16px rgba(48,32,18,0.24))",
              }}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/kadina-logo.webp";
              }}
            />

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center border-s border-[var(--color-accent)] ps-3 text-xs font-bold tracking-[0.08em] text-[var(--color-text-on-dark-muted)] sm:text-sm"
            >
              {t.hero.eyebrow}
            </motion.div>

            {/* Title */}
            <motion.h1
              aria-label={t.hero.title}
              className="on-dark-heading mt-5 max-w-[56rem] break-words text-[clamp(3rem,10vw,7.25rem)] font-black leading-[.96] tracking-[-0.055em] drop-shadow-[0_3px_14px_rgba(43,27,8,0.4)] lg:mt-7"
              variants={staggerFast}
            >
              <span aria-hidden="true" className="flex flex-wrap gap-x-[0.22em]">
                {titleWords.map((word, index) => (
                  <motion.span
                    className="inline-block"
                    key={`hero-word-${index}`}
                    variants={heroWord}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Highlight */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base font-bold leading-7 text-[var(--color-accent)] drop-shadow-[0_2px_8px_rgba(43,27,8,0.35)] sm:text-lg md:text-xl lg:mt-7"
            >
              {t.hero.highlight}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-4 line-clamp-3 max-w-2xl text-base leading-7 text-[var(--color-text-on-dark-muted)] drop-shadow-[0_2px_8px_rgba(43,27,8,0.3)] sm:mt-5 sm:line-clamp-none md:text-lg lg:leading-8"
            >
              {t.hero.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerFast}
              className="mt-7 flex w-full flex-wrap gap-3 sm:mt-9 lg:mt-10"
            >
              <motion.div className="w-full sm:w-auto" variants={fadeUp}>
                <MagneticButton className="w-full sm:w-auto">
                  <motion.a href={whatsappUrl} aria-label={`${t.hero.primaryCta} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`} target="_blank" rel="noopener noreferrer" className="ds-button ds-button-primary w-full px-7 py-4 sm:w-auto lg:px-9" onClick={() => trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, { language: lang, page_type: "home", source_section: SOURCE_SECTIONS.HERO })} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>{t.hero.primaryCta}</motion.a>
                </MagneticButton>
              </motion.div>
              <motion.div className="w-full sm:w-auto" variants={fadeUp}>
                <motion.button
                  aria-expanded={offersOpen}
                  aria-haspopup="dialog"
                  className="ds-button ds-button-secondary w-full border-white/45 bg-white/10 px-7 py-4 text-white backdrop-blur-sm hover:bg-white/15 sm:w-auto lg:px-9"
                  onClick={() => setOffersOpen(true)}
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.hero.offersCta}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute bottom-3 end-[var(--page-gutter)] z-20 flex flex-col items-center gap-2 text-[#fff7eb] sm:bottom-7"
            style={{ opacity: indicatorOpacity }}
          >
            <span className="h-8 w-px overflow-hidden bg-white/30">
              <motion.span
                className="block h-3 w-px bg-[#f8aa2d]"
                animate={{ y: [0, 22] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              />
            </span>
          </motion.div>
        )}
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
