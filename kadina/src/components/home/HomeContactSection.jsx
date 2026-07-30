import { motion } from "framer-motion";
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
  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="contact"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="تواصل معنا"
          title="نسمعك قبل أن نعالجك"
          description="تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد."
        />
        <CardGrid className="mt-9">
          {contactItems.map((item) => (
            <motion.article
              className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 shadow-[0_18px_45px_rgba(76,44,0,0.08)]"
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
                    ? `${item.label} (يفتح في نافذة جديدة)`
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
            <h3 className="text-xl font-black text-[#4c2c00]">الموقع</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {contactAddress}
            </p>
            <a
              aria-label="افتح الخريطة (يفتح في نافذة جديدة)"
              className="mt-5 inline-block font-black text-[#cf7d11]"
              href={contactMapUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              افتح الخريطة
            </a>
          </motion.article>
          <motion.article
            className="rounded-[1.75rem] border border-[#4c2c00]/10 bg-white/75 p-6"
            variants={cardItem}
          >
            <h3 className="text-xl font-black text-[#4c2c00]">المواعيد</h3>
            <p className="mt-3 leading-8 text-[#4c2c00]/68">
              {contactHours.days}
              <br />
              {contactHours.time}
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
