import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import "./AboutPage.css";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getAboutData } from "../data/about";
import { getHomePageContent } from "../data/pagesContent";
import { SOURCE_SECTIONS } from "../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function AboutPage() {
  const { lang, t } = useOutletContext();
  const { journey } = getHomePageContent(lang);
  const {
    content: aboutContent,
    metrics: aboutMetrics,
    values: aboutValues,
  } = getAboutData(lang);
  const en = lang === "en";

  return (
    <div className="about-page">
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
        className="about-hero"
      />

      <div className="about-identity">
        <motion.section className="about-statement ds-container" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible" aria-labelledby="about-statement-title">
          <p className="about-eyebrow">{en ? "OUR STORY" : "قصتنا"}</p>
          <h2 id="about-statement-title">{en ? "One center combining expertise and technology" : "مركز واحد يجمع الخبرة والتقنية"}</h2>
          <p className="about-story-copy">{aboutContent.story}</p>
        </motion.section>

        <div className="about-principles ds-container">
          <div className="about-purpose">
            <section className="about-vision" aria-labelledby="about-vision-title">
              <h2 id="about-vision-title">{en ? "Our Vision" : "رؤيتنا"}</h2>
              <p>{aboutContent.vision}</p>
            </section>
            <section className="about-mission" aria-labelledby="about-mission-title">
              <h2 id="about-mission-title">{en ? "Our Mission" : "رسالتنا"}</h2>
              <p>{aboutContent.mission}</p>
            </section>
          </div>

          <section className="about-values" aria-labelledby="about-values-title">
            <div className="about-values-heading">
              <p className="about-eyebrow">{en ? "Our Four Values" : "قيمنا الأربع"}</p>
              <h2 id="about-values-title">{en ? "Principles that guide every decision" : "مبادئ تقود كل قرار"}</h2>
              <p>{en ? "Consistent values that guide diagnosis, procedure selection and result follow-up." : "قيم ثابتة تحكم طريقة التشخيص، واختيار الإجراء، ومتابعة النتيجة."}</p>
            </div>
            <motion.div className="about-values-list" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
              {aboutValues.map((value, index) => (
                <motion.article key={value.title} variants={cardItem}>
                  <span className="about-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{value.title}</h3>
                </motion.article>
              ))}
            </motion.div>
          </section>
        </div>
      </div>

      <div className="about-experience-band">
        <div className="about-experience ds-container">
          <figure className="about-clinic">
            <img
              alt={en ? "Kadina Medical Center building in Riyadh" : "مبنى مركز كادينا الطبي في الرياض"}
              src="/homeBG.webp"
              width="1284"
              height="868"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{en ? "Kadina Medical Center" : "مركز كادينا الطبي"} <span>{en ? "Since 2013" : "منذ عام 2013"}</span></figcaption>
          </figure>
          <section className="about-journey" aria-labelledby="about-journey-title">
            <p className="about-eyebrow">{en ? "About Kadina" : "عن كادينا"}</p>
            <h2 id="about-journey-title">{en ? "Your Journey at Kadina" : "رحلتك في كادينا"}</h2>
            <p className="about-journey-intro">{t.whyUs.description}</p>
            <ol>
              {journey.map((step, index) => (
                <li key={step.title}>
                  <span className="about-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <section className="about-why" aria-labelledby="about-why-title">
        <div className="ds-container">
          <div className="about-why-heading">
            <p className="about-eyebrow">{t.whyUs.eyebrow}</p>
            <h2 id="about-why-title">{t.whyUs.title}</h2>
          </div>
          <motion.div className="about-reasons" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
            {aboutValues.map((item, index) => (
              <motion.article key={item.title} variants={cardItem}>
                <span className="about-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
          <div className="about-numbers">
            <h3>{en ? "Kadina in Numbers" : "كادينا بالأرقام"}</h3>
            <dl>
              {aboutMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd dir="ltr">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="about-contact">
        <CTASection
          pageType="about"
          sourceSection={SOURCE_SECTIONS.ABOUT}
          title={en ? "Consultant care that begins with an honest diagnosis" : "رعاية استشارية تبدأ بتشخيص صادق"}
          description={en ? "We begin by understanding your case, then select the most appropriate procedure and technology for a natural, considered result." : "نبدأ بفهم حالتك، ثم نختار الإجراء والتقنية الأنسب للوصول إلى نتيجة طبيعية ومدروسة."}
          primaryLabel={en ? "Book Your Consultation on WhatsApp" : "احجز استشارتك عبر واتساب"}
          whatsappMessage={en ? "Hello, I would like to book a consultation at Kadina Center." : "مرحبًا، أرغب في حجز استشارة في مركز كادينا."}
          secondaryLabel={en ? "Meet Our Doctors" : "قابل أطباءنا"}
          secondaryTo="/doctors"
        />
      </div>
    </div>
  );
}
