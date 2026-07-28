import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { doctorDetails } from "../data/doctors";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function DoctorsPage() {
  const whatsappUrl = createWhatsappUrl(
    "مرحبًا، أرغب في حجز استشارة مع أحد أطباء كادينا.",
  );

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/doctors"
        description="تعرّف على فريق استشاريي كادينا في الجلدية والليزر والحقن التجميلي وجراحة التجميل وزراعة الشعر."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الأطباء", path: "/doctors" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "أطباء كادينا الاستشاريون",
            description:
              "فريق استشاريي كادينا في الجلدية والليزر والتجميل وزراعة الشعر.",
            path: "/doctors",
          }),
        ]}
        title="أطباء كادينا الاستشاريون"
      />
      <PageHero
        breadcrumbLabel="الأطباء"
        eyebrow="فريق كادينا"
        title="نخبة الاستشاريين... تحت سقف واحد"
        description="في كادينا لا يقابلك «طبيب مناوب»، بل استشاري متخصص في حالتك تحديدًا. تعرّف على الفريق، واختر طبيبك، واحجز معه مباشرة."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="فريق الاستشاريين"
            title="تعرّف على أطباء كادينا"
            description="التخصصات والخبرة كما وردت في البطاقات الرسمية ضمن ملف المحتوى."
          />
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {doctorDetails.map((doctor) => (
              <article
                className="overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.08)]"
                key={doctor.slug}
              >
                <div className="flex aspect-[4/5] min-h-[220px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(248,170,45,0.24),rgba(255,247,235,0.85))] md:min-h-[260px]">
                  {doctor.image ? (
                    <img
                      alt={doctor.name}
                      className="h-full w-full object-cover object-top"
                      decoding="async"
                      height="1440"
                      loading="lazy"
                      src={doctor.image}
                      width="1080"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6">
                      <span className="max-w-52 text-center text-2xl font-black leading-relaxed text-[#4c2c00]">
                        {doctor.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#4c2c00]">
                    {doctor.name}
                  </h3>
                  <p className="mt-3 min-h-20 leading-7 text-[#4c2c00]/70">
                    {doctor.specialty}
                  </p>
                  {doctor.yearsOfExperience !== null && (
                    <p className="mt-4 text-sm font-black text-[#cf7d11]">
                      الخبرة: {doctor.yearsOfExperience} سنة
                    </p>
                  )}
                  <Link
                    className="mt-5 inline-block font-black text-[#cf7d11]"
                    to={`/doctors/${doctor.slug}`}
                  >
                    الملف التعريفي
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-[1.5rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 text-sm font-bold leading-7 text-[#4c2c00]/68">
            تُستكمل النبذ المهنية التفصيلية من السير الذاتية الرسمية للأطباء
            قبل النشر.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            اختر طبيبك واحجز معه
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#fff7eb]/75">
            استشاري متخصص في حالتك تحديدًا.
          </p>
          <a
            aria-label="احجز استشارتك عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </section>
    </div>
  );
}
