import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import OfferSlider from "./OfferSlider";
import { smoothEase } from "./motionPresets";

const labels = {
  ar: {
    title: "عروض كادينا",
    description: "عروض مختارة لفترة محدودة",
    bookCta: "احجز العرض الآن",
    close: "إغلاق نافذة العروض",
  },
  en: {
    title: "Kadina Offers",
    description: "Selected offers for a limited time",
    bookCta: "Book Now",
    close: "Close offers modal",
  },
};

function useModalEffects(open, onClose, closeButtonRef) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeButtonRef, onClose, open]);
}

export default function OffersModal({ open, onClose, lang = "ar", t }) {
  const closeButtonRef = useRef(null);
  const isRtl = lang === "ar";
  const text = labels[lang] || labels.ar;
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  useModalEffects(open, onClose, closeButtonRef);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="offers-modal-title"
          dir={isRtl ? "rtl" : "ltr"}
          className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden bg-[#fff7eb] text-[#2b1b08]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: smoothEase }}
        >
          <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.98),rgba(255,230,199,0.86)_50%,rgba(249,0,98,0.09))]" />
          <div className="pointer-events-none fixed inset-x-0 top-0 h-32 border-b border-[#f8aa2d]/18 bg-[linear-gradient(180deg,rgba(255,247,235,0.96),rgba(255,247,235,0))]" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.36, ease: smoothEase }}
            className="relative min-h-screen p-4 sm:p-6 lg:p-8"
          >
            <header className="sticky top-0 z-20 -mx-4 border-b border-[#f8aa2d]/16 bg-[#fff7eb]/92 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <img
                  src="/logo.png"
                  alt={t.center.name}
                  className="h-9 w-auto shrink-0 object-contain sm:h-11"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/kadina-logo.png";
                  }}
                />

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={text.close}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#4c2c00]/12 bg-white/80 text-[#2b1b08] shadow-[0_12px_26px_rgba(76,44,0,0.12)] transition-colors duration-200 hover:border-[#f8aa2d] hover:bg-[#f8aa2d]"
                >
                  <X size={22} strokeWidth={2.6} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="relative mx-auto max-w-7xl py-8 lg:py-12">
              <section className="mx-auto max-w-3xl text-center">
                <span className="section-eyebrow">{isRtl ? "العروض" : "Offers"}</span>
                <h2
                  id="offers-modal-title"
                  className="mt-4 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl"
                >
                  {text.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-[#4c2c00]/72 md:text-lg">
                  {text.description}
                </p>
              </section>

              <section className="mt-7 lg:mt-10">
                <OfferSlider
                  lang={lang}
                  t={t}
                  compact
                  modal
                  showAvailability={false}
                />
              </section>

              <div className="border-t border-[#f8aa2d]/20 pt-7 text-center">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2b1b08] px-7 py-4 text-base font-black text-[#f8aa2d] shadow-[0_18px_40px_rgba(43,27,8,0.2)] transition-colors duration-300 hover:bg-[#f8aa2d] hover:text-[#2b1b08] sm:w-auto"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>{text.bookCta}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
