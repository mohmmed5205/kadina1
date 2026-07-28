import { useParams } from "react-router-dom";
import SolutionPageTemplate from "../components/solutions/SolutionPageTemplate";
import { solutionDetailsBySlug } from "../data/solutions";

export default function SolutionDetailPage() {
  const { solutionSlug } = useParams();
  const solution = solutionDetailsBySlug[solutionSlug];

  return <SolutionPageTemplate solution={solution} />;
}
