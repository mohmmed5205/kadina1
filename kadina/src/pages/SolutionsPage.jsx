import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { solutionDetails } from "../data/solutions";
import { createWhatsappUrl } from "../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const areaFilters = [
  { slug: "all", label: "الكل" },
  { slug: "face", label: "الوجه" },
  { slug: "body", label: "الجسم" },
  { slug: "hair", label: "الشعر" },
  { slug: "skin", label: "البشرة" },
];

const filterBySlug = Object.fromEntries(
  areaFilters.map((filter) => [filter.slug, filter]),
);

function getResultsLabel(count) {
  if (count === 0) return "لا توجد حلول";
  if (count === 1) return "حل واحد";
  if (count === 2) return "حلّان";
  if (count >= 3 && count <= 10) return `${count} حلول`;

  return `${count} حلًا`;
}

export default function SolutionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedArea = searchParams.get("area");
  const activeFilter = filterBySlug[requestedArea] || filterBySlug.all;

  const filteredSolutions = useMemo(() => {
    if (activeFilter.slug === "all") {
      return solutionDetails;
    }

    return solutionDetails.filter(
      (solution) => solution.areaSlug === activeFilter.slug,
    );
  }, [activeFilter.slug]);

  const emptyStateWhatsappUrl = createWhatsappUrl(
    "مرحبًا، أرغب في معرفة الحل الأنسب لحالتي في مركز كادينا.",
  );

  const selectFilter = (slug) => {
    setSearchParams(slug === "all" ? {} : { area: slug });
  };

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/solutions"
        description="اكتشف حلول كادينا لمشكلات الوجه والجسم والشعر والبشرة، واختر المشكلة الأقرب لاحتياجك."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المشاكل والحلول", path: "/solutions" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "المشاكل والحلول في كادينا",
            description:
              "حلول كادينا لمشكلات البشرة والشعر والوجه والجسم.",
            path: "/solutions",
          }),
        ]}
        title="المشكلات والحلول"
      />

      <PageHero
        breadcrumbLabel="المشكلات والحلول"
        eyebrow="المشكلات والحلول"
        title="مشكلتك لها حل.. ونعرفه بالاسم"
        description="قد لا تعرف اسم الجهاز أو الإجراء — ولا يلزمك ذلك. اختر ما يزعجك، وسنريك كيف نعالجه في كادينا: بأي تقنية، وبيد أي استشاري، وماذا تتوقع."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="max-w-3xl text-lg font-bold leading-9 text-[#4c2c00]/72 sm:text-xl"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            ابدأ من اسم المشكلة، وتصفّح الحلول حسب الوجه، الجسم، الشعر،
            والبشرة.
          </motion.p>

          <div className="mt-8 border-y border-[#f8aa2d]/20 py-5">
            <div
              aria-label="تصفية الحلول حسب المنطقة"
              className="flex gap-3 overflow-x-auto pb-2"
              role="group"
            >
              {areaFilters.map((filter) => {
                const isActive = activeFilter.slug === filter.slug;

                return (
                  <button
                    aria-controls="solutions-results"
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full border px-5 py-2.5 font-black transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#cf7d11] ${
                      isActive
                        ? "border-[#f8aa2d] bg-[#f8aa2d] text-[#2b1b08] shadow-[0_10px_26px_rgba(207,125,17,0.25)]"
                        : "border-[#4c2c00]/15 bg-[#fff7eb] text-[#4c2c00] hover:border-[#f8aa2d]/60 hover:text-[#cf7d11]"
                    }`}
                    key={filter.slug}
                    onClick={() => selectFilter(filter.slug)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p
            aria-live="polite"
            className="mt-6 font-black text-[#4c2c00]"
            role="status"
          >
            {getResultsLabel(filteredSolutions.length)}
          </p>

          {filteredSolutions.length > 0 ? (
            <motion.div
              key={activeFilter.slug}
              animate="visible"
              className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              id="solutions-results"
              initial="hidden"
              variants={staggerContainer}
            >
              {filteredSolutions.map((solution) => (
                <MotionLink
                  className="group flex min-h-[260px] flex-col rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fffaf3] p-7 shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={solution.slug}
                  to={`/solutions/${solution.slug}`}
                  variants={cardItem}
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-auto self-start object-contain"
                    decoding="async"
                    src="/logo.webp"
                  />

                  <h2 className="mt-8 text-xl font-black leading-8 text-[#4c2c00] line-clamp-3">
                    {solution.painHeadline ||
                      solution.shortTitle ||
                      solution.title}
                  </h2>

                  <p className="mt-4 text-sm font-bold text-[#4c2c00]/65">
                    {solution.title}
                  </p>

                  <span className="mt-auto pt-8 font-black text-[#cf7d11]">
                    اعرف الحل
                  </span>
                </MotionLink>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${activeFilter.slug}`}
              animate="visible"
              aria-live="polite"
              className="mt-7 rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center"
              id="solutions-results"
              initial="hidden"
              role="status"
              variants={fadeUp}
            >
              <h2 className="text-2xl font-black text-[#4c2c00]">
                لم نجد حلولًا مطابقة لهذا التصنيف.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#4c2c00]/70">
                تواصل معنا، وسنساعدك في الوصول إلى القسم الأنسب لحالتك.
              </p>

              <a
                aria-label="اسألنا عبر واتساب (يفتح في نافذة جديدة)"
                className="mt-6 inline-flex rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
                href={emptyStateWhatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                اسألنا عبر واتساب
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <CTASection
        title="غير متأكد من اسم المشكلة؟"
        description="صف لنا ما يزعجك عبر واتساب، وسنوجهك إلى الخدمة أو التقنية المناسبة."
        primaryLabel="استشرنا عبر واتساب"
        whatsappMessage="مرحبًا، أرغب في معرفة الحل الأنسب لحالتي في مركز كادينا."
      />
    </div>
  );
}
