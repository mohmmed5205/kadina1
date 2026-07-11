import { useEffect, useState } from "react";
import Navbar from "./componetts/Navbar";
import Hero from "./componetts/Hero";
import About from "./componetts/About";
import Services from "./componetts/Services";
// import Offers from "./componetts/Offers";
import WhyUs from "./componetts/WhyUs";
// import Gallery from "./componetts/Gallery";
import BeforeAfter from "./componetts/BeforAfter";
import Connect from "./componetts/Connect";
import Location from "./componetts/Location";
import Bottom from "./componetts/Bottom";
import Doctors from "./componetts/Doctors";
import Devices from "./componetts/Devices";
import { content } from "./data/content";

export default function App() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

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
      <Hero t={t} lang={lang} />
      <About t={t} />
      <Services t={t} lang={lang} />
      {/* <Offers lang={lang} t={t} /> */}
      <Doctors lang={lang} />
      <Devices lang={lang} />
      <WhyUs t={t} />
      {/* <Gallery t={t} /> */}
      <BeforeAfter t={t} />
      <Connect t={t} />
      <Location t={t} />
      <Bottom t={t} />
    </main>
  );
}
