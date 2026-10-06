import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import HomeTrustSection from "../components/home/HomeTrustSection";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeNumbersSection from "../components/home/HomeNumbersSection";
import "./HomePage.css";
import HomeContactSection from "../components/home/HomeContactSection";
import HomeBookingSection from "../components/home/HomeBookingSection";
import Seo from "../components/seo/Seo";
import { createWebPageSchema } from "../components/seo/seoUtils";

const HomeDoctorsSection = lazy(
  () => import("../components/home/HomeDoctorsSection"),
);
const BeforeAfter = lazy(() => import("../componetts/BeforAfter"));

const sectionFallback = (
  <div className="min-h-96 bg-[var(--color-surface-muted)]" aria-hidden="true" />
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
          name: lang === "ar" ? "مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض" : "Kadina Medical Center for Dermatology, Aesthetics and Laser in Riyadh",
          description: t.hero.seoDescription ?? t.hero.description,
          path: "/",
        })}
        title={lang === "ar" ? "مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض" : "Kadina Medical Center for Dermatology, Aesthetics and Laser in Riyadh"}
      />
      <div className="kadina-home">
      <Hero t={t} lang={lang} />
      <HomeNumbersSection />
      <HomeTrustSection />
      <Suspense fallback={sectionFallback}>
        <HomeDoctorsSection />
      </Suspense>
      <HomeAboutSection />
      <Suspense fallback={sectionFallback}>
        <BeforeAfter t={t} />
      </Suspense>
      <HomeBookingSection />
      <HomeContactSection />
      </div>
    </>
  );
}
