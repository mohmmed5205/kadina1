import { useState, useEffect } from "react";
import Navbar from "./componetts/Navbar";
import Hero from "./componetts/Hero";
import About from "./componetts/About";
import Services from "./componetts/Services";
import WhyUs from "./componetts/WhyUs";
import Stats from "./componetts/Stats";
import Gallery from "./componetts/Gallery";
import BeforeAfter from "./componetts/BeforAfter";
import Reviews from "./componetts/Reviews";
import Connect from "./componetts/Connect";
import Bottom from "./componetts/Bottom";
import Doctors from "./componetts/Doctors";
import { content } from "./data/content";

/* ── Global reveal observer ───────────────────────────────────
   Adds .revealed to any element that has .reveal or .reveal-stagger
   when it enters the viewport.
   ─────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return; // CSS handles this via media query

    const targets = document.querySelectorAll(".reveal, .reveal-stagger");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // Fire once
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
  // Re-run on every render so new sections after lang change also get observed
}

export default function App() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];

  useReveal();

  return (
    <main
      dir={t.dir}
      className="min-h-screen overflow-x-hidden bg-[#fff7eb] text-[#4c2c00]"
    >
      <Navbar
        t={t}
        lang={lang}
        onLanguageToggle={() => setLang(lang === "ar" ? "en" : "ar")}
      />
      <Hero t={t} />
      <About t={t} />
      <Services t={t} />
      <Doctors lang={lang} />
      <WhyUs t={t} />
      <Stats t={t} />
      <Gallery t={t} />
      <BeforeAfter t={t} />
      <Reviews t={t} />
      <Connect t={t} />
      <Bottom t={t} />
    </main>
  );
}
