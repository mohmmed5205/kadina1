import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "./motionPresets";

export default function Bottom({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#2b1b08]">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f8aa2d]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,170,45,0.11),transparent_42%,rgba(255,247,235,0.05))]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.8fr_1fr] lg:items-center">
          <motion.a
            variants={fadeUp}
            href="#home"
            aria-label={t.center.name}
            className="mx-auto flex w-fit items-center justify-center rounded-[1.75rem] border border-[#f8aa2d]/20 bg-[#fff7eb]/94 px-5 py-4 shadow-[0_16px_42px_rgba(0,0,0,0.16)] lg:mx-0"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/kadina-logo.png"
              alt={t.center.name}
              className="h-20 w-20 object-contain"
            />
          </motion.a>

          <motion.div variants={fadeUp} className="text-center">
            <p className="font-black tracking-wide text-[#f8aa2d]">
              {t.footer.note}
            </p>
            <nav className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Footer navigation">
              {t.nav.slice(0, 7).map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-[#fff7eb]/72 transition hover:border-[#f8aa2d]/35 hover:bg-white/8 hover:text-[#f8aa2d]"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-center text-sm leading-7 text-[#fff7eb]/55 lg:text-end"
          >
            {currentYear} &copy; {t.footer.rights}
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
