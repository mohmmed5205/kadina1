import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Seo from "../components/seo/Seo";
import { fadeUp } from "../componetts/motionPresets";

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
      <motion.h1 animate="visible" initial="hidden" variants={fadeUp}>
        Page Not Found
      </motion.h1>
    </>
  );
}
