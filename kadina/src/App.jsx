import { useState } from "react";
import Navbar from "./componetts/Navbar";
import Hero from "./componetts/Hero";
import About from "./componetts/About";
import Services from "./componetts/Services";
import WhyUs from "./componetts/WhyUs";
import Stats from "./componetts/Stats";
import Gallery from "./componetts/Gallery";
import BeforeAfter from "./componetts/BeforAfter";
import Reviews from "./componetts/Reviews";
import Contact from "./componetts/Contact";
import Footer from "./componetts/Footer";
import { content } from "./data/content";

export default function App() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];

  return (
    <main dir={t.dir} className="min-h-screen overflow-hidden bg-[#fff7eb] text-[#4c2c00]">
      <Navbar t={t} lang={lang} onLanguageToggle={() => setLang(lang === "ar" ? "en" : "ar")} />
      <Hero t={t} />
      <About t={t} />
      <Services t={t} />
      <WhyUs t={t} />
      <Stats t={t} />
      <Gallery t={t} />
      <BeforeAfter t={t} />
      <Reviews t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  );
}
