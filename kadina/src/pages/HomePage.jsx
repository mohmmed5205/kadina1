import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import HomeTrustSection from "../components/home/HomeTrustSection";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeServicesSection from "../components/home/HomeServicesSection";
import HomeJourneySection from "../components/home/HomeJourneySection";
import HomeFinalCta from "../components/home/HomeFinalCta";
import HomeContactSection from "../components/home/HomeContactSection";
import Seo from "../components/seo/Seo";
import { createWebPageSchema } from "../components/seo/seoUtils";

const HomeTechnologySection = lazy(
  () => import("../components/home/HomeTechnologySection"),
);
const HomeDoctorsSection = lazy(
  () => import("../components/home/HomeDoctorsSection"),
);
const BeforeAfter = lazy(() => import("../componetts/BeforAfter"));

const sectionFallback = (
  <div className="min-h-96 bg-[#f8ead8]" aria-hidden="true" />
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
      <Hero t={t} lang={lang} />
      <HomeTrustSection />
      <HomeAboutSection />
      <HomeServicesSection />
      <Suspense fallback={sectionFallback}>
        <HomeTechnologySection />
      </Suspense>
      <Suspense fallback={sectionFallback}>
        <HomeDoctorsSection />
      </Suspense>
      <HomeJourneySection />
      <Suspense fallback={sectionFallback}>
        <BeforeAfter t={t} />
      </Suspense>
      <HomeFinalCta />
      <HomeContactSection />
    </>
  );
}
