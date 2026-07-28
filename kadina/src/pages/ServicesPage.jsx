import { Link } from "react-router-dom";
import CardGrid from "../components/common/CardGrid";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { services } from "../data/pagesContent";

export default function ServicesPage() {
  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/services"
        description="خدمات كادينا في الجلدية والليزر وجراحة التجميل والعناية بالشعر والحقن التجميلية تحت سقف واحد."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الخدمات", path: "/services" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "خدمات كادينا",
            description:
              "خدمات الجلدية والليزر وجراحة التجميل والعناية بالشعر والحقن التجميلية.",
            path: "/services",
          }),
        ]}
        title="خدمات الجلدية والتجميل والليزر"
      />
      <PageHero
        breadcrumbLabel="الخدمات"
        eyebrow="خدمات كادينا"
        title="كل ما تحتاجه بشرتك وقوامك... تحت سقف واحد"
        description="خمس خدمات رئيسية تقودك إلى الصفحة الأقرب لاحتياجك."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="الخدمات"
            title="اختر الخدمة"
            description="الجلدية، الليزر، جراحة التجميل، الشعر، والحقن التجميلية."
          />
          <CardGrid className="mt-9">
            {services.map((service, index) => (
              <Link
                className="group min-h-52 rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                key={service.to}
                to={service.to}
              >
                <span className="text-sm font-black text-[#cf7d11]">
                  0{index + 1}
                </span>
                <h3 className="mt-12 text-2xl font-black text-[#4c2c00]">
                  {service.title}
                </h3>
                <span className="mt-4 inline-block font-black text-[#cf7d11]">
                  معرفة التفاصيل
                </span>
              </Link>
            ))}
          </CardGrid>
        </div>
      </section>

      <CTASection
        title="استشارة واحدة تقودك إلى خطة واضحة"
        description="احجز استشارتك مع استشاري متخصص."
      />
    </div>
  );
}
