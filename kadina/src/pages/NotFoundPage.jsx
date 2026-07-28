import { useLocation } from "react-router-dom";
import Seo from "../components/seo/Seo";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <>
      <Seo
        canonicalPath={location.pathname}
        description="الصفحة المطلوبة غير موجودة على موقع كادينا."
        noindex
        title="الصفحة غير موجودة"
      />
      <h1>Page Not Found</h1>
    </>
  );
}
