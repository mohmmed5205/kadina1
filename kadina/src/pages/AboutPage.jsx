import { motion } from "framer-motion";
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
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function AboutPage() {
  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/about"
        title="عن كادينا"
        description="تعرّف على قصة مركز كادينا الطبي في الرياض منذ عام 2013، ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "عن كادينا", path: "/about" },
          ]),
          createWebPageSchema({
            name: "عن كادينا",
            description:
              "قصة مركز كادينا الطبي، ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة.",
            path: "/about",
          }),
        ]}
      />

      <PageHero
        breadcrumbLabel="عن كادينا"
        eyebrow="منذ عام 2013"
        title="عن كادينا"
        description="من نحن، ولماذا نستحق أن نلمس وجهك."
      />

      {/* قصتنا */}
      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionTitle
              eyebrow="قصتنا"
              title="مركز واحد يجمع الخبرة والتقنية"
            />

            <motion.p
              className="mt-6 text-base font-medium leading-9 text-[#4c2c00]/75"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {aboutContent.story}
            </motion.p>
          </div>

          <motion.div
            className="grid gap-5"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <motion.article
              className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)] sm:p-7"
              variants={cardItem}
            >
              <p className="text-sm font-black text-[#cf7d11]">رؤيتنا</p>

              <h2 className="mt-2 text-xl font-black text-[#4c2c00]">
                أن نكون المرجع الأول
              </h2>

              <p className="mt-4 leading-8 text-[#4c2c00]/70">
                {aboutContent.vision}
              </p>
            </motion.article>

            <motion.article
              className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)] sm:p-7"
              variants={cardItem}
            >
              <p className="text-sm font-black text-[#cf7d11]">رسالتنا</p>

              <h2 className="mt-2 text-xl font-black text-[#4c2c00]">
                رعاية تبدأ بتشخيص صادق
              </h2>

              <p className="mt-4 leading-8 text-[#4c2c00]/70">
                {aboutContent.mission}
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* قيمنا الأربع */}
      <section className="bg-[#fff7eb]/70 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="قيمنا الأربع"
            title="مبادئ تقود كل قرار"
            description="قيم ثابتة تحكم طريقة التشخيص، واختيار الإجراء، ومتابعة النتيجة."
          />

          <CardGrid className="mt-9 md:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value, index) => (
              <motion.article
                className="relative overflow-hidden rounded-[1.75rem] border border-[#4c2c00]/10 bg-white/80 p-6 shadow-[0_14px_35px_rgba(76,44,0,0.06)]"
                key={value.title}
                variants={cardItem}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-4 text-5xl font-black text-[#f8aa2d]/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="relative text-lg font-black text-[#4c2c00]">
                  {value.title}
                </h3>

                <p className="relative mt-4 leading-8 text-[#4c2c00]/68">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* لماذا كادينا بالأرقام */}
      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="لماذا كادينا؟"
            title="كادينا بالأرقام"
            align="center"
          />

          <motion.div
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {aboutMetrics.map((metric) => (
              <motion.div
                className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 text-center shadow-[0_12px_30px_rgba(76,44,0,0.05)] last:col-span-2 md:last:col-span-1"
                key={metric.label}
                variants={cardItem}
              >
                <p className="text-3xl font-black text-[#cf7d11] sm:text-4xl">
                  {metric.value}
                </p>

                <p className="mt-3 text-sm font-bold leading-6 text-[#4c2c00]/70">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cf7d11] px-7 py-3 text-sm font-black text-[#cf7d11] transition hover:bg-[#fff7eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf7d11] focus-visible:ring-offset-2"
              to="/doctors"
            >
              قابل أطباءنا
            </Link>

            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#cf7d11] px-7 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(207,125,17,0.25)] transition hover:bg-[#b86d0e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf7d11] focus-visible:ring-offset-2"
              href={`https://wa.me/966114555444?text=${encodeURIComponent(
                "مرحبًا، أرغب في حجز استشارة في مركز كادينا."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              احجز استشارتك عبر واتساب
              <span className="sr-only"> — يفتح في نافذة جديدة</span>
            </a>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="رعاية استشارية تبدأ بتشخيص صادق"
        description="نبدأ بفهم حالتك، ثم نختار الإجراء والتقنية الأنسب للوصول إلى نتيجة طبيعية ومدروسة."
      />
    </div>
  );
}
