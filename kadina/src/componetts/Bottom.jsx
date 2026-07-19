import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "./motionPresets";

export default function Bottom({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#fff7eb]">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f8aa2d]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,170,45,0.11),transparent_42%,rgba(255,247,235,0.05))]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:px-8 lg:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.8fr_1fr] lg:items-center">
          <motion.a
            variants={fadeUp}
            href="#home"
            aria-label={t.center.name}
            className="mx-auto flex w-fit items-center justify-center lg:mx-0"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/kadina-logo.png"
              alt={t.center.name}
              className="h-16 w-auto object-contain lg:h-30"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/kadina-logo.png";
              }}
            />
          </motion.a>

          <motion.div variants={fadeUp} className="text-center">
            <p className="font-black tracking-wide text-[#f8aa2d]">
              {t.footer.note}
            </p>
            <nav className="mt-5 flex flex-col justify-center gap-2 sm:flex-row sm:flex-wrap" aria-label="Footer navigation">
              {t.nav.slice(0, 7).map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="rounded-full border border-[#4c2c00]/10 px-4 py-2 text-sm font-bold text-[#4c2c00]/72 transition hover:border-[#f8aa2d]/35 hover:bg-white/8 hover:text-[#f8aa2d]"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-center text-sm leading-7 text-[#4c2c00]/55 lg:text-end"
          >
            {currentYear} &copy; {t.footer.rights}
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
