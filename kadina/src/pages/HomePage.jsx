import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import HomeTrustSection from "../components/home/HomeTrustSection";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeBrandStatement from "../components/home/HomeBrandStatement";
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

      {/* Symphony home structure:
          Hero → About → Why → Brand statement → Services → Doctors → Technology → Footer */}
      <Hero t={t} lang={lang} />

      <HomeTrustSection />

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
    </>
  );
}
