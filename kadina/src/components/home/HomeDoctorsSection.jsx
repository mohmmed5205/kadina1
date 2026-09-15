import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import DoctorsMarquee from "../doctors/DoctorsMarquee";
import SectionTitle from "../common/SectionTitle";
import { getDoctorDetails } from "../../data/doctors";

export default function HomeDoctorsSection() {
  const { lang } = useOutletContext();
  const doctors = getDoctorDetails(lang);

  return (
    <section className="ds-section scroll-mt-24 overflow-hidden bg-[var(--color-surface)]" id="doctors">
      <div className="ds-container">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionTitle eyebrow={lang === "ar" ? "فريق كادينا" : "Kadina team"} title={lang === "ar" ? "نخبة الاستشاريين.. تحت سقف واحد" : "Leading consultants under one roof"} />
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-muted)] lg:col-span-4 lg:justify-self-end">
            {lang === "ar" ? "تعرّف على الفريق، واختر الاستشاري الأقرب إلى احتياجك." : "Meet the team and find the consultant whose expertise matches your needs."}
          </p>
        </div>
      </div>
      <DoctorsMarquee doctors={doctors} lang={lang} leadingControl={
          <Link className="inline-flex min-h-11 items-center gap-3 border-b border-[var(--color-accent)] text-sm font-bold" to="/doctors">
            {lang === "ar" ? "تعرّف على كل الأطباء" : "View all doctors"}
            <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
          </Link>
      } />
    </section>
  );
}
