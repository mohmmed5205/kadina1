import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";
import { fadeUp } from "../../componetts/motionPresets";

export default function PageHero({
  breadcrumbLabel,
  breadcrumbItems,
  eyebrow,
  title,
  description,
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
      <motion.div
        animate="visible"
        className="relative mx-auto max-w-7xl"
        initial="hidden"
        variants={fadeUp}
      >
        <Breadcrumbs
          items={breadcrumbItems || [{ label: breadcrumbLabel || title }]}
        />
        <p className="mt-8 text-sm font-black tracking-wide text-[#cf7d11]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#4c2c00]/72 sm:text-lg">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
}
