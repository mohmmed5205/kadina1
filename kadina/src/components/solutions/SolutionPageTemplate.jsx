import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { solutionDetailsBySlug } from "../../data/solutions";
import { createWhatsappUrl } from "../../utils/whatsapp";

function SolutionList({ items }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          className="flex gap-3 rounded-2xl border border-[#4c2c00]/10 bg-white/65 p-4 font-medium leading-7 text-[#4c2c00]/72"
          key={item}
        >
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f8aa2d]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12">
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
          </div>
        </section>
      </>
    );
  }

  const relatedSolutions = solution.relatedSolutions
    .map((slug) => solutionDetailsBySlug[slug])
    .filter(Boolean);
  const whatsappUrl = createWhatsappUrl(solution.whatsappMessage);

  return (
    <div dir="rtl">
      <Seo
        canonicalPath={`/solutions/${solution.slug}`}
        description={solution.isThisYou || solution.painHeadline}
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
            name: solution.painHeadline,
            description: solution.isThisYou || solution.painHeadline,
            path: `/solutions/${solution.slug}`,
          }),
        ]}
        title={`${solution.shortTitle} — ${solution.painHeadline}`}
      />
      <section className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "المشاكل والحلول", to: "/solutions" },
              { label: solution.shortTitle },
            ]}
          />

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-black tracking-wide text-[#cf7d11]">
                {solution.title}
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
                {solution.painHeadline}
              </h1>
              {solution.intro && (
                <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#4c2c00]/72 sm:text-lg">
                  {solution.intro}
                </p>
              )}
            </div>

            <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-[2rem] border border-[#f8aa2d]/25 bg-white/65 shadow-[0_20px_55px_rgba(76,44,0,0.08)] sm:min-h-96">
              {solution.image ? (
                <img
                  alt={solution.title}
                  className="h-full max-h-[34rem] w-full object-cover"
                  decoding="async"
                  height="1440"
                  src={solution.image}
                  width="1080"
                />
              ) : (
                <div className="flex min-h-72 w-full items-center justify-center bg-[linear-gradient(135deg,rgba(248,170,45,0.2),rgba(255,247,235,0.9))] p-8 text-center text-2xl font-black leading-relaxed text-[#4c2c00] sm:min-h-96">
                  {solution.shortTitle}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {solution.isThisYou && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="بداية الفهم" title="هل هذا أنت؟" />
            <p className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[#4c2c00]/72">
              {solution.isThisYou}
            </p>
          </div>
        </section>
      )}

      {solution.signs.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="علامات المشكلة" />
            <SolutionList items={solution.signs} />
          </div>
        </section>
      )}

      {solution.kadinaSolution.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={solution.title} title="حل كادينا" />
            <SolutionList items={solution.kadinaSolution} />
          </div>
        </section>
      )}

      {(solution.whatToExpect || solution.reassurance) && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            {solution.whatToExpect && (
              <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/70 p-6">
                <h2 className="text-xl font-black text-[#4c2c00]">
                  ما المتوقع
                </h2>
                <p className="mt-4 font-medium leading-8 text-[#4c2c00]/70">
                  {solution.whatToExpect}
                </p>
              </article>
            )}
            {solution.reassurance && (
              <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#4c2c00] p-6">
                <h2 className="text-xl font-black text-[#fff7eb]">
                  رسالة كادينا
                </h2>
                <p className="mt-4 font-medium leading-8 text-[#fff7eb]/78">
                  {solution.reassurance}
                </p>
              </article>
            )}
          </div>
        </section>
      )}

      {(solution.relatedServices.length > 0 ||
        solution.relatedDevices.length > 0) && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            {solution.relatedServices.length > 0 && (
              <div>
                <SectionTitle title="الخدمات المرتبطة" />
                <div className="mt-6 grid gap-4">
                  {solution.relatedServices.map((service) => (
                    <Link
                      className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 font-black text-[#4c2c00] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:text-[#cf7d11]"
                      key={service.to}
                      to={service.to}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {solution.relatedDevices.length > 0 && (
              <div>
                <SectionTitle title="الأجهزة المرتبطة" />
                <div className="mt-6 grid gap-4">
                  {solution.relatedDevices.map((device) => (
                    <Link
                      className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 font-black text-[#4c2c00] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:text-[#cf7d11]"
                      key={device.to}
                      to={device.to}
                    >
                      {device.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {relatedSolutions.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="حلول ذات صلة" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSolutions.map((relatedSolution) => (
                <Link
                  className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={relatedSolution.slug}
                  to={`/solutions/${relatedSolution.slug}`}
                >
                  <h3 className="text-lg font-black text-[#4c2c00]">
                    {relatedSolution.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-[#4c2c00]/60">
                    {relatedSolution.painHeadline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            استشارة بخصوص {solution.shortTitle}
          </h2>
          <a
            aria-label="استشرنا عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            استشرنا عبر واتساب
          </a>
          <div>
            <Link
              className="mt-6 inline-block font-black text-[#fff7eb]/75 underline decoration-[#f8aa2d]/45 underline-offset-8 transition hover:text-[#f8aa2d]"
              to="/solutions"
            >
              العودة إلى جميع الحلول
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
