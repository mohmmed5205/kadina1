import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardGrid from "../components/common/CardGrid";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { servicePagesBySlug } from "../data/services";
import { createWhatsappUrl } from "../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

export default function ServicePageTemplate({ slug }) {
  const service = servicePagesBySlug[slug];

  if (!service) return null;

  const ctaButton = (
    <a
      aria-label={`${service.ctaLabel} عبر واتساب (يفتح في نافذة جديدة)`}
      className="inline-flex rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] shadow-[0_14px_34px_rgba(207,125,17,0.28)] transition hover:bg-[#cf7d11] hover:text-white"
      href={createWhatsappUrl(service.whatsappMessage)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {service.ctaLabel}
    </a>
  );

  return (
    <div dir="rtl">
      <Seo
        canonicalPath={`/services/${service.slug}`}
        description={service.seoDescription}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            {
              name: service.title,
              path: `/services/${service.slug}`,
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: service.seoSubtitle,
            description: service.seoDescription,
            path: `/services/${service.slug}`,
          }),
          createFaqSchema(service.seoFaq),
        ]}
        title={`${service.title} — ${service.seoSubtitle}`}
      />
      <PageHero
        breadcrumbItems={[
          { label: "الخدمات", to: "/services" },
          { label: service.title },
        ]}
        eyebrow="خدمات كادينا"
        title={service.subtitle}
      />

      <motion.section
        className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-lg font-medium leading-9 text-[#4c2c00]/75 sm:text-xl">
            {service.intro}
          </p>
          {service.additionalParagraphs.map((paragraph) => (
            <p
              className="mt-5 text-lg font-medium leading-9 text-[#4c2c00]/75 sm:text-xl"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
          {service.relatedDevices.length === 0 && (
            <div className="mt-8">{ctaButton}</div>
          )}
        </div>
      </motion.section>

      {service.treatments.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="ماذا نعالج؟" />
            <CardGrid className="mt-8">
              {service.treatments.map((treatment) => (
                <motion.article
                  className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/75 p-5 font-black text-[#4c2c00]"
                  key={treatment}
                  variants={cardItem}
                >
                  {treatment}
                </motion.article>
              ))}
            </CardGrid>
          </div>
        </section>
      )}

      {service.relatedDevices.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="الأجهزة المرتبطة" />
            <CardGrid className="mt-8">
              {service.relatedDevices.map((device) => (
                <MotionLink
                  className="group overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={device.to}
                  to={device.to}
                  variants={cardItem}
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/75 p-5">
                    <img
                      alt={device.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      decoding="async"
                      loading="lazy"
                      src={device.image}
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl font-black text-[#4c2c00]"
                      dir="ltr"
                    >
                      {device.name}
                    </h3>
                    {device.use && (
                      <p className="mt-3 font-bold leading-7 text-[#4c2c00]/62">
                        {device.use}
                      </p>
                    )}
                    <span className="mt-5 inline-block rounded-full border border-[#f8aa2d]/35 px-4 py-2 text-sm font-black text-[#cf7d11] transition group-hover:bg-[#f8aa2d] group-hover:text-[#2b1b08]">
                      التفاصيل
                    </span>
                  </div>
                </MotionLink>
              ))}
            </CardGrid>
            <div className="mt-8">{ctaButton}</div>
          </div>
        </section>
      )}

      {service.faq.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle eyebrow="قبل الحجز" title="الأسئلة الشائعة" />
            <motion.div
              className="mt-8 space-y-4"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {service.faq.map((item) => (
                <motion.details
                  className="group rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 open:shadow-[0_14px_35px_rgba(76,44,0,0.07)]"
                  key={item.question}
                  variants={cardItem}
                >
                  <summary className="cursor-pointer list-none pr-1 text-lg font-black text-[#4c2c00] outline-none marker:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-4 border-t border-[#f8aa2d]/15 pt-4 font-medium leading-8 text-[#4c2c00]/70">
                    {item.answer}
                  </p>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
