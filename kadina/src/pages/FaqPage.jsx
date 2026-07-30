import { useState } from "react";
import { motion } from "framer-motion";
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

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/faq"
        description="إجابات كادينا عن أجهزة الليزر والهايفو والبوتوكس والفيلر وعلاجات تساقط الشعر والموقع ومواعيد العمل."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الأسئلة الشائعة", path: "/faq" },
          ]),
          createWebPageSchema({
            name: "الأسئلة الشائعة",
            description:
              "إجابات واضحة عن خدمات وتقنيات كادينا قبل الحجز.",
            path: "/faq",
          }),
          createFaqSchema(faqItems),
        ]}
        title="الأسئلة الشائعة"
      />
      <PageHero
        breadcrumbLabel="الأسئلة الشائعة"
        eyebrow="الأسئلة الشائعة"
        title="الأسئلة الشائعة"
        description="إجابات واضحة عن أكثر الأسئلة التي تسبق قرارك."
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
            {faqItems.map((faq, index) => {
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
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-right text-base font-black text-[#4c2c00] outline-none transition hover:bg-[#f8aa2d]/10 focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#f8aa2d]/35 sm:px-6 sm:text-lg"
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
        title="ما لقيت إجابة لسؤالك؟"
        description="تواصل معنا عبر واتساب، وسنساعدك في الوصول إلى الإجابة أو القسم المناسب."
        primaryLabel="اسألنا عبر واتساب"
        whatsappMessage="مرحبًا، لدي استفسار عن خدمات مركز كادينا."
      />
    </div>
  );
}
