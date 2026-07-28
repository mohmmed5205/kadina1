import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { servicePages, servicePagesBySlug } from "../data/services";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function ServicePageTemplate({ slug }) {
  const service = servicePagesBySlug[slug];

  if (!service) return null;

  const otherServices = servicePages.filter((item) => item.slug !== slug);
  const whatsappMessage = `مرحبًا، أرغب في حجز استشارة لخدمة ${service.title}.`;
  const whatsappUrl = createWhatsappUrl(whatsappMessage);

  return (
    <div dir="rtl">
      <Seo
        canonicalPath={`/services/${service.slug}`}
        description={service.intro}
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
            name: service.subtitle,
            description: service.intro,
            path: `/services/${service.slug}`,
          }),
          createFaqSchema(service.faq),
        ]}
        title={`${service.title} — ${service.subtitle}`}
      />
      <PageHero
        breadcrumbLabel={service.title}
        eyebrow="خدمات كادينا"
        title={service.subtitle}
        description={service.intro}
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={service.title}
            title="لماذا هذه الخدمة"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.whyChoose.map((reason, index) => (
              <article
                className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)]"
                key={reason}
              >
                <span className="text-sm font-black text-[#cf7d11]">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-black leading-8 text-[#4c2c00]">
                  {reason}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {service.relatedDevices.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="التقنيات"
              title="الأجهزة المرتبطة"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedDevices.map((device) => (
                <Link
                  className="group rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={device.to}
                  to={device.to}
                >
                  <h3
                    className="text-xl font-black text-[#4c2c00]"
                    dir="ltr"
                  >
                    {device.name}
                  </h3>
                  <p className="mt-3 font-bold text-[#4c2c00]/62">
                    {device.use}
                  </p>
                  <span className="mt-5 inline-block text-sm font-black text-[#cf7d11]">
                    التفاصيل
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="الفريق"
            title="الأطباء المرتبطون"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {service.relatedDoctors.map((doctor) => (
              <Link
                className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                key={doctor.title}
                to={doctor.to}
              >
                <h3 className="text-xl font-black text-[#4c2c00]">
                  {doctor.title}
                </h3>
                <p className="mt-3 leading-7 text-[#4c2c00]/68">
                  {doctor.description}
                </p>
                <span className="mt-5 inline-block font-black text-[#cf7d11]">
                  تعرّف على الأطباء
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="قبل الحجز" title="الأسئلة الشائعة" />
          <div className="mt-8 space-y-4">
            {service.faq.map((item) => (
              <details
                className="group rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/75 p-5 open:shadow-[0_14px_35px_rgba(76,44,0,0.07)]"
                key={item.question}
              >
                <summary className="cursor-pointer list-none pr-1 text-lg font-black text-[#4c2c00] outline-none marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-4 border-t border-[#f8aa2d]/15 pt-4 font-medium leading-8 text-[#4c2c00]/70">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="خدمات كادينا" title="خدمات أخرى" />
          <div className="mt-7 flex flex-wrap gap-3">
            {otherServices.map((item) => (
              <Link
                className="rounded-full border border-[#4c2c00]/15 bg-[#fff7eb] px-5 py-3 font-black text-[#4c2c00] transition hover:border-[#f8aa2d] hover:text-[#cf7d11]"
                key={item.slug}
                to={`/services/${item.slug}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-5 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            {service.cta}
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              aria-label="احجز استشارتك عبر واتساب (يفتح في نافذة جديدة)"
              className="rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {service.cta}
            </a>
          </div>
          <div>
            <Link
              className="mt-6 inline-block font-black text-[#fff7eb]/75 underline decoration-[#f8aa2d]/45 underline-offset-8 transition hover:text-[#f8aa2d]"
              to="/services"
            >
              العودة إلى جميع الخدمات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
