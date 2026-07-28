import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { faqs } from "../../data/pagesContent";

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="faq"
    >
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="قبل الحجز"
          title="الأسئلة الشائعة"
          description="إجابات واضحة تساعدك على اتخاذ قرارك قبل الحجز."
        />
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `home-faq-panel-${index}`;
            const buttonId = `home-faq-button-${index}`;

            return (
              <article
                className="overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/75"
                key={faq.question}
              >
                <h3>
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
                </h3>
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
        <div className="mt-8 text-center">
          <Link
            className="font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/faq"
          >
            صفحة الأسئلة الشائعة
          </Link>
        </div>
      </div>
    </section>
  );
}
