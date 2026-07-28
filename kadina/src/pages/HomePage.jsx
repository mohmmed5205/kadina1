import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../componetts/Hero";
import WhyUs from "../componetts/WhyUs";
import HomeAboutSection from "../components/home/HomeAboutSection";
import HomeServicesSection from "../components/home/HomeServicesSection";
import HomeSolutionsSection from "../components/home/HomeSolutionsSection";
import HomeFaqSection from "../components/home/HomeFaqSection";
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
const HomeBlogSection = lazy(
  () => import("../components/home/HomeBlogSection"),
);

const sectionFallback = (
  <div className="min-h-96 bg-[#f8ead8]" aria-hidden="true" />
);

export default function HomePage() {
  const { lang, t } = useOutletContext();

  return (
    <>
      <Seo
        canonicalPath="/"
        description={t.hero.description}
        image="/homeBG.webp"
        jsonLd={createWebPageSchema({
          name: "مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض",
          description: t.hero.description,
          path: "/",
        })}
        title="مركز كادينا الطبي للجلدية والتجميل والليزر بالرياض"
      />
      <Hero t={t} lang={lang} />
      <HomeAboutSection />
      <HomeServicesSection />
      <HomeSolutionsSection />
      <Suspense fallback={sectionFallback}>
        <HomeTechnologySection />
      </Suspense>
      <Suspense fallback={sectionFallback}>
        <HomeDoctorsSection />
      </Suspense>
      <Suspense fallback={sectionFallback}>
        <BeforeAfter t={t} />
      </Suspense>
      {/* <WhyUs t={t} /> */}
      <HomeFaqSection />
      <Suspense fallback={sectionFallback}>
        <HomeBlogSection />
      </Suspense>
      <HomeContactSection />
    </>
  );
}
