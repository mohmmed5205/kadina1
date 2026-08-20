import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, heroSequence, heroWord, staggerFast } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";
import MagneticButton from "../components/motion/MagneticButton";

const OffersModal = lazy(() => import("./OffersModal"));
const MotionLink = motion.create(Link);
export default function Hero({ t, lang = "ar" }) {
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [canParallax, setCanParallax] = useState(false);
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
        className="relative min-h-[88svh] overflow-hidden bg-[var(--color-surface-dark)] pt-[calc(var(--nav-h,4.25rem)+env(safe-area-inset-top))] sm:min-h-[92svh] lg:min-h-screen"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -inset-y-[7%] inset-x-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/homeBG.webp')",
            y: canParallax ? backgroundY : 0,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[var(--color-surface-dark)]"
          style={{ opacity: shouldReduceMotion ? 0.28 : overlayOpacity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(48,32,18,.82)_0%,rgba(48,32,18,.48)_44%,rgba(48,32,18,.12)_78%,rgba(48,32,18,.18)_100%)] rtl:bg-[linear-gradient(270deg,rgba(48,32,18,.82)_0%,rgba(48,32,18,.48)_44%,rgba(48,32,18,.12)_78%,rgba(48,32,18,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-surface-dark)]/70 to-transparent" />

        <div className="ds-container relative z-10 flex min-h-[calc(88svh-var(--nav-h,4.25rem))] items-end pb-10 pt-16 sm:min-h-[calc(92svh-var(--nav-h,4.25rem))] sm:pb-16 lg:min-h-[calc(100vh-var(--nav-h,5rem))] lg:items-end lg:pb-20 lg:pt-28">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={heroSequence}
            className="w-full min-w-0 max-w-[52rem] text-start"
          >
            <motion.img
              variants={fadeUp}
              src="/kadina-logo3.webp"
              alt=""
              decoding="async"
              height="284"
              width="284"
              className="mb-8 hidden h-24 w-auto object-contain sm:block lg:h-28"
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
              className="on-dark-heading mt-5 max-w-full break-words text-[clamp(2.65rem,10vw,6.5rem)] font-black leading-[1.02] tracking-[-0.045em] drop-shadow-[0_3px_14px_rgba(43,27,8,0.4)] lg:mt-7"
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
              className="mt-4 text-base font-bold leading-7 text-[var(--color-accent)] drop-shadow-[0_2px_8px_rgba(43,27,8,0.35)] sm:text-lg md:text-xl"
            >
              {t.hero.highlight}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-4 line-clamp-3 max-w-xl text-base leading-7 text-[var(--color-text-on-dark-muted)] drop-shadow-[0_2px_8px_rgba(43,27,8,0.3)] sm:mt-5 sm:line-clamp-none md:text-lg lg:mt-6"
            >
              {t.hero.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerFast}
              className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center lg:mt-9"
            >
              <motion.div className="w-full sm:w-auto" variants={fadeUp}>
                <MagneticButton className="w-full sm:w-auto">
                  <motion.a href={whatsappUrl} aria-label={`${t.hero.primaryCta} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`} target="_blank" rel="noopener noreferrer" className="ds-button ds-button-primary w-full px-6 py-3.5 sm:w-auto lg:px-8 lg:py-4" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>{t.hero.primaryCta}</motion.a>
                </MagneticButton>
              </motion.div>
              <motion.div className="flex w-full sm:w-auto" variants={fadeUp}>
                <MotionLink to="/#services" className="ds-button ds-button-on-dark w-full bg-[rgba(255,250,242,0.1)] px-6 py-3.5 backdrop-blur-md sm:w-auto lg:px-8 lg:py-4" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>{t.hero.secondaryCta}</MotionLink>
              </motion.div>
              <motion.div className="flex w-full sm:w-auto" variants={fadeUp}>
                <motion.button type="button" onClick={() => setIsOffersOpen(true)} className="inline-flex min-h-12 w-full items-center justify-center px-4 py-3 text-center text-sm font-bold text-[var(--color-text-on-dark-muted)] underline decoration-[var(--color-accent)]/60 underline-offset-8 transition-colors hover:text-[var(--color-text-on-dark)] sm:w-auto" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>{t.hero.offersCta}</motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {!shouldReduceMotion && canParallax && (
          <motion.div
            aria-hidden="true"
            className="absolute bottom-7 start-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[#fff7eb] rtl:translate-x-1/2"
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

      {isOffersOpen && (
        <Suspense fallback={null}>
          <OffersModal
            open
            onClose={() => setIsOffersOpen(false)}
            lang={lang}
            t={t}
          />
        </Suspense>
      )}
    </>
  );
}
