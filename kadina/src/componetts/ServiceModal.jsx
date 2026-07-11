import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { serviceDetails } from "../data/serviceDetails";
import ServiceCarousel from "./ServiceCarousel";
import { smoothEase } from "./motionPresets";

const labels = {
  ar: {
    devicesTitle: "الأجهزة المستخدمة",
    doctorsTitle: "الأطباء المتخصصون",
    bookCta: "حجز عبر واتساب",
    close: "إغلاق نافذة تفاصيل الخدمة",
    emptyDevices: "لا توجد أجهزة مرتبطة بهذه الخدمة حاليًا.",
    emptyDoctors: "لا يوجد أطباء مرتبطون بهذه الخدمة حاليًا.",
  },
  en: {
    devicesTitle: "Devices Used",
    doctorsTitle: "Specialized Doctors",
    bookCta: "Book on WhatsApp",
    close: "Close service details",
    emptyDevices: "No devices are linked to this service yet.",
    emptyDoctors: "No doctors are linked to this service yet.",
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

export default function ServiceModal({ open, onClose, serviceKey, lang = "ar", t }) {
  const closeButtonRef = useRef(null);
  const isRtl = lang === "ar";
  const text = labels[lang] || labels.ar;
  const details =
    serviceDetails[lang]?.[serviceKey] || serviceDetails.ar[serviceKey];
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  useModalEffects(open, onClose, closeButtonRef);

  return (
    <AnimatePresence>
      {open && details ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          dir={isRtl ? "rtl" : "ltr"}
          className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden bg-[#fff7eb] text-[#2b1b08]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: smoothEase }}
        >
          <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.98),rgba(248,234,216,0.9)_52%,rgba(248,170,45,0.18))]" />
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
              <section className="grid gap-6 border-b border-[#f8aa2d]/20 pb-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-12">
                <div>
                  <span className="section-eyebrow">{t.services.eyebrow}</span>
                  <h2
                    id="service-modal-title"
                    className="mt-4 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl"
                  >
                    {details.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-[#4c2c00]/72 md:text-lg">
                    {details.description}
                  </p>
                </div>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f8aa2d] px-6 py-3.5 text-base font-black text-[#2b1b08] shadow-[0_16px_34px_rgba(207,125,17,0.28)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white sm:w-fit lg:px-8"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>{text.bookCta}</span>
                </motion.a>
              </section>

              <div className="space-y-6 py-8 lg:space-y-8 lg:py-12">
                <ServiceCarousel
                  title={text.devicesTitle}
                  items={details.devices}
                  type="device"
                  lang={lang}
                  emptyMessage={text.emptyDevices}
                  carouselKey={`${lang}-${serviceKey}-devices`}
                />

                <ServiceCarousel
                  title={text.doctorsTitle}
                  items={details.doctors}
                  type="doctor"
                  lang={lang}
                  emptyMessage={text.emptyDoctors}
                  carouselKey={`${lang}-${serviceKey}-doctors`}
                />
              </div>

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
