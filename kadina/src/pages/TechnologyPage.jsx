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
import { deviceDetails } from "../data/devices";
import { createWhatsappUrl } from "../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const categoryFilters = [
  { slug: "all", label: "الكل", category: null },
  {
    slug: "laser",
    label: "إزالة الشعر بالليزر",
    category: "إزالة الشعر بالليزر",
  },
  {
    slug: "skin-renewal",
    label: "تجديد البشرة",
    category: "تجديد البشرة وعلاج آثارها",
  },
  {
    slug: "skincare",
    label: "العناية والنضارة",
    category: "العناية والنضارة",
  },
  {
    slug: "lifting-contouring",
    label: "الشد والنحت",
    category: "الشد والنحت غير الجراحي",
  },
  { slug: "hair", label: "علاج الشعر", category: "علاج الشعر" },
];

const filterBySlug = Object.fromEntries(
  categoryFilters.map((filter) => [filter.slug, filter]),
);

function getResultsLabel(count) {
  if (count === 2) return "جهازان";
  if (count >= 3 && count <= 10) return `${count} أجهزة`;
  return `${count} جهازًا`;
}

export default function TechnologyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("cat");
  const activeFilter = filterBySlug[requestedCategory] || filterBySlug.all;
  const filteredDevices = useMemo(
    () =>
      activeFilter.category
        ? deviceDetails.filter(
            (device) => device.category === activeFilter.category,
          )
        : deviceDetails,
    [activeFilter.category],
  );
  const emptyStateWhatsappUrl = createWhatsappUrl(
    "مرحبًا، أرغب في معرفة الجهاز أو التقنية الأنسب لحالتي في مركز كادينا.",
  );

  const selectFilter = (slug) => {
    setSearchParams(slug === "all" ? {} : { cat: slug });
  };

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/technology"
        description="تعرّف على أجهزة وتقنيات كادينا الـ13 لإزالة الشعر وتجديد البشرة والعناية والشد والنحت وعلاج الشعر."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "التقنيات والأجهزة", path: "/technology" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "تقنيات وأجهزة كادينا",
            description:
              "أجهزة إزالة الشعر وتجديد البشرة والعناية والشد والنحت وعلاج الشعر في كادينا.",
            path: "/technology",
          }),
        ]}
        title="أجهزة وتقنيات كادينا الطبية"
      />
      <PageHero
        breadcrumbLabel="التقنيات والأجهزة"
        eyebrow="التقنيات والأجهزة"
        title="ترسانة كادينا التقنية: 13+ جهازًا من الطراز العالمي الأول"
        description="الجهاز وحده لا يصنع النتيجة، لكن الجهاز الصحيح، بيد الاستشاري الصحيح، وبالإعداد الصحيح لبشرتك، هو معادلة كادينا."
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
            تصفح أجهزتنا، واعرف ماذا يفعل كل جهاز، ولمن يناسب.
          </motion.p>

          <div className="mt-8 border-y border-[#f8aa2d]/20 py-5">
            <div
              aria-label="تصفية الأجهزة حسب المجال"
              className="flex gap-3 overflow-x-auto pb-2"
              role="group"
            >
              {categoryFilters.map((filter) => {
                const isActive = activeFilter.slug === filter.slug;

                return (
                  <button
                    aria-controls="technology-results"
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
            {getResultsLabel(filteredDevices.length)}
          </p>

          {filteredDevices.length > 0 ? (
          <motion.div
             key={activeFilter.slug}
             className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
               id="technology-results"
                 variants={staggerContainer}
                   initial="hidden"
                  animate="visible"
                  >
              {filteredDevices.map((device) => (
                <MotionLink
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={device.slug}
                  to={`/technology/${device.slug}`}
                  variants={cardItem}
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/75 p-5">
                    <img
                      alt={`${device.arabicName}${device.englishName ? ` — ${device.englishName}` : ""}`}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      decoding="async"
                      loading="lazy"
                      src={device.image}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-black text-[#4c2c00]">
                      {device.arabicName}
                    </h2>
                    {device.englishName && (
                      <p
                        className="mt-2 text-sm font-bold text-[#cf7d11]"
                        dir="ltr"
                      >
                        {device.englishName}
                      </p>
                    )}
                    <p className="mt-3 line-clamp-2 leading-7 text-[#4c2c00]/68">
                      {device.uses[0]}
                    </p>
                    <span className="mt-5 inline-block font-black text-[#cf7d11]">
                      التفاصيل
                    </span>
                  </div>
                </MotionLink>
              ))}
            </motion.div>
          ) : (
            <motion.div
              aria-live="polite"
              className="mt-7 rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center"
              id="technology-results"
              initial="hidden"
              role="status"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              <h2 className="text-2xl font-black text-[#4c2c00]">
                لم نجد أجهزة مطابقة لهذا التصنيف.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#4c2c00]/70">
                تواصل معنا وسنساعدك في الوصول إلى التقنية الأنسب لحالتك.
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
        title="لست متأكدًا أي جهاز يناسب حالتك؟"
        description="ابدأ باستشارة، وسيساعدك استشاري كادينا في اختيار التقنية الأنسب."
        primaryLabel="استشرنا عبر واتساب"
        whatsappMessage="مرحبًا، أرغب في معرفة الجهاز أو التقنية الأنسب لحالتي في مركز كادينا."
      />
    </div>
  );
}
