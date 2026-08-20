import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
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

const serviceToneClasses = [
  "bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)] services-bento-primary",
  "bg-[var(--color-warm-beige-strong)] text-[var(--color-heading)] services-bento-laser",
  "bg-[var(--color-surface-raised)] text-[var(--color-heading)] services-bento-plastic",
  "bg-[var(--color-surface-muted)] text-[var(--color-heading)] services-bento-hair",
  "bg-[var(--color-cream-raised)] text-[var(--color-heading)] services-bento-injectables",
];

export default function ServicesPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const services = getServicePages(lang).map((service) => ({
    ...service,
    to: `/services/${service.slug}`,
  }));
  const servicePageFeatures = en
    ? ["Why this service?", "What does it treat?", "Related devices", "Service doctors", "Frequently asked questions", "Contact via WhatsApp"]
    : servicePageFeaturesAr;

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
        variant="editorial"
      />

      <section className="ds-section bg-[var(--color-surface)]">
        <div className="ds-container">
          <SectionTitle
            eyebrow={en ? "Services" : "الخدمات"}
            title={en ? "Choose the service closest to your needs" : "اختر الخدمة الأقرب لاحتياجك"}
            description={en ? "Dermatology, laser, plastic surgery, hair and cosmetic injectables." : "الجلدية، والليزر، وجراحة التجميل، والشعر، والحقن التجميلية."}
          />

          <motion.div className="services-editorial-grid mt-12 grid gap-4 lg:gap-5" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
            {services.map((service, index) => (
              <MotionLink
                className={`service-bento-item group relative flex min-h-60 flex-col justify-between overflow-hidden border border-[var(--color-border)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 sm:p-8 ${serviceToneClasses[index]}`}
                key={service.to}
                to={service.to}
                variants={cardItem}
              >
                <div>
                  <span className={`text-xs font-black tracking-[0.12em] ${index === 0 ? "text-[var(--color-accent)]" : "text-[var(--color-accent-strong)]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className={`mt-8 text-[clamp(2rem,5vw,4rem)] font-black leading-[1.08] ${index === 0 ? "on-dark-heading" : "text-[var(--color-heading)]"}`}>
                    {service.title}
                  </h2>
                  {service.subtitle ? (
                    <p className={`mt-4 max-w-xl leading-8 ${index === 0 ? "text-[var(--color-text-on-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>
                      {service.subtitle}
                    </p>
                  ) : null}
                </div>
                <span className={`mt-8 inline-flex min-h-11 items-center gap-2 self-start border-b pb-1 text-sm font-black ${index === 0 ? "border-[var(--color-border-on-dark)] text-[var(--color-accent)]" : "border-[var(--color-border-strong)] text-[var(--color-accent-strong)]"}`}>
                  {en ? "View Details" : "معرفة التفاصيل"}
                  <span aria-hidden="true" className="editorial-arrow">{en ? "→" : "←"}</span>
                </span>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="ds-container grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionTitle
            eyebrow={en ? "A Clear Journey" : "رحلة واضحة"}
            title={en ? "Every service begins with diagnosis and ends with a clear plan" : "كل خدمة تبدأ بالتشخيص وتنتهي بخطة واضحة"}
            description={en ? "Each service page explains what it treats, related devices, suitable doctors and answers to common questions." : "داخل كل صفحة خدمة ستجد ما تعالجه، والأجهزة المرتبطة بها، والأطباء المناسبين، والإجابات عن أكثر الأسئلة شيوعًا."}
          />
          <motion.div className="border-t border-[var(--color-border-strong)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
            {servicePageFeatures.map((feature, index) => (
              <motion.div className="grid min-h-20 grid-cols-[3rem_1fr] items-center gap-3 border-b border-[var(--color-border)] py-4 sm:grid-cols-[5rem_1fr]" key={`service-feature-${index}`} variants={cardItem}>
                <span className="text-xs font-black text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-black text-[var(--color-heading)] sm:text-xl">{feature}</h3>
              </motion.div>
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
