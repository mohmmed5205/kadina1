import { useState } from "react";
import { motion } from "framer-motion";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import { doctors } from "../data/pagesContent";
import { createWhatsappUrl } from "../utils/whatsapp";
import { fadeUp, viewportOnce } from "../componetts/motionPresets";

const serviceOptions = [
  "الجلدية",
  "الليزر",
  "جراحة التجميل",
  "الشعر",
  "الحقن التجميلية",
  "جلسات العناية",
];

const initialForm = {
  fullName: "",
  mobile: "",
  service: "",
  doctor: "",
  preferredTime: "",
};

export default function BookingPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "الاسم الكامل مطلوب.";
    if (!/^05\d{8}$/.test(form.mobile)) {
      nextErrors.mobile = "أدخل رقم جوال سعودي بالصيغة 05xxxxxxxx.";
    }
    if (!form.service) nextErrors.service = "اختر الخدمة.";
    if (!form.preferredTime) {
      nextErrors.preferredTime = "اختر الوقت المفضل.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      "طلب حجز جديد — مركز كادينا",
      `الاسم الكامل: ${form.fullName.trim()}`,
      `رقم الجوال: ${form.mobile}`,
      `الخدمة: ${form.service}`,
      `الطبيب: ${form.doctor || "لم يتم الاختيار"}`,
      `الوقت المفضل: ${form.preferredTime}`,
    ].join("\n");

    const whatsappUrl = createWhatsappUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-[#4c2c00]/15 bg-white/70 px-4 py-3.5 font-bold text-[#4c2c00] outline-none transition placeholder:text-[#4c2c00]/35 focus:border-[#f8aa2d] focus:ring-4 focus:ring-[#f8aa2d]/12";

  return (
    <div dir="rtl">
      <Seo
        canonicalPath="/booking"
        description="صفحة طلب موعد قديمة؛ التواصل والحجز المعتمد لدى كادينا يتم عبر واتساب."
        noindex
        title="الحجز عبر واتساب"
      />
      <PageHero
        breadcrumbLabel="الحجز"
        eyebrow="الحجز"
        title="خطوتك الأولى نحو النسخة الأفضل منك"
        description="استشارة واحدة تفصلك عن خطة واضحة بيد استشاري متخصص. املأ البيانات وسيتواصل معك فريقنا خلال ساعات العمل."
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionTitle
            eyebrow="طلب موعد"
            title="بيانات الحجز"
            description="أدخل بياناتك المطلوبة، ثم أرسل الطلب عبر واتساب."
          />

          <motion.form
            className="rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-5 shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-8"
            initial="hidden"
            noValidate
            onSubmit={handleSubmit}
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="font-black text-[#4c2c00]">
                الاسم الكامل
                <input
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  aria-invalid={Boolean(errors.fullName)}
                  className={inputClass}
                  name="fullName"
                  onChange={updateField}
                  type="text"
                  value={form.fullName}
                />
                {errors.fullName && (
                  <span
                    className="mt-2 block text-sm text-red-700"
                    id="fullName-error"
                  >
                    {errors.fullName}
                  </span>
                )}
              </label>

              <label className="font-black text-[#4c2c00]">
                رقم الجوال
                <input
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                  aria-invalid={Boolean(errors.mobile)}
                  className={inputClass}
                  inputMode="tel"
                  name="mobile"
                  onChange={updateField}
                  placeholder="05xxxxxxxx"
                  type="tel"
                  value={form.mobile}
                />
                {errors.mobile && (
                  <span
                    className="mt-2 block text-sm text-red-700"
                    id="mobile-error"
                  >
                    {errors.mobile}
                  </span>
                )}
              </label>

              <label className="font-black text-[#4c2c00]">
                الخدمة
                <select
                  aria-describedby={errors.service ? "service-error" : undefined}
                  aria-invalid={Boolean(errors.service)}
                  className={inputClass}
                  name="service"
                  onChange={updateField}
                  value={form.service}
                >
                  <option value="">اختر الخدمة</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span
                    className="mt-2 block text-sm text-red-700"
                    id="service-error"
                  >
                    {errors.service}
                  </span>
                )}
              </label>

              <label className="font-black text-[#4c2c00]">
                الطبيب (اختياري)
                <select
                  className={inputClass}
                  name="doctor"
                  onChange={updateField}
                  value={form.doctor}
                >
                  <option value="">بدون اختيار</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.slug} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="font-black text-[#4c2c00]">
                الوقت المفضل
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {["صباحي", "مسائي"].map((time) => (
                  <label
                    className="cursor-pointer rounded-full border border-[#4c2c00]/15 bg-white/70 px-5 py-3 font-bold"
                    key={time}
                  >
                    <input
                      className="ml-2 accent-[#cf7d11]"
                      name="preferredTime"
                      onChange={updateField}
                      type="radio"
                      value={time}
                    />
                    {time}
                  </label>
                ))}
              </div>
              {errors.preferredTime && (
                <span className="mt-2 block text-sm text-red-700">
                  {errors.preferredTime}
                </span>
              )}
            </fieldset>

            <button
              className="mt-7 w-full rounded-full bg-[#f8aa2d] px-6 py-3.5 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              type="submit"
            >
              أكّد الحجز عبر واتساب
            </button>

            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-black">
              <a
                aria-label="واتساب مباشر (يفتح في نافذة جديدة)"
                className="text-[#cf7d11]"
                href={createWhatsappUrl("للحجز والاستفسار")}
                rel="noopener noreferrer"
                target="_blank"
              >
                واتساب مباشر
              </a>
              <a className="text-[#cf7d11]" href="tel:0114555444">
                اتصال: 0114555444
              </a>
            </div>
          </motion.form>
        </div>
      </section>

      <CTASection
        title="استشارة واحدة تفصلك عن خطة واضحة"
        description="املأ البيانات وسيتواصل معك فريق كادينا خلال ساعات العمل."
        primaryLabel="تواصل معنا"
        primaryTo="/contact"
      />
    </div>
  );
}
