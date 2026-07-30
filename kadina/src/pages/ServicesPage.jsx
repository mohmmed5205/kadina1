import { motion } from "framer-motion";
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
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const servicePageFeatures = [
  "لماذا هذه الخدمة؟",
  "ماذا تعالج؟",
  "الأجهزة المرتبطة",
  "أطباء الخدمة",
  "الأسئلة الشائعة",
  "التواصل عبر واتساب",
];

export default function ServicesPage() {
  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/services"
        title="الخدمات"
        description="تعرّف على خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية بمدينة الرياض."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الخدمات", path: "/services" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "خدمات كادينا",
            description:
              "خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية.",
            path: "/services",
          }),
        ]}
      />

      <PageHero
        breadcrumbLabel="الخدمات"
        eyebrow="خدمات كادينا"
        title="كل ما تحتاجه بشرتك وقوامك.. تحت سقف واحد"
        description="خمس خدمات متخصصة تجمع الخبرة الاستشارية والتقنيات المناسبة، لتبدأ رحلتك من التشخيص الدقيق إلى الخطة الأنسب لحالتك."
      />

      {/* الخدمات الخمس */}
      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="الخدمات"
            title="اختر الخدمة الأقرب لاحتياجك"
            description="الجلدية، والليزر، وجراحة التجميل، والشعر، والحقن التجميلية."
          />

          <CardGrid className="mt-9 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <MotionLink
                key={service.to}
                to={service.to}
                className="group flex min-h-64 flex-col justify-between rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:shadow-[0_22px_50px_rgba(76,44,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf7d11] focus-visible:ring-offset-2"
                variants={cardItem}
              >
                <div>
                  <span className="text-sm font-black text-[#cf7d11]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2 className="mt-8 text-2xl font-black text-[#4c2c00]">
                    {service.title}
                  </h2>

                  {service.description ? (
                    <p className="mt-4 leading-8 text-[#4c2c00]/68">
                      {service.description}
                    </p>
                  ) : null}
                </div>

                <span className="mt-8 inline-flex items-center gap-2 font-black text-[#cf7d11]">
                  استكشف الخدمة
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </span>
              </MotionLink>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* ما الذي تحتويه صفحة الخدمة */}
      <section className="bg-[#fff7eb]/70 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="رحلة واضحة"
            title="كل خدمة تبدأ بالتشخيص وتنتهي بخطة واضحة"
            description="داخل كل صفحة خدمة ستجد ما تعالجه، والأجهزة المرتبطة بها، والأطباء المناسبين، والإجابات عن أكثر الأسئلة شيوعًا."
          />

          <motion.div
            className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {servicePageFeatures.map((feature, index) => (
              <motion.article
                key={feature}
                className="rounded-[1.5rem] border border-[#4c2c00]/10 bg-white/80 p-5 shadow-[0_12px_30px_rgba(76,44,0,0.05)]"
                variants={cardItem}
              >
                <span className="text-sm font-black text-[#cf7d11]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 text-lg font-black text-[#4c2c00]">
                  {feature}
                </h3>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        title="لست متأكدًا أي خدمة تناسبك؟"
        description="تواصل معنا عبر واتساب، وسيساعدك فريق كادينا في الوصول إلى القسم المناسب."
        buttonLabel="استشرنا عبر واتساب"
        whatsappMessage="مرحبًا، أرغب في معرفة الخدمة الأنسب لحالتي في مركز كادينا."
      />
    </div>
  );
}
