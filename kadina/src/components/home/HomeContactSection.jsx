import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import CardGrid from "../common/CardGrid";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import {
  contactAddress,
  contactHours,
  contactItems,
  contactMapUrl,
} from "../../data/contact";

export default function HomeContactSection() {
  const { lang } = useOutletContext();
  const localizedItems = contactItems.map((item, index) => lang === "ar" ? item : ({
    ...item,
    title: ["Phone", "WhatsApp", "Email"][index],
    value: index === 1 ? "Instant chat" : item.value,
    label: ["Call Now", "Start Chat", "Send Email"][index],
    href: index === 1 ? item.href.replace(encodeURIComponent("للحجز والاستفسار"), encodeURIComponent("Hello, I would like to book or ask about Kadina services.")) : item.href,
  }));
  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="contact"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={lang === "ar" ? "تواصل معنا" : "Contact Us"}
          title={lang === "ar" ? "نسمعك قبل أن نعالجك" : "We listen before we treat"}
          description={lang === "ar" ? "تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد." : "Contact Kadina Center in Riyadh by phone, WhatsApp or email."}
        />
        <CardGrid className="mt-9">
          {localizedItems.map((item) => (
            <motion.article
              className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]"
              key={item.href}
              variants={cardItem}
            >
              <h3 className="text-lg font-black text-[#4c2c00]">
                {item.title}
              </h3>
              <p className="mt-3 break-words text-lg font-bold text-[#4c2c00]/68">
                {item.value}
              </p>
              <a
                aria-label={
                  item.external
                    ? `${item.label} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`
                    : undefined
                }
                className="mt-6 inline-block font-black text-[#cf7d11]"
                href={item.href}
                rel={item.external ? "noopener noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
              >
                {item.label}
              </a>
            </motion.article>
          ))}
        </CardGrid>

        <motion.div
          className="mt-8 grid gap-5 lg:grid-cols-2"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <motion.article
            className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-white/75 p-6"
            variants={cardItem}
          >
            <h3 className="text-xl font-black text-[#4c2c00]">{lang === "ar" ? "الموقع" : "Location"}</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {lang === "ar" ? contactAddress : "Riyadh — Al-Murooj-Exit 5"}
            </p>
            <a
              aria-label={lang === "ar" ? "افتح الخريطة (يفتح في نافذة جديدة)" : "Open map (opens in a new window)"}
              className="mt-5 inline-block font-black text-[#cf7d11]"
              href={contactMapUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {lang === "ar" ? "افتح الخريطة" : "Open Map"}
            </a>
          </motion.article>
          <motion.article
            className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-white/75 p-6"
            variants={cardItem}
          >
            <h3 className="text-xl font-black text-[#4c2c00]">{lang === "ar" ? "المواعيد" : "Hours"}</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {lang === "ar" ? contactHours.days : "Saturday – Thursday"}
              <br />
              {lang === "ar" ? contactHours.time : "9:00 AM – 10:00 PM"}
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
