import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import CardGrid from "../components/common/CardGrid";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getServicePages } from "../data/services";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const servicePageFeaturesAr = [
  "لماذا هذه الخدمة؟",
  "ماذا تعالج؟",
  "الأجهزة المرتبطة",
  "أطباء الخدمة",
  "الأسئلة الشائعة",
  "التواصل عبر واتساب",
];

export default function ServicesPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const services = getServicePages(lang).map((service) => ({ ...service, to: `/services/${service.slug}` }));
  const servicePageFeatures = en ? ["Why this service?", "What does it treat?", "Related devices", "Service doctors", "Frequently asked questions", "Contact via WhatsApp"] : servicePageFeaturesAr;
  return (
    <div>
      <Seo
        canonicalPath="/services"
        title={en ? "Services" : "الخدمات"}
        description={en ? "Explore Kadina Center's dermatology, laser, plastic surgery, hair and cosmetic injectable services in Riyadh." : "تعرّف على خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية بمدينة الرياض."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Services" : "الخدمات", path: "/services" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: en ? "Kadina Services" : "خدمات كادينا",
            description: en ? "Kadina Center services in dermatology, laser, plastic surgery, hair and cosmetic injectables." : "خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية.",
            path: "/services",
          }),
        ]}
      />

      <PageHero
        breadcrumbLabel={en ? "Services" : "الخدمات"}
        eyebrow={en ? "Kadina Services" : "خدمات كادينا"}
        title={en ? "Everything your skin and body need, under one roof" : "كل ما تحتاجه بشرتك وقوامك.. تحت سقف واحد"}
        description={en ? "Five specialized services combining consultant expertise and appropriate technologies, from accurate diagnosis to the plan best suited to your case." : "خمس خدمات متخصصة تجمع الخبرة الاستشارية والتقنيات المناسبة، لتبدأ رحلتك من التشخيص الدقيق إلى الخطة الأنسب لحالتك."}
      />

      {/* الخدمات الخمس */}
      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={en ? "Services" : "الخدمات"}
            title={en ? "Choose the service closest to your needs" : "اختر الخدمة الأقرب لاحتياجك"}
            description={en ? "Dermatology, laser, plastic surgery, hair and cosmetic injectables." : "الجلدية، والليزر، وجراحة التجميل، والشعر، والحقن التجميلية."}
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
                  {en ? "Explore Service" : "استكشف الخدمة"}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    {en ? "→" : "←"}
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
            eyebrow={en ? "A Clear Journey" : "رحلة واضحة"}
            title={en ? "Every service begins with diagnosis and ends with a clear plan" : "كل خدمة تبدأ بالتشخيص وتنتهي بخطة واضحة"}
            description={en ? "Each service page explains what it treats, related devices, suitable doctors and answers to common questions." : "داخل كل صفحة خدمة ستجد ما تعالجه، والأجهزة المرتبطة بها، والأطباء المناسبين، والإجابات عن أكثر الأسئلة شيوعًا."}
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
        title={en ? "Not sure which service is right for you?" : "لست متأكدًا أي خدمة تناسبك؟"}
        description={en ? "Contact us on WhatsApp and the Kadina team will help direct you to the right department." : "تواصل معنا عبر واتساب، وسيساعدك فريق كادينا في الوصول إلى القسم المناسب."}
        primaryLabel={en ? "Consult Us on WhatsApp" : "استشرنا عبر واتساب"}
        whatsappMessage={en ? "Hello, I would like to know which service is most suitable for my case at Kadina Center." : "مرحبًا، أرغب في معرفة الخدمة الأنسب لحالتي في مركز كادينا."}
      />
    </div>
  );
}
