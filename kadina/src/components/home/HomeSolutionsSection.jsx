import { Link } from "react-router-dom";
import CardGrid from "../common/CardGrid";
import SectionTitle from "../common/SectionTitle";
import { solutionDetails } from "../../data/solutions";

export default function HomeSolutionsSection() {
  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="solutions"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="المشاكل والحلول"
          title="ابدأ من اسم المشكلة"
          description="اختر ما يزعجك، وتعرّف على الحلول المتاحة في كادينا."
        />
        <CardGrid className="mt-9">
          {solutionDetails.map((solution) => (
            <Link
              className="group rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
            >
              <span className="rounded-full bg-[#f8aa2d]/15 px-3 py-1 text-xs font-black text-[#cf7d11]">
                {solution.category}
              </span>
              <h3 className="mt-6 text-xl font-black text-[#4c2c00]">
                {solution.shortTitle}
              </h3>
              <span className="mt-5 inline-block font-black text-[#cf7d11]">
                اعرف الحل
              </span>
            </Link>
          ))}
        </CardGrid>
        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/solutions"
          >
            عرض جميع الحلول
          </Link>
        </div>
      </div>
    </section>
  );
}
