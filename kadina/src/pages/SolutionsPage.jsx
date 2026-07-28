import { Link } from "react-router-dom";
import CardGrid from "../components/common/CardGrid";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { solutionDetails } from "../data/solutions";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function SolutionsPage() {
  const whatsappUrl = createWhatsappUrl(
    "مرحبًا، أرغب في استشارة بخصوص إحدى المشاكل والحلول.",
  );

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/solutions"
        description="اختر المشكلة التي تزعجك وتعرّف على حلول كادينا للتعرق وتساقط الشعر وآثار الحبوب والتصبغات والعناية بالبشرة والقوام."
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المشاكل والحلول", path: "/solutions" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: "المشاكل والحلول في كادينا",
            description:
              "حلول كادينا لمشكلات البشرة والشعر والوجه والجسم.",
            path: "/solutions",
          }),
        ]}
        title="المشاكل والحلول في كادينا"
      />
      <PageHero
        breadcrumbLabel="المشاكل والحلول"
        eyebrow="المشاكل والحلول"
        title="مشكلتك لها حل... ونعرفه بالاسم"
        description="قد لا تعرف اسم الجهاز أو الإجراء، ولا يلزمك ذلك. اختر ما يزعجك، وسنريك كيف نعالجه في كادينا."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="اختر ما يزعجك"
            title="ابدأ من اسم المشكلة"
            description="تصفّح الحلول حسب الوجه، الجسم، الشعر، والبشرة."
          />
          <CardGrid className="mt-9">
            {solutionDetails.map((solution) => (
              <Link
                className="group rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                key={solution.slug}
                to={`/solutions/${solution.slug}`}
              >
                <span className="rounded-full bg-[#f8aa2d]/15 px-3 py-1 text-xs font-black text-[#cf7d11]">
                  {solution.category}
                </span>
                <h3 className="mt-7 text-xl font-black text-[#4c2c00]">
                  {solution.shortTitle}
                </h3>
                <span className="mt-5 inline-block font-black text-[#cf7d11]">
                  اعرف الحل
                </span>
              </Link>
            ))}
          </CardGrid>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            حل كادينا يبدأ بتشخيص واضح
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#fff7eb]/75">
            اختر ما يزعجك، ثم اطلب استشارتك.
          </p>
          <a
            aria-label="استشرنا عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            استشرنا عبر واتساب
          </a>
        </div>
      </section>
    </div>
  );
}
