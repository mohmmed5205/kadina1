import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getAboutData } from "../data/about";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function AboutPage() {
  const { lang } = useOutletContext();
  const {
    content: aboutContent,
    metrics: aboutMetrics,
    values: aboutValues,
  } = getAboutData(lang);
  const en = lang === "en";

  return (
    <div>
      <Seo
        canonicalPath="/about"
        title={en ? "About Kadina" : "عن كادينا"}
        description={en ? "Learn about Kadina Medical Center's story in Riyadh since 2013, its vision, mission and values in specialist consultant care." : "تعرّف على قصة مركز كادينا الطبي في الرياض منذ عام 2013، ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "About Kadina" : "عن كادينا", path: "/about" },
          ]),
          createWebPageSchema({
            name: en ? "About Kadina" : "عن كادينا",
            description: en ? "The story, vision, mission and values of Kadina Medical Center." : "قصة مركز كادينا الطبي، ورؤيته ورسالته وقيمه في الرعاية الاستشارية المتخصصة.",
            path: "/about",
          }),
        ]}
      />

      <PageHero
        breadcrumbLabel={en ? "About Kadina" : "عن كادينا"}
        eyebrow={en ? "Since 2013" : "منذ عام 2013"}
        title={en ? "About Kadina" : "عن كادينا"}
        description={aboutContent.intro}
        variant="editorial"
      />

      <motion.section className="ds-section bg-[var(--color-surface)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container grid items-start gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-black tracking-[0.14em] text-[var(--color-accent-strong)]">{en ? "OUR STORY" : "قصتنا"}</p>
            <span aria-hidden="true" className="mt-5 block h-px w-16 bg-[var(--color-accent)]" />
            <h2 className="mt-7 max-w-xl text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.08] tracking-[-0.045em] text-[var(--color-heading)]">
              {en ? "One center combining expertise and technology" : "مركز واحد يجمع الخبرة والتقنية"}
            </h2>
          </div>
          <div className="border-t border-[var(--color-border)] pt-8 lg:pt-10">
            <span aria-hidden="true" className="block text-6xl font-black leading-none text-[var(--color-accent)]/35 sm:text-8xl">01</span>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-[2] text-[var(--color-text)] sm:text-2xl sm:leading-[1.9]">{aboutContent.story}</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="border-y border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container py-[var(--section-space)]">
          <p className="text-xs font-black tracking-[0.14em] text-[var(--color-accent)]">{en ? "OUR VISION" : "رؤيتنا"}</p>
          <span aria-hidden="true" className="mt-5 block h-px w-16 bg-[var(--color-accent)]" />
          <h2 className="on-dark-heading mt-8 max-w-4xl text-[clamp(2rem,6vw,4.75rem)] font-black leading-[1.15] tracking-[-0.04em]">{aboutContent.vision}</h2>
        </div>
      </motion.section>

      <motion.section className="ds-section bg-[var(--color-surface-muted)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <span aria-hidden="true" className="text-6xl font-black leading-none text-[var(--color-accent-strong)]/35 sm:text-8xl">02</span>
            <p className="mt-7 text-xs font-black tracking-[0.14em] text-[var(--color-accent-strong)]">{en ? "OUR MISSION" : "رسالتنا"}</p>
            <h2 className="mt-5 max-w-lg text-[clamp(2.25rem,5vw,4rem)] font-black leading-[1.1] tracking-[-0.04em] text-[var(--color-heading)]">
              {en ? "Care that begins with an honest diagnosis" : "رعاية تبدأ بتشخيص صادق"}
            </h2>
          </div>
          <div className="border-t border-[var(--color-border-strong)] pt-8 lg:mt-16 lg:pt-10">
            <p className="max-w-3xl text-xl font-medium leading-[2] text-[var(--color-text)] sm:text-2xl sm:leading-[1.9]">{aboutContent.mission}</p>
          </div>
        </div>
      </motion.section>

      <section className="ds-section bg-[var(--color-surface)]">
        <div className="ds-container">
          <SectionTitle eyebrow={en ? "Our Four Values" : "قيمنا الأربع"} title={en ? "Principles that guide every decision" : "مبادئ تقود كل قرار"} description={en ? "Consistent values that guide diagnosis, procedure selection and result follow-up." : "قيم ثابتة تحكم طريقة التشخيص، واختيار الإجراء، ومتابعة النتيجة."} />
          <motion.div className="about-values-grid mt-12 grid border-y border-[var(--color-border-strong)] sm:grid-cols-2" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
            {aboutValues.map((value, index) => (
              <motion.article className="about-value-item grid gap-5 py-8 sm:px-7 sm:py-10 lg:grid-cols-[4rem_1fr] lg:gap-7 lg:px-10" key={`about-value-${index}`} variants={cardItem}>
                <span className="text-sm font-black text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-black text-[var(--color-heading)]">{value.title}</h3>
                  <p className="mt-4 max-w-xl leading-8 text-[var(--color-text-muted)]">{value.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]">
        <div className="ds-container pt-[var(--section-space-compact)] text-center">
          <p className="text-xs font-black tracking-[0.14em] text-[var(--color-accent)]">{en ? "WHY KADINA?" : "لماذا كادينا؟"}</p>
          <h2 className="on-dark-heading mt-4 text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.1]">{en ? "Kadina in Numbers" : "كادينا بالأرقام"}</h2>
        </div>
        <motion.div className="ds-container mt-10 grid grid-cols-2 border-t border-[var(--color-border-on-dark)] lg:grid-cols-5" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
          {aboutMetrics.map((metric, index) => (
            <motion.div className="about-metric relative flex min-h-40 flex-col justify-center px-3 py-8 text-center last:col-span-2 lg:last:col-span-1 lg:min-h-56" key={`about-metric-${index}`} variants={cardItem}>
              <p className="text-5xl font-black tracking-[-0.05em] text-[var(--color-accent)] sm:text-6xl" dir="ltr">{metric.value}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-[var(--color-text-on-dark-muted)] sm:text-base">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <CTASection
        title={en ? "Consultant care that begins with an honest diagnosis" : "رعاية استشارية تبدأ بتشخيص صادق"}
        description={en ? "We begin by understanding your case, then select the most appropriate procedure and technology for a natural, considered result." : "نبدأ بفهم حالتك، ثم نختار الإجراء والتقنية الأنسب للوصول إلى نتيجة طبيعية ومدروسة."}
        primaryLabel={en ? "Book Your Consultation on WhatsApp" : "احجز استشارتك عبر واتساب"}
        whatsappMessage={en ? "Hello, I would like to book a consultation at Kadina Center." : "مرحبًا، أرغب في حجز استشارة في مركز كادينا."}
        secondaryLabel={en ? "Meet Our Doctors" : "قابل أطباءنا"}
        secondaryTo="/doctors"
      />
    </div>
  );
}
