import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import HomeNumbersSection from "../components/home/HomeNumbersSection";
import HomeTrustSection from "../components/home/HomeTrustSection";
import HomeDoctorsSection from "../components/home/HomeDoctorsSection";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeBookingSection from "../components/home/HomeBookingSection";
import Seo from "../components/seo/Seo";
import { createWebPageSchema } from "../components/seo/seoUtils";

const BeforeAfter = lazy(() => import("../componetts/BeforAfter"));

const sectionFallback = (
  <div className="min-h-72 bg-[var(--color-surface)]" aria-hidden="true" />
);

export default function HomePage() {
  const { lang, t } = useOutletContext();

  return (
    <>
      <Seo
        canonicalPath="/"
        description={t.hero.seoDescription ?? t.hero.description}
        image="/homeBG.webp"
        jsonLd={createWebPageSchema({
          name:
            lang === "ar"
              ? "مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض"
              : "Kadina Medical Center for Dermatology, Aesthetics and Laser in Riyadh",
          description: t.hero.seoDescription ?? t.hero.description,
          path: "/",
        })}
        title={
          lang === "ar"
            ? "مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض"
            : "Kadina Medical Center for Dermatology, Aesthetics and Laser in Riyadh"
        }
      />

      {/* Symphony-inspired home flow using Kadina content only:
          visual hero → numbers → about/building → doctors → why → help/booking → before/after → footer */}
      <Hero t={t} lang={lang} />
      <HomeNumbersSection />
      <HomeTrustSection />
      <HomeDoctorsSection />
      <HomeAboutSection />
      <HomeBookingSection />
      <Suspense fallback={sectionFallback}>
        <BeforeAfter t={t} />
      </Suspense>
    </>
  );
}
