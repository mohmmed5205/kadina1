import { motion } from "framer-motion";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDeviceDetail } from "../../data/devices";
import { createWhatsappUrl } from "../../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

const MotionLink = motion.create(Link);

function DetailList({ items }) {
  return (
    <motion.ul
      className="mt-6 grid gap-4"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.li
          className="flex gap-3 rounded-2xl border border-[#4c2c00]/10 bg-white/65 p-4 font-medium leading-7 text-[#4c2c00]/72"
          key={item}
          variants={cardItem}
        >
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f8aa2d]"
          />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function DevicePageTemplate({ device: rawDevice }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";
  const device = rawDevice ? getDeviceDetail(rawDevice.slug, lang) : null;

  if (!device) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description={en ? "The requested device was not found among Kadina's devices." : "الجهاز المطلوب غير موجود ضمن أجهزة كادينا."}
          noindex
          title={en ? "Device Not Found" : "الجهاز غير موجود"}
        />
        <section
          className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8"
        >
          <motion.div
            animate="visible"
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[#4c2c00]">
              {en ? "Device Not Found" : "الجهاز غير موجود"}
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              {en ? "We could not find the requested device." : "لم نتمكن من العثور على الجهاز المطلوب."}
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to="/technology"
            >
              {en ? "Back to Devices" : "العودة إلى الأجهزة"}
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  const relatedDevices = device.relatedDevices
    .map((slug) => getDeviceDetail(slug, lang))
    .filter(Boolean);
  const whatsappUrl = createWhatsappUrl(device.whatsappMessage);
  const origin = [device.company, device.country].filter(Boolean);

  return (
    <div>
      <Seo
        canonicalPath={`/technology/${device.slug}`}
        description={device.tagline}
        image={device.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Technology & Devices" : "التقنيات والأجهزة", path: "/technology" },
            {
              name: device.arabicName,
              path: `/technology/${device.slug}`,
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: `${device.arabicName} ${device.englishName || ""}`.trim(),
            description: device.tagline,
            path: `/technology/${device.slug}`,
          }),
        ]}
        title={`${device.arabicName} — ${device.englishName || (en ? "Kadina Devices" : "أجهزة كادينا")}`}
      />
      <section className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: en ? "Technology & Devices" : "التقنيات والأجهزة", to: "/technology" },
              { label: device.arabicName },
            ]}
          />

          <motion.div
            animate="visible"
            className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
            initial="hidden"
            variants={fadeUp}
          >
            <div>
              <p className="text-sm font-black tracking-wide text-[#cf7d11]">
                {en ? "Available at Kadina" : "متوفر في كادينا"}
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
                {device.arabicName}
              </h1>
              {device.englishName && (
                <p
                  className="mt-3 text-lg font-black text-[#cf7d11] sm:text-xl"
                  dir="ltr"
                >
                  {device.englishName}
                </p>
              )}
              {origin.length > 0 && (
                <p className="mt-5 font-bold text-[#4c2c00]/60">
                  {origin.join(" — ")}
                </p>
              )}
              {device.tagline && (
                <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#4c2c00]/72 sm:text-lg">
                  {device.tagline}
                </p>
              )}
            </div>

            <div className="flex min-h-72 items-center justify-center rounded-[2rem] border border-[#f8aa2d]/25 bg-white/65 p-6 shadow-[0_20px_55px_rgba(76,44,0,0.08)] sm:min-h-96">
              {device.image ? (
                <img
                  alt={`${device.arabicName} - ${device.englishName || ""}`}
                  className="max-h-[24rem] w-full object-contain"
                  decoding="async"
                  height="1600"
                  src={device.image}
                  width="1600"
                />
              ) : (
                <div className="flex min-h-64 w-full items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(248,170,45,0.2),rgba(255,247,235,0.9))] p-6 text-center text-2xl font-black text-[#4c2c00]">
                  {device.arabicName}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {device.intro && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle title={en ? "About the Device" : "عن الجهاز"} />
            <motion.p
              className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[#4c2c00]/72"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {device.intro}
            </motion.p>
          </div>
        </section>
      )}

      {device.mechanism && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={en ? "Technology" : "التقنية"} title={en ? "How It Works" : "آلية العمل"} />
            <motion.p
              className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[#4c2c00]/72"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {device.mechanism}
            </motion.p>
          </div>
        </section>
      )}

      {(device.uses.length > 0 || device.benefits.length > 0) && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            {device.uses.length > 0 && (
              <div>
                <SectionTitle title={en ? "Uses" : "الاستخدامات"} />
                <DetailList items={device.uses} />
              </div>
            )}
            {device.benefits.length > 0 && (
              <div>
                <SectionTitle title={en ? "Benefits" : "المميزات"} />
                <DetailList items={device.benefits} />
              </div>
            )}
          </div>
        </section>
      )}

      {device.suitableFor.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={en ? "Assessment" : "التقييم"} title={en ? "Who Is It For?" : "لمن يناسب"} />
            <DetailList items={device.suitableFor} />
          </div>
        </section>
      )}

      <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {device.relatedService && (
            <div>
              <SectionTitle title={en ? "Related Service" : "الخدمة المرتبطة"} />
              <Link
                className="mt-6 inline-block rounded-full border border-[#f8aa2d]/35 bg-white/70 px-5 py-3 font-black text-[#4c2c00] transition hover:border-[#f8aa2d] hover:text-[#cf7d11]"
                to={device.relatedService.to}
              >
                {device.relatedService.title}
              </Link>
            </div>
          )}

          {relatedDevices.length > 0 && (
            <div className={device.relatedService ? "mt-12" : ""}>
              <SectionTitle title={en ? "Related Devices" : "أجهزة ذات صلة"} />
              <motion.div
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                variants={staggerContainer}
                viewport={viewportOnce}
                whileInView="visible"
              >
                {relatedDevices.map((relatedDevice) => (
                  <MotionLink
                    className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                    key={relatedDevice.slug}
                    to={`/technology/${relatedDevice.slug}`}
                    variants={cardItem}
                  >
                    <h3 className="text-lg font-black text-[#4c2c00]">
                      {relatedDevice.arabicName}
                    </h3>
                    {relatedDevice.englishName && (
                      <p
                        className="mt-2 text-sm font-bold text-[#cf7d11]"
                        dir="ltr"
                      >
                        {relatedDevice.englishName}
                      </p>
                    )}
                  </MotionLink>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <motion.section
        className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            {en ? "Ask About This Device" : "استفسر عن الجهاز"}
          </h2>
          <a
            aria-label={en ? "Book your session on WhatsApp (opens in a new window)" : "احجز جلستك عبر واتساب (يفتح في نافذة جديدة)"}
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {en ? "Book Your Session on WhatsApp" : "احجز جلستك عبر واتساب"}
          </a>
          <div>
            <Link
              className="mt-6 inline-block font-black text-[#fff7eb]/75 underline decoration-[#f8aa2d]/45 underline-offset-8 transition hover:text-[#f8aa2d]"
              to="/technology"
            >
              {en ? "Back to All Devices" : "العودة إلى جميع الأجهزة"}
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
