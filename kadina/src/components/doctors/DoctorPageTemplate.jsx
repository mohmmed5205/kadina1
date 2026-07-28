import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { doctorDetails } from "../../data/doctors";
import { createWhatsappUrl } from "../../utils/whatsapp";

function LinkCards({ items }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/70 p-5 font-black leading-7 text-[#4c2c00] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:text-[#cf7d11]"
          key={item.to}
          to={item.to}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default function DoctorPageTemplate({ doctor }) {
  const location = useLocation();

  if (!doctor) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description="تعذر العثور على صفحة الطبيب المطلوبة."
          noindex
          title="الطبيب غير موجود"
        />
        <section
          className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8"
          dir="rtl"
        >
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12">
            <h1 className="text-3xl font-black text-[#4c2c00]">
              الطبيب غير موجود
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              لم نتمكن من العثور على الطبيب المطلوب.
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to="/doctors"
            >
              العودة إلى الأطباء
            </Link>
          </div>
        </section>
      </>
    );
  }

  const canonicalPath = `/doctors/${doctor.slug}`;
  const seoDescription = doctor.shortBio || doctor.specialty || doctor.title;
  const personSchema = {
    "@type": "Person",
    name: doctor.name,
    url: absoluteUrl(canonicalPath),
    ...(doctor.title && { jobTitle: doctor.title }),
    ...(doctor.specialty && { medicalSpecialty: doctor.specialty }),
    ...(doctor.image && { image: absoluteUrl(doctor.image) }),
  };
  const doctorServicePaths = new Set(doctor.services.map((item) => item.to));
  const relatedDoctors = doctorDetails
    .filter(
      (candidate) =>
        candidate.slug !== doctor.slug &&
        candidate.services.some((service) =>
          doctorServicePaths.has(service.to),
        ),
    )
    .slice(0, 3);
  const focusAreas = [
    ...doctor.services.map((item) => item.title),
    ...doctor.devices.map((item) => item.title),
    ...doctor.solutions.map((item) => item.title),
  ];
  const whatsappUrl = createWhatsappUrl(doctor.whatsappMessage);

  return (
    <div dir="rtl">
      <Seo
        canonicalPath={canonicalPath}
        description={seoDescription}
        image={doctor.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الأطباء", path: "/doctors" },
            { name: doctor.name, path: canonicalPath },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: doctor.name,
            description: seoDescription,
            path: canonicalPath,
          }),
          personSchema,
        ]}
        title={`${doctor.name} — ${doctor.specialty || doctor.title}`}
      />
      <section className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "الأطباء", to: "/doctors" },
              { label: doctor.name },
            ]}
          />

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div className="flex aspect-[4/5] min-h-96 w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[#f8aa2d]/25 bg-white/65 shadow-[0_20px_55px_rgba(76,44,0,0.08)] sm:min-h-[30rem] lg:min-h-[34rem]">
              {doctor.image ? (
                <img
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top"
                  decoding="async"
                  height="1440"
                  src={doctor.image}
                  width="1080"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(248,170,45,0.2),rgba(255,247,235,0.9))] p-8 text-center text-3xl font-black leading-relaxed text-[#4c2c00]">
                  {doctor.name}
                </div>
              )}
            </div>

            <div>
              {doctor.title && (
                <p className="text-sm font-black tracking-wide text-[#cf7d11]">
                  {doctor.title}
                </p>
              )}
              <h1 className="mt-3 text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
                {doctor.name}
              </h1>
              {doctor.specialty && (
                <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#4c2c00]/72 sm:text-lg">
                  {doctor.specialty}
                </p>
              )}
              {doctor.shortBio && (
                <p className="mt-5 max-w-3xl font-medium leading-8 text-[#4c2c00]/68">
                  {doctor.shortBio}
                </p>
              )}
              {doctor.yearsOfExperience !== null && (
                <div className="mt-7 inline-flex rounded-full border border-[#f8aa2d]/30 bg-[#f8aa2d]/12 px-5 py-3 font-black text-[#4c2c00]">
                  الخبرة: {doctor.yearsOfExperience} سنة
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {focusAreas.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={doctor.name} title="مجالات التميز" />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {focusAreas.map((area) => (
                <li
                  className="flex gap-3 rounded-2xl border border-[#4c2c00]/10 bg-[#fff7eb] p-4 font-bold leading-7 text-[#4c2c00]/72"
                  key={area}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f8aa2d]"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(doctor.services.length > 0 ||
        doctor.devices.length > 0 ||
        doctor.solutions.length > 0) && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
            {doctor.services.length > 0 && (
              <div>
                <SectionTitle title="الخدمات المرتبطة" />
                <LinkCards items={doctor.services} />
              </div>
            )}
            {doctor.devices.length > 0 && (
              <div>
                <SectionTitle title="الأجهزة المرتبطة" />
                <LinkCards items={doctor.devices} />
              </div>
            )}
            {doctor.solutions.length > 0 && (
              <div>
                <SectionTitle title="الحلول المرتبطة" />
                <LinkCards items={doctor.solutions} />
              </div>
            )}
          </div>
        </section>
      )}

      {doctor.socialLinks.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="حسابات الطبيب" />
            <div className="mt-6 flex flex-wrap gap-3">
              {doctor.socialLinks.map((socialLink) => (
                <a
                  aria-label={`${socialLink.label} (يفتح في نافذة جديدة)`}
                  className="rounded-full border border-[#f8aa2d]/30 bg-[#fff7eb] px-5 py-3 font-black text-[#4c2c00]"
                  href={socialLink.url}
                  key={socialLink.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {socialLink.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedDoctors.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title="أطباء ذوو تخصص قريب" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDoctors.map((relatedDoctor) => (
                <Link
                  className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  key={relatedDoctor.slug}
                  to={`/doctors/${relatedDoctor.slug}`}
                >
                  <h3 className="text-lg font-black text-[#4c2c00]">
                    {relatedDoctor.name}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-[#4c2c00]/60">
                    {relatedDoctor.specialty}
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
            احجز مع {doctor.name}
          </h2>
          <a
            aria-label="احجز استشارتك عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            احجز استشارتك عبر واتساب
          </a>
          <div>
            <Link
              className="mt-6 inline-block font-black text-[#fff7eb]/75 underline decoration-[#f8aa2d]/45 underline-offset-8 transition hover:text-[#f8aa2d]"
              to="/doctors"
            >
              العودة إلى جميع الأطباء
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
