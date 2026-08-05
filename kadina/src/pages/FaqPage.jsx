import { useState } from "react";
import { motion } from "framer-motion";
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
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

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
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="space-y-4"
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
                  className="overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb]"
                  key={faq.question}
                  variants={cardItem}
                >
                  <h2>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-start text-base font-black text-[#4c2c00] outline-none transition hover:bg-[#f8aa2d]/10 focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#f8aa2d]/35 sm:px-6 sm:text-lg"
                      id={buttonId}
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? -1 : index,
                        )
                      }
                      type="button"
                    >
                      <span>{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl text-[#cf7d11]"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h2>
                  <div
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    id={panelId}
                    role="region"
                  >
                    <p className="border-t border-[#f8aa2d]/15 px-5 py-5 font-medium leading-8 text-[#4c2c00]/70 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection
        title={en ? "Did Not Find Your Answer?" : "ما لقيت إجابة لسؤالك؟"}
        description={en ? "Contact us on WhatsApp and we will help you find the answer or the appropriate department." : "تواصل معنا عبر واتساب، وسنساعدك في الوصول إلى الإجابة أو القسم المناسب."}
        primaryLabel={en ? "Ask Us on WhatsApp" : "اسألنا عبر واتساب"}
        whatsappMessage={en ? "Hello, I have a question about Kadina Center services." : "مرحبًا، لدي استفسار عن خدمات مركز كادينا."}
      />
    </div>
  );
}
