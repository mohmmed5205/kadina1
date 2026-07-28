import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { deviceCategories, deviceDetails } from "../data/devices";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function TechnologyPage() {
  const whatsappUrl = createWhatsappUrl(
    "مرحبًا، أرغب في الاستفسار عن أجهزة كادينا.",
  );

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
        description="الجهاز وحده لا يصنع النتيجة، لكن الجهاز الصحيح، بيد الاستشاري الصحيح، بالإعداد الصحيح لبشرتك أنت: هذه معادلة كادينا."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="أجهزتنا"
            title="تصفّح الأجهزة حسب الفئة"
            description="اعرف ماذا يفعل كل جهاز ولمن يناسب."
          />
          <div className="mt-10 space-y-10">
            {deviceCategories.map((category) => (
              <section
                className="rounded-[2rem] border border-[#4c2c00]/10 bg-[#fff7eb]/75 p-5 sm:p-7"
                key={category}
              >
                <h2 className="text-xl font-black text-[#4c2c00] sm:text-2xl">
                  {category}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {deviceDetails
                    .filter((device) => device.category === category)
                    .map((device) => (
                    <Link
                      className="group rounded-[1.5rem] border border-[#f8aa2d]/20 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                      key={device.slug}
                      to={`/technology/${device.slug}`}
                    >
                      <h3
                        className="text-lg font-black text-[#4c2c00]"
                        dir="ltr"
                      >
                        {device.englishName}
                      </h3>
                      <span className="mt-5 inline-block text-sm font-black text-[#cf7d11]">
                        التفاصيل
                      </span>
                    </Link>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            الجهاز الصحيح يبدأ بتقييم صحيح
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#fff7eb]/75">
            احجز استشارتك لمعرفة الجهاز والإعداد الأنسب لك.
          </p>
          <a
            aria-label="استفسر عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </section>
    </div>
  );
}
