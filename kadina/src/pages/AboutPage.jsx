import { Link } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import CardGrid from "../components/common/CardGrid";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import {
  aboutContent,
  aboutMetrics,
  aboutValues,
} from "../data/about";

export default function AboutPage() {
  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/about"
        description="تعرّف على قصة مركز كادينا منذ عام 2013، ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "عن كادينا", path: "/about" },
          ]),
          createWebPageSchema({
            name: "عن كادينا",
            description:
              "قصة مركز كادينا ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة.",
            path: "/about",
          }),
        ]}
        title="عن كادينا"
      />
      <PageHero
        breadcrumbLabel="عن كادينا"
        eyebrow="عن كادينا"
        title="عن كادينا"
        description={aboutContent.intro}
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionTitle eyebrow="قصتنا" title="مركز واحد في قلب الرياض" />
            <p className="mt-6 text-base font-medium leading-9 text-[#4c2c00]/72">
              {aboutContent.story}
            </p>
          </div>

          <div className="grid gap-5">
            <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]">
              <h2 className="text-xl font-black text-[#4c2c00]">رؤيتنا</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {aboutContent.vision}
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]">
              <h2 className="text-xl font-black text-[#4c2c00]">رسالتنا</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {aboutContent.mission}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7eb]/70 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="قيمنا" title="أربع قيم تقود كل قرار" />
          <CardGrid className="mt-8 lg:grid-cols-4">
            {aboutValues.map((value) => (
              <article
                className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-white/70 p-6"
                key={value.title}
              >
                <h3 className="text-lg font-black text-[#4c2c00]">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-[#4c2c00]/65">
                  {value.description}
                </p>
              </article>
            ))}
          </CardGrid>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="لماذا كادينا — بالأرقام" align="center" />
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {aboutMetrics.map((metric) => (
              <div
                className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 text-center last:col-span-2 lg:last:col-span-1"
                key={metric.label}
              >
                <p className="text-3xl font-black text-[#cf7d11]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-bold text-[#4c2c00]/68">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              className="font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
              to="/doctors"
            >
              قابل أطباءنا
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="احجز استشارتك"
        description="رعاية استشارية متخصصة تبدأ بتشخيص صادق."
      />
    </div>
  );
}
