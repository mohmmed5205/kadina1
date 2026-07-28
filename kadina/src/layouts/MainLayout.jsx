import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Outlet } from "react-router-dom";
import Navbar from "../componetts/Navbar";
import Bottom from "../componetts/Bottom";
import ScrollToHash from "../components/common/ScrollToHash";
import { content } from "../data/content";

export default function MainLayout() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={t.dir}
        className="min-h-screen overflow-x-hidden bg-[#f8ead8] text-[#4c2c00]"
      >
        <ScrollToHash />
        <a
          className="fixed start-4 top-3 z-[10000] -translate-y-24 rounded-full bg-[#2b1b08] px-5 py-3 font-black text-[#fff7eb] shadow-lg transition-transform focus:translate-y-0"
          href="#main-content"
        >
          تخطَّ إلى المحتوى
        </a>
        <Navbar
          t={t}
          lang={lang}
          onLanguageToggle={() => setLang(lang === "ar" ? "en" : "ar")}
        />
        <main id="main-content" tabIndex="-1">
          <Outlet context={{ lang, t }} />
        </main>
        <Bottom lang={lang} t={t} />
      </div>
    </MotionConfig>
  );
}
