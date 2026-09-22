import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import HomeTrustSection from "../components/home/HomeTrustSection";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeNumbersSection from "../components/home/HomeNumbersSection";
import HomeBrandStatement from "../components/home/HomeBrandStatement";
import HomeBookingSection from "../components/home/HomeBookingSection";
import HomeContactSection from "../components/home/HomeContactSection";
import Seo from "../components/seo/Seo";
import { createWebPageSchema } from "../components/seo/seoUtils";

const HomeServicesSection = lazy(
  () => import("../components/home/HomeServicesSection"),
);
const HomeDoctorsSection = lazy(
  () => import("../components/home/HomeDoctorsSection"),
);
const HomeTechnologySection = lazy(
  () => import("../components/home/HomeTechnologySection"),
);
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

      <Hero t={t} lang={lang} />

      <HomeTrustSection />
      <HomeNumbersSection />
      <HomeAboutSection />
      <HomeBrandStatement />

      <Suspense fallback={sectionFallback}>
        <HomeServicesSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <HomeDoctorsSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <HomeTechnologySection />
      </Suspense>

      <HomeBookingSection />

      <Suspense fallback={sectionFallback}>
        <BeforeAfter t={t} />
      </Suspense>

      <HomeContactSection />
    </>
  );
}
