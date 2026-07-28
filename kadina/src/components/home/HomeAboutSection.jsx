import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { aboutContent } from "../../data/about";

export default function HomeAboutSection() {
  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="about"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionTitle
            eyebrow="من نحن"
            title="مركز واحد في قلب الرياض"
            description={aboutContent.intro}
          />
          <p className="mt-6 font-medium leading-9 text-[#4c2c00]/72">
            {aboutContent.story}
          </p>
          <Link
            className="mt-6 inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/about"
          >
            اعرف أكثر عن كادينا
          </Link>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)]">
            <h3 className="text-xl font-black text-[#4c2c00]">رؤيتنا</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {aboutContent.vision}
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)]">
            <h3 className="text-xl font-black text-[#4c2c00]">رسالتنا</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {aboutContent.mission}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
