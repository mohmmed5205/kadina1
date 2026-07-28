import { useState } from "react";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { faqs } from "../data/pagesContent";

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
          createFaqSchema(faqs),
        ]}
        title="الأسئلة الشائعة"
      />
      <PageHero
        breadcrumbLabel="الأسئلة الشائعة"
        eyebrow="قبل الحجز"
        title="الأسئلة الشائعة"
        description="إجابات واضحة تساعدك على اتخاذ قرارك قبل الحجز."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="أسئلة متكررة"
            title="ما الذي تود معرفته؟"
          />
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <article
                  className="overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb]"
                  key={faq.question}
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
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="هل أنت مستعد لخطوتك الأولى؟"
        description="احجز جلسة تقييم ليحدد الطبيب الأنسب لك."
      />
    </div>
  );
}
