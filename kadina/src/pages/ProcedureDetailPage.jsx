import { useParams } from "react-router-dom";
import ProcedurePageTemplate from "../components/procedures/ProcedurePageTemplate";
import { proceduresBySlug } from "../data/procedures";

export default function ProcedureDetailPage() {
  const { procedureSlug } = useParams();
  const procedure = proceduresBySlug[procedureSlug];

  return <ProcedurePageTemplate procedure={procedure} />;
}
