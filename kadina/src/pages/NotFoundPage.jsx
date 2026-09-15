import { motion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import Seo from "../components/seo/Seo";
import { fadeUp } from "../componetts/motionPresets";

export default function NotFoundPage() {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";

  return (
    <>
      <Seo
        canonicalPath={location.pathname}
        description={en ? "The requested page was not found on the Kadina website." : "الصفحة المطلوبة غير موجودة على موقع كادينا."}
        noindex
        title={en ? "Page Not Found" : "الصفحة غير موجودة"}
      />
      <motion.section className="min-h-[70vh] px-4 pb-20 pt-32 text-center" animate="visible" initial="hidden" variants={fadeUp}>
        <h1 className="text-3xl font-black text-[var(--color-heading)]">{en ? "Page Not Found" : "الصفحة غير موجودة"}</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">{en ? "We could not find the page you requested." : "لم نتمكن من العثور على الصفحة المطلوبة."}</p>
        <Link className="mt-7 inline-block rounded-full bg-[var(--color-accent)] px-6 py-3 font-black text-[var(--color-ink)]" to="/">{en ? "Back to Home" : "العودة إلى الرئيسية"}</Link>
      </motion.section>
    </>
  );
}
