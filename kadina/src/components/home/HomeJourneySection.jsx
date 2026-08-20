import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeJourneySection() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches
    ) {
      return undefined;
    }

    let disposed = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (disposed) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
                end: "bottom 62%",
                scrub: 0.45,
              },
            },
          );

          sectionRef.current?.querySelectorAll("[data-journey-step]").forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 68%",
              end: "bottom 35%",
              toggleClass: "is-active",
            });
          });
        }, sectionRef);

        cleanup = () => context.revert();
        ScrollTrigger.refresh();
      },
    );

    return () => {
      disposed = true;
      cleanup();
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="ds-section bg-[var(--color-surface-muted)]">
      <div className="ds-container">
        <SectionTitle title={lang === "ar" ? "رحلتك في كادينا" : "Your Journey at Kadina"} />
        <motion.ol
          className="journey-list relative mt-9 grid gap-0 sm:mt-12 lg:grid-cols-4"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <span aria-hidden="true" className="journey-track" />
          <span ref={progressRef} aria-hidden="true" className="journey-progress" />
          {homePageContent.journey.map((step, index) => (
            <motion.li
              className="journey-step relative border-b border-[var(--color-border)] bg-transparent px-4 py-7 last:border-b-0 sm:py-9 lg:border-b-0 lg:border-e lg:px-8 lg:last:border-e-0"
              data-journey-step
              key={`journey-step-${index}`}
              variants={cardItem}
            >
              <span className="text-5xl font-black tracking-[-0.06em] text-[var(--color-accent-strong)] sm:text-6xl lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-black text-[var(--color-heading)]">
                {step.title}
              </h3>
              <p className="mt-3 leading-8 text-[var(--color-text-muted)]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
