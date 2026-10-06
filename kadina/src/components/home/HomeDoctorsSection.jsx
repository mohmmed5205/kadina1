import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import DoctorsMarquee from "../doctors/DoctorsMarquee";
import { getDoctorDetails } from "../../data/doctors";

export default function HomeDoctorsSection() {
  const { lang } = useOutletContext();
  return (
    <section className="home-doctors home-section" id="doctors" aria-labelledby="home-doctors-title">
      <div className="ds-container home-heading">
        <h2 id="home-doctors-title">{lang === "ar" ? "نخبة الاستشاريين.. تحت سقف واحد" : "Leading consultants under one roof"}</h2>
        <Link className="ds-text-link" to="/doctors">{lang === "ar" ? "استعرض جميع الأطباء" : "View all doctors"}</Link>
      </div>
      <DoctorsMarquee doctors={getDoctorDetails(lang)} lang={lang} />
    </section>
  );
}
