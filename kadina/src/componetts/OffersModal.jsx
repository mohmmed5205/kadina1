import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import OfferSlider from "./OfferSlider";
import { smoothEase } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";
import { MODAL_EVENT } from "../components/motion/SmoothScroll";

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

function useModalEffects(open, onClose, closeButtonRef, dialogRef) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = "hidden";
    document.body.dataset.modalOpen = "true";
    window.dispatchEvent(
      new CustomEvent(MODAL_EVENT, { detail: { open: true } }),
    );
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.modalOpen;
      window.dispatchEvent(
        new CustomEvent(MODAL_EVENT, { detail: { open: false } }),
      );
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [closeButtonRef, dialogRef, onClose, open]);
}

export default function OffersModal({ open, onClose, lang = "ar", t }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const isRtl = lang === "ar";
  const text = labels[lang] || labels.ar;
  const whatsappUrl = createWhatsappUrl(`${text.bookCta}: ${text.title}`);
  const shouldReduceMotion = useReducedMotion();

  useModalEffects(open, onClose, closeButtonRef, dialogRef);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="offers-modal-title"
          dir={isRtl ? "rtl" : "ltr"}
          className="offers-modal fixed inset-0 z-[9999] overflow-hidden bg-[var(--color-surface)] text-[var(--color-heading)]"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: smoothEase }}
        >
          <div className="flex h-full flex-col">
            <header className="sticky top-0 z-40 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-glass)] pb-3 pt-[calc(.75rem+env(safe-area-inset-top))] backdrop-blur-md">
              <div className="ds-container flex items-center justify-between gap-4">
                <img
                  src="/logo.png"
                  alt={t.center.name}
                  className="h-9 w-auto shrink-0 object-contain sm:h-11"
                  decoding="async"
                  height="75"
                  width="75"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/kadina-logo.png";
                  }}
                />

                <h2
                  id="offers-modal-title"
                  className="min-w-0 flex-1 truncate text-center text-lg font-black text-[var(--color-heading)] sm:text-2xl"
                >
                  {text.title}
                </h2>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={text.close}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-heading)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]"
                >
                  <X size={22} strokeWidth={2.6} aria-hidden="true" />
                </button>
              </div>
            </header>

            <main className="offers-modal-main min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 lg:pt-10">
              <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(145deg,rgba(255,250,242,0.98),rgba(241,231,216,0.88)_55%,rgba(214,163,91,0.08))]" />

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: smoothEase }}
                className="ds-container relative"
              >
                <section className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
                  <span className="section-eyebrow">{isRtl ? "العروض" : "Offers"}</span>
                  <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-[var(--color-text-muted)] md:text-lg">
                    {text.description}
                  </p>
                </section>

                <OfferSlider
                  lang={lang}
                  compact
                  modal
                  showAvailability={false}
                />

                <div className="border-t border-[var(--color-border)] pt-7 text-center">
                  <motion.a
                    href={whatsappUrl}
                    aria-label={`${text.bookCta} (${isRtl ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-button ds-button-primary w-full px-7 py-4 text-base sm:w-auto"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp aria-hidden="true" />
                    <span>{text.bookCta}</span>
                  </motion.a>
                </div>
              </motion.div>
            </main>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
