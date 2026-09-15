import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";
import { SOURCE_SECTIONS } from "../utils/analytics";

const faqItems = [
  {
    question: "ما الفرق بين أجهزة الليزر الثلاثة لديكم؟ وأيها الأنسب لي؟",
    answer:
      "لكل جهاز نقاط قوته حسب نوع البشرة والشعر والمنطقة — ولهذا نبدأ بجلسة تقييم يحدد فيها الطبيب الجهاز والإعداد الأمثل لك، لا العكس.",
  },
  {
    question: "هل الهايفو بديل حقيقي لعمليات الشد؟",
    answer:
      "للترهل الخفيف والمتوسط، يقدم Ultraformer III نتيجة شد ورفع ملموسة دون جراحة. الحالات المتقدمة قد يكون خيارها الأمثل جراحيًا — ونخبرك بذلك بصراحة في الاستشارة.",
  },
  {
    question: "هل نتائج البوتوكس والفيلر تبدو مصطنعة؟",
    answer:
      "فلسفتنا هي الجمال الطبيعي: نتيجة يلاحظها الآخرون دون أن يعرفوا السبب.",
  },
  {
    question: "ما الفرق بين ريجينيرا والبلازما لعلاج التساقط؟",
    answer:
      "البلازما تغذي البصيلة وتقويها، بينما ريجينيرا تحفزها بخلايا دقيقة من فروة رأسك نفسها — وقد يجمع الطبيب بينهما في خطة واحدة حسب حالتك.",
  },
  {
    question: "ما مواعيد العمل وأين موقعكم؟",
    answer:
      "الرياض — الطريق الدائري الشمالي، من الاثنين إلى الجمعة، 9 صباحًا حتى 10 مساءً.",
  },
];

const faqItemsEn = [
  { question: "What is the difference between your three laser devices, and which is right for me?", answer: "Each device has strengths based on skin type, hair and treatment area. We therefore begin with an assessment in which the doctor selects the optimal device and settings for you." },
  { question: "Is HIFU a genuine alternative to surgical lifting?", answer: "For mild to moderate laxity, Ultraformer III can provide noticeable non-surgical tightening and lifting. Advanced cases may be better suited to surgery, which we explain honestly during consultation." },
  { question: "Will Botox and filler results look artificial?", answer: "Our philosophy is natural beauty: a result others notice without knowing why." },
  { question: "What is the difference between Regenera and PRP for hair loss?", answer: "PRP nourishes and strengthens follicles, while Regenera stimulates them using micrografts from your own scalp. A doctor may combine them in one plan depending on your case." },
  { question: "What are your opening hours and where are you located?", answer: "Riyadh — Northern Ring Road, Monday to Friday, 9:00 AM to 10:00 PM." },
];

export default function FaqPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const localizedFaqItems = en ? faqItemsEn : faqItems;
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <Seo
        canonicalPath="/faq"
        description={en ? "Kadina answers about laser devices, HIFU, Botox, fillers, hair-loss treatments, location and opening hours." : "إجابات كادينا عن أجهزة الليزر والهايفو والبوتوكس والفيلر وعلاجات تساقط الشعر والموقع ومواعيد العمل."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "FAQ" : "الأسئلة الشائعة", path: "/faq" },
          ]),
          createWebPageSchema({
            name: en ? "Frequently Asked Questions" : "الأسئلة الشائعة",
            description: en ? "Clear answers about Kadina services and technologies before booking." : "إجابات واضحة عن خدمات وتقنيات كادينا قبل الحجز.",
            path: "/faq",
          }),
          createFaqSchema(localizedFaqItems),
        ]}
        title={en ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
      />
      <PageHero
        breadcrumbLabel={en ? "FAQ" : "الأسئلة الشائعة"}
        eyebrow={en ? "FAQ" : "الأسئلة الشائعة"}
        title={en ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
        description={en ? "Clear answers to the questions most often asked before making a decision." : "إجابات واضحة عن أكثر الأسئلة التي تسبق قرارك."}
        variant="utility"
      />

      <section className="ds-section bg-[var(--color-surface)]">
        <div className="ds-container grid gap-12 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <motion.div
            className="lg:sticky lg:top-28 lg:self-start"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <p className="section-title-eyebrow">
              {en ? "FAQ" : "الأسئلة الشائعة"}
            </p>
            <h2 className="mt-4 text-[length:var(--text-heading)] font-black leading-tight text-[var(--color-heading)]">
              {en ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
            </h2>
            <p className="mt-6 max-w-md text-lg font-medium leading-9 text-[var(--color-text-muted)]">
              {en
                ? "Clear answers to the questions most often asked before making a decision."
                : "إجابات واضحة عن أكثر الأسئلة التي تسبق قرارك."}
            </p>
            <div className="mt-8 h-px w-16 bg-[var(--color-accent)]" />
          </motion.div>

          <motion.div
            className="border-t border-[var(--color-border)]"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {localizedFaqItems.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <motion.article
                  className="overflow-hidden border-b border-[var(--color-border)] bg-transparent"
                  key={`faq-${index}`}
                  layout={!shouldReduceMotion}
                  variants={cardItem}
                >
                  <h3>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      className="flex min-h-[3.25rem] w-full items-center justify-between gap-5 py-5 text-start text-lg font-black leading-8 text-[var(--color-heading)] outline-none transition-colors hover:text-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-accent-strong)] sm:gap-8 sm:py-7 sm:text-xl"
                      id={buttonId}
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? -1 : index,
                        )
                      }
                      type="button"
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center text-3xl font-medium text-[var(--color-accent-strong)]"
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                      >
                        {isOpen ? "×" : "+"}
                      </motion.span>
                    </button>
                  </h3>
                  <motion.div
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    id={panelId}
                    initial={false}
                    role="region"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="max-w-3xl pb-7 pe-12 text-base font-medium leading-8 text-[var(--color-text-muted)] sm:pe-16 sm:text-lg">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection
        pageType="faq"
        sourceSection={SOURCE_SECTIONS.FAQ}
        title={en ? "Did Not Find Your Answer?" : "ما لقيت إجابة لسؤالك؟"}
        description={en ? "Contact us on WhatsApp and we will help you find the answer or the appropriate department." : "تواصل معنا عبر واتساب، وسنساعدك في الوصول إلى الإجابة أو القسم المناسب."}
        primaryLabel={en ? "Ask Us on WhatsApp" : "اسألنا عبر واتساب"}
        whatsappMessage={en ? "Hello, I have a question about Kadina Center services." : "مرحبًا، لدي استفسار عن خدمات مركز كادينا."}
      />
    </div>
  );
}
