import CTASection from "../components/common/CTASection";
import CardGrid from "../components/common/CardGrid";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import {
  contactAddress,
  contactHours,
  contactItems,
  contactMapUrl,
} from "../data/contact";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function ContactPage() {
  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/contact"
        description="تواصل مع مركز كادينا في الرياض على الطريق الدائري الشمالي عبر الهاتف أو واتساب أو البريد الإلكتروني."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "تواصل معنا", path: "/contact" },
          ]),
          createWebPageSchema({
            name: "تواصل مع كادينا",
            description:
              "بيانات التواصل والموقع ومواعيد مركز كادينا في الرياض.",
            path: "/contact",
          }),
        ]}
        title="تواصل مع كادينا"
      />
      <PageHero
        breadcrumbLabel="تواصل معنا"
        eyebrow="تواصل معنا"
        title="نسمعك... قبل أن نعالجك"
        description="تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="بيانات التواصل"
            title="نحن هنا للإجابة عنك"
          />
          <CardGrid className="mt-9">
            {contactItems.map((item) => (
              <motion.article
                className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]"
                key={item.title}
                variants={cardItem}
              >
                <h3 className="text-lg font-black text-[#4c2c00]">
                  {item.title}
                </h3>
                <p className="mt-3 break-words text-lg font-bold text-[#4c2c00]/68">
                  {item.value}
                </p>
                <a
                  aria-label={
                    item.external
                      ? `${item.label} (يفتح في نافذة جديدة)`
                      : undefined
                  }
                  className="mt-6 inline-block font-black text-[#cf7d11]"
                  href={item.href}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.label}
                </a>
              </motion.article>
            ))}
          </CardGrid>

          <motion.div
            className="mt-8 grid gap-5 lg:grid-cols-2"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <motion.article
              className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-[#fff7eb]/75 p-6"
              variants={cardItem}
            >
              <h2 className="text-xl font-black text-[#4c2c00]">الموقع</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {contactAddress}
              </p>
              <a
                aria-label="افتح الخريطة (يفتح في نافذة جديدة)"
                className="mt-5 inline-block font-black text-[#cf7d11]"
                href={contactMapUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                افتح الخريطة
              </a>
            </motion.article>

            <motion.article
              className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-[#fff7eb]/75 p-6"
              variants={cardItem}
            >
              <h2 className="text-xl font-black text-[#4c2c00]">المواعيد</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {contactHours.days}
                <br />
                {contactHours.time}
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="نسمعك قبل أن نعالجك"
        description="احجز استشارتك، وسيتواصل معك فريق كادينا."
      />
    </div>
  );
}
import { motion } from "framer-motion";
