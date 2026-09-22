import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import DoctorsMarquee from "../doctors/DoctorsMarquee";
import { getDoctorDetails } from "../../data/doctors";

export default function HomeDoctorsSection() {
  const { lang } = useOutletContext();
  const doctors = getDoctorDetails(lang);

  return (
    <section className="overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24" id="doctors">
      <div className="ds-container !max-w-5xl">
        <div className="relative max-w-4xl">
          <span className="pointer-events-none absolute -start-8 -top-10 text-[12rem] font-black leading-none text-[var(--color-accent)] opacity-[.035]" aria-hidden="true">K</span>
          <h2 className="relative text-[clamp(2.35rem,6vw,5.75rem)] font-black leading-[1.18] text-[var(--color-accent)]">
            {lang === "ar"
              ? "نخبة من الاستشاريين تحت سقف واحد"
              : "Leading consultants under one roof"}
          </h2>
          <Link
            className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[var(--color-border-strong)] px-6 text-sm font-black text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            to="/doctors"
          >
            {lang === "ar" ? "استعرض جميع الأطباء" : "View all doctors"}
          </Link>
        </div>
      </div>

      <div className="mt-10 sm:mt-12">
        <DoctorsMarquee doctors={doctors} lang={lang} />
      </div>
    </section>
  );
}
