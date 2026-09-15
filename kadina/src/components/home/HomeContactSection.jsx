import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  contactMapUrl,
  getContactAddress,
  getContactItems,
} from "../../data/contact";
import { businessMaps } from "../../data/business";
import { ANALYTICS_EVENTS, SOURCE_SECTIONS, trackContactAction } from "../../utils/analytics";
import { fadeUp, staggerContainer, viewportOnce } from "../../componetts/motionPresets";

export default function HomeContactSection() {
  const { lang } = useOutletContext();
  const address = getContactAddress(lang);
  const phone = getContactItems(lang)[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="home-location overflow-hidden bg-[var(--color-surface)]" id="contact" aria-labelledby="home-location-title">
      <motion.div className="ds-container py-[var(--section-space)]" initial={shouldReduceMotion ? false : "hidden"} variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
        <motion.div className="grid gap-6 border-b border-[var(--color-border-strong)] pb-7 lg:grid-cols-12 lg:items-end lg:pb-8" variants={fadeUp}>
          <div className="lg:col-span-8">
            <p className="section-title-eyebrow">{lang === "ar" ? "الوصول إلى كادينا" : "Find Kadina"}</p>
            <h2 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-[.98] tracking-[-.045em] text-[var(--color-heading)]" id="home-location-title">
              {lang === "ar" ? "وجهتك في قلب الرياض" : "Your destination in Riyadh"}
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-muted)] sm:text-base lg:col-span-4 lg:justify-self-end lg:leading-8">
            {lang === "ar" ? "مركز متكامل للعناية الجلدية والجمالية، يجمع الخبرة الاستشارية والتقنيات المتخصصة في مكان واحد." : "An integrated destination for dermatology and aesthetic care, bringing consultant expertise and specialized technology together in one place."}
          </p>
        </motion.div>

        <div className="mt-7 grid gap-7 lg:mt-8 lg:grid-cols-12 lg:items-stretch lg:gap-0">
          <motion.div className="overflow-hidden bg-[var(--color-surface-muted)] lg:col-span-7" variants={fadeUp}>
            <iframe
              className="h-[260px] w-full border-0 sm:h-[300px] lg:h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={businessMaps.embedCandidate}
              title={lang === "ar" ? "خريطة موقع مركز كادينا الطبي" : "Kadina Medical Center location map"}
            />
          </motion.div>

          <motion.div className="flex flex-col justify-center lg:col-span-5 lg:border-s lg:border-[var(--color-border-strong)] lg:ps-12 xl:ps-16" variants={fadeUp}>
            <span className="text-xs font-black tracking-[.14em] text-[var(--color-accent-strong)]">{lang === "ar" ? "الموقع" : "Location"}</span>
            <p className="mt-5 text-[clamp(1.375rem,2.2vw,2rem)] font-black leading-[1.18] text-[var(--color-heading)]">{address}</p>
            <div className="mt-8 flex flex-wrap gap-3">
            <a
              aria-label={lang === "ar" ? "افتح الخريطة (يفتح في نافذة جديدة)" : "Open map (opens in a new window)"}
              className="ds-button ds-button-primary"
              href={contactMapUrl}
              onClick={() => trackContactAction(ANALYTICS_EVENTS.MAP_CLICK, { language: lang, page_type: "home", source_section: SOURCE_SECTIONS.HOME_CONTACT })}
              rel="noopener noreferrer"
              target="_blank"
            >
              {lang === "ar" ? "استعرض الخريطة" : "View the map"}
            </a>
            <a className="ds-button ds-button-secondary" href={phone.href} onClick={() => trackContactAction(ANALYTICS_EVENTS.PHONE_CLICK, { language: lang, page_type: "home", source_section: SOURCE_SECTIONS.HOME_CONTACT })}>{phone.label}</a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
