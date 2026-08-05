import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import CardGrid from "../components/common/CardGrid";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import {
  contactAddress,
  contactHours,
  contactItems,
  contactMapUrl,
} from "../data/contact";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function ContactPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const localizedItems = contactItems.map((item, index) => en ? ({
    ...item,
    title: ["Phone", "WhatsApp", "Email"][index],
    value: index === 1 ? "Instant chat" : item.value,
    label: ["Call Now", "Start Chat", "Send Email"][index],
    href: index === 1 ? item.href.replace(encodeURIComponent("للحجز والاستفسار"), encodeURIComponent("Hello, I would like to book or ask about Kadina services.")) : item.href,
  }) : item);
  return (
    <div>
      <Seo
        canonicalPath="/contact"
        description={en ? "Contact Kadina Center on Riyadh's Northern Ring Road by phone, WhatsApp or email." : "تواصل مع مركز كادينا في الرياض على الطريق الدائري الشمالي عبر الهاتف أو واتساب أو البريد الإلكتروني."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Contact Us" : "تواصل معنا", path: "/contact" },
          ]),
          createWebPageSchema({
            name: en ? "Contact Kadina" : "تواصل مع كادينا",
            description: en ? "Contact details, location and opening hours for Kadina Center in Riyadh." : "بيانات التواصل والموقع ومواعيد مركز كادينا في الرياض.",
            path: "/contact",
          }),
        ]}
        title={en ? "Contact Kadina" : "تواصل مع كادينا"}
      />
      <PageHero
        breadcrumbLabel={en ? "Contact Us" : "تواصل معنا"}
        eyebrow={en ? "Contact Us" : "تواصل معنا"}
        title={en ? "We listen before we treat" : "نسمعك... قبل أن نعالجك"}
        description={en ? "Contact Kadina Center in Riyadh by phone, WhatsApp or email." : "تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد."}
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={en ? "Contact Details" : "بيانات التواصل"}
            title={en ? "We Are Here to Answer" : "نحن هنا للإجابة عنك"}
          />
          <CardGrid className="mt-9">
            {localizedItems.map((item) => (
              <motion.article
                className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]"
                key={item.title}
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
                      ? `${item.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`
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
              className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-[#fff7eb]/75 p-6"
              variants={cardItem}
            >
              <h2 className="text-xl font-black text-[#4c2c00]">{en ? "Location" : "الموقع"}</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {en ? "Riyadh — Al-Murooj-Exit 5" : contactAddress}
              </p>
              <a
                aria-label={en ? "Open map (opens in a new window)" : "افتح الخريطة (يفتح في نافذة جديدة)"}
                className="mt-5 inline-block font-black text-[#cf7d11]"
                href={contactMapUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Open Map" : "افتح الخريطة"}
              </a>
            </motion.article>

            <motion.article
              className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-[#fff7eb]/75 p-6"
              variants={cardItem}
            >
              <h2 className="text-xl font-black text-[#4c2c00]">{en ? "Hours" : "المواعيد"}</h2>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {en ? "Saturday – Saturday" : contactHours.days}
                <br />
                {en ? "9:00 AM – 10:00 PM" : contactHours.time}
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <CTASection
        title={en ? "We Listen Before We Treat" : "نسمعك قبل أن نعالجك"}
        description={en ? "Book your consultation and the Kadina team will contact you." : "احجز استشارتك، وسيتواصل معك فريق كادينا."}
      />
    </div>
  );
}
