import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import PageHero from "../common/PageHero";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { createWhatsappUrl } from "../../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

function SolutionList({ items }) {
  return (
    <motion.ul
      className="mt-6 grid gap-4 sm:grid-cols-2"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.li
          className="flex gap-3 rounded-2xl border border-[#4c2c00]/10 bg-white/65 p-4 font-medium leading-7 text-[#4c2c00]/72"
          key={item}
          variants={cardItem}
        >
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f8aa2d]"
          />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function RelatedLinks({ items }) {
  if (!items?.length) return null;

  return (
    <motion.div
      className="mt-7 flex flex-wrap gap-3"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.div key={item.to} variants={cardItem}>
          <Link
            className="inline-flex rounded-full border border-[#f8aa2d]/40 bg-[#fff7eb] px-5 py-2.5 font-black text-[#4c2c00] transition hover:border-[#f8aa2d] hover:text-[#cf7d11]"
            to={item.to}
          >
            {item.title}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function SolutionPageTemplate({ solution }) {
  const location = useLocation();

  if (!solution) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description="الحل المطلوب غير موجود ضمن صفحات المشاكل والحلول في كادينا."
          noindex
          title="الحل غير موجود"
        />
        <section
          className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8"
          dir="rtl"
        >
          <motion.div
            animate="visible"
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[#4c2c00]">
              الحل غير موجود
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              لم نتمكن من العثور على الحل المطلوب.
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to="/solutions"
            >
              العودة إلى الحلول
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  const whatsappUrl = createWhatsappUrl(solution.whatsappMessage);

  return (
    <div dir="rtl">
      <Seo
        canonicalPath={`/solutions/${solution.slug}`}
        description={solution.seoDescription}
        image={solution.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المشاكل والحلول", path: "/solutions" },
            {
              name: solution.shortTitle,
              path: `/solutions/${solution.slug}`,
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: solution.seoPainHeadline,
            description: solution.seoDescription,
            path: `/solutions/${solution.slug}`,
          }),
        ]}
        title={`${solution.shortTitle} — ${solution.seoPainHeadline}`}
      />
      <PageHero
        breadcrumbItems={[
          { label: "المشكلات والحلول", to: "/solutions" },
          { label: solution.shortTitle },
        ]}
        description={solution.intro}
        eyebrow={solution.title}
        title={solution.painHeadline}
      />

      {solution.isThisYou && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="بداية الفهم" title="هل هذا أنت؟" />
            <motion.p
              className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[#4c2c00]/72"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {solution.isThisYou}
            </motion.p>
            {solution.signs.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-black text-[#4c2c00]">
                  علامات المشكلة
                </h3>
                <SolutionList items={solution.signs} />
              </>
            )}
          </div>
        </section>
      )}

      {solution.kadinaSolution.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="حل كادينا" />
            {solution.kadinaSolutionTitle && (
              <h3 className="mt-6 text-xl font-black text-[#4c2c00] sm:text-2xl">
                {solution.kadinaSolutionTitle}
              </h3>
            )}
            {solution.compact ? (
              <motion.p
                className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[#4c2c00]/72"
                initial="hidden"
                variants={fadeUp}
                viewport={viewportOnce}
                whileInView="visible"
              >
                {solution.kadinaSolution[0]}
              </motion.p>
            ) : (
              <SolutionList items={solution.kadinaSolution} />
            )}
            {solution.kadinaSolutionSupport && (
              <motion.p
                className="mt-6 max-w-4xl font-medium leading-8 text-[#4c2c00]/72"
                initial="hidden"
                variants={fadeUp}
                viewport={viewportOnce}
                whileInView="visible"
              >
                {solution.kadinaSolutionSupport}
              </motion.p>
            )}
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {solution.relatedDevices.length > 0 && (
                <div>
                  <h3 className="text-lg font-black text-[#4c2c00]">
                    الأجهزة المستخدمة
                  </h3>
                  <RelatedLinks items={solution.relatedDevices} />
                </div>
              )}
              {solution.relatedServices.length > 0 && (
                <div>
                  <h3 className="text-lg font-black text-[#4c2c00]">
                    الخدمات المرتبطة
                  </h3>
                  <RelatedLinks items={solution.relatedServices} />
                </div>
              )}
              {solution.relatedDoctor && (
                <div>
                  <h3 className="text-lg font-black text-[#4c2c00]">
                    الطبيب المختص
                  </h3>
                  <RelatedLinks items={[solution.relatedDoctor]} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {solution.whatToExpect && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="ماذا تتوقع؟" />
            <motion.p
              className="mt-6 max-w-4xl font-medium leading-8 text-[#4c2c00]/70"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {solution.whatToExpect}
            </motion.p>
          </div>
        </section>
      )}

      <motion.section
        className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          {solution.reassurance && (
            <p className="mb-7 text-xl font-black leading-9 text-[#fff7eb] sm:text-2xl">
              {solution.reassurance}
            </p>
          )}
          <a
            aria-label={`${solution.ctaLabel} عبر واتساب (يفتح في نافذة جديدة)`}
            className="inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] shadow-[0_14px_34px_rgba(207,125,17,0.28)] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {solution.ctaLabel}
          </a>
        </div>
      </motion.section>

      {(solution.relatedDevices[0] ||
        solution.relatedDoctor ||
        solution.relatedArticle) && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="روابط تساعدك على الخطوة التالية" />
            <motion.div
              className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {solution.relatedDevices[0] && (
                <RelatedCard
                  eyebrow="الجهاز المستخدم"
                  item={solution.relatedDevices[0]}
                />
              )}
              {solution.relatedDoctor && (
                <RelatedCard
                  eyebrow="الطبيب المختص"
                  item={solution.relatedDoctor}
                />
              )}
              {solution.relatedArticle && (
                <RelatedCard
                  eyebrow="مقال ذو صلة"
                  item={solution.relatedArticle}
                />
              )}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

function RelatedCard({ eyebrow, item }) {
  return (
    <motion.article variants={cardItem}>
      <Link
        className="group flex h-full flex-col rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
        to={item.to}
      >
        <span className="text-sm font-black text-[#cf7d11]">{eyebrow}</span>
        <h3 className="mt-3 text-xl font-black leading-8 text-[#4c2c00]">
          {item.title}
        </h3>
        <span className="mt-5 font-black text-[#cf7d11]">اعرف المزيد</span>
      </Link>
    </motion.article>
  );
}
