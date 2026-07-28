import { useParams } from "react-router-dom";
import DoctorPageTemplate from "../components/doctors/DoctorPageTemplate";
import { doctorDetailsBySlug } from "../data/doctors";

export default function DoctorDetailPage() {
  const { doctorSlug } = useParams();
  const doctor = doctorDetailsBySlug[doctorSlug];

  return <DoctorPageTemplate doctor={doctor} />;
}
