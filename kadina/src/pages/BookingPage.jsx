import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import { getDoctorDetails } from "../data/doctors";
import { getServicePages } from "../data/services";
import { createWhatsappUrl } from "../utils/whatsapp";
import { fadeUp } from "../componetts/motionPresets";
import {
  BookingConfigurationError,
  isValidSaudiMobile,
  normalizeSaudiMobile,
  submitBookingRequest,
} from "../utils/booking";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getCurrentPath,
  trackEvent,
} from "../utils/analytics";

const initialForm = {
  name: "",
  phone: "",
  service: "",
  doctor: "",
  notes: "",
  website: "",
};

const NOTES_MAX_LENGTH = 500;
const TRACKED_FORM_FIELDS = new Set([
  "name",
  "phone",
  "service",
  "doctor",
  "notes",
]);

export default function BookingPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const services = useMemo(() => getServicePages(lang), [lang]);
  const doctors = getDoctorDetails(lang);
  const validServiceSlugs = useMemo(
    () => new Set(services.map((service) => service.slug)),
    [services],
  );
  const validDoctorSlugs = useMemo(
    () => new Set(doctors.map((doctor) => doctor.slug)),
    [doctors],
  );
  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: validServiceSlugs.has(searchParams.get("service"))
      ? searchParams.get("service")
      : "",
    doctor: validDoctorSlugs.has(searchParams.get("doctor"))
      ? searchParams.get("doctor")
      : "",
  }));
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const hasStartedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const fieldRefs = useRef({});
  const whatsappUrl = createWhatsappUrl(
    en
      ? "Hello, I would like to ask about booking an appointment at Kadina Center."
      : "مرحبًا، أرغب في الاستفسار عن حجز موعد في مركز كادينا.",
  );

  const relatedDoctors = useMemo(() => {
    if (!form.service) return doctors;
    const matches = doctors.filter((doctor) =>
      doctor.services.some(
        (service) => service.to === `/services/${form.service}`,
      ),
    );

    if (matches.length === 0) return doctors;
    if (
      form.doctor &&
      !matches.some((doctor) => doctor.slug === form.doctor)
    ) {
      return doctors;
    }
    return matches;
  }, [doctors, form.doctor, form.service]);

  const trackBookingStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.BOOKING_START, {
      language: lang,
      path: getCurrentPath(location),
      source_section: SOURCE_SECTIONS.BOOKING_FORM,
    });
  };

  const syncBookingQuery = (nextForm) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextForm.service) nextParams.set("service", nextForm.service);
    else nextParams.delete("service");
    if (nextForm.doctor) nextParams.set("doctor", nextForm.doctor);
    else nextParams.delete("doctor");
    setSearchParams(nextParams, { replace: true });
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    if (TRACKED_FORM_FIELDS.has(name)) trackBookingStart();
    setSubmitState("idle");
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    if (name === "service" || name === "doctor") syncBookingQuery(nextForm);
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleFieldFocus = (event) => {
    if (TRACKED_FORM_FIELDS.has(event.target.name)) trackBookingStart();
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = en ? "Enter your name." : "أدخل الاسم.";
    }
    if (!isValidSaudiMobile(form.phone)) {
      nextErrors.phone = en
        ? "Enter a valid Saudi mobile number, such as 05xxxxxxxx."
        : "أدخل رقم جوال سعودي صحيحًا، مثل 05xxxxxxxx.";
    }
    if (!validServiceSlugs.has(form.service)) {
      nextErrors.service = en ? "Choose a service." : "اختر الخدمة.";
    }
    if (form.doctor && !validDoctorSlugs.has(form.doctor)) {
      nextErrors.doctor = en ? "Choose a valid doctor." : "اختر طبيبًا صحيحًا.";
    }
    if (form.notes.length > NOTES_MAX_LENGTH) {
      nextErrors.notes = en
        ? `Keep the note within ${NOTES_MAX_LENGTH} characters.`
        : `اجعل الملاحظة ضمن ${NOTES_MAX_LENGTH} حرفًا.`;
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    isSubmittingRef.current = true;
    setSubmitState("submitting");
    try {
      await submitBookingRequest({
        name: form.name.trim(),
        phone: normalizeSaudiMobile(form.phone),
        service: form.service,
        doctor: form.doctor || undefined,
        notes: form.notes.trim() || undefined,
        language: lang.toUpperCase(),
        currentPath: getCurrentPath(location),
        honeypot: form.website,
      });

      trackEvent(ANALYTICS_EVENTS.BOOKING_SUBMIT, {
        language: lang,
        path: getCurrentPath(location),
        service_slug: form.service,
        ...(form.doctor ? { doctor_slug: form.doctor } : {}),
        submission_method: "email_form",
      });
      setForm(initialForm);
      setSearchParams({}, { replace: true });
      setSubmitState("success");
    } catch (error) {
      setSubmitState(
        error instanceof BookingConfigurationError ? "unconfigured" : "error",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const inputClass =
    "mt-2 min-h-12 w-full border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-4 py-3 text-base font-bold text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-strong)] focus:ring-4 focus:ring-[rgba(214,163,91,.14)]";

  const getErrorProps = (field) => ({
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    "aria-invalid": Boolean(errors[field]),
  });

  const renderError = (field) =>
    errors[field] ? (
      <span
        className="mt-2 block text-sm font-bold text-red-800"
        id={`${field}-error`}
      >
        {errors[field]}
      </span>
    ) : null;

  return (
    <div>
      <Seo
        canonicalPath="/booking"
        description={en ? "Send an appointment request to Kadina Medical Center. The team will contact you to follow up; the request does not confirm an appointment." : "أرسل طلب موعد إلى مركز كادينا الطبي، وسيتواصل معك الفريق للمتابعة؛ إرسال الطلب لا يعني تأكيد الموعد."}
        noindex
        title={en ? "Appointment Request" : "طلب موعد"}
      />
      <PageHero
        breadcrumbLabel={en ? "Booking" : "الحجز"}
        eyebrow={en ? "Booking" : "الحجز"}
        title={en ? "Request an appointment" : "اطلب موعدك"}
        description={en ? "Share the essential details below. The Kadina team will contact you to follow up on your appointment request." : "شاركنا البيانات الأساسية أدناه، وسيتواصل معك فريق كادينا لمتابعة طلب الموعد."}
        variant="utility"
      />

      <section className="ds-section bg-[var(--color-surface)]">
        <div className="ds-container grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="max-w-xl">
            <p className="section-title-eyebrow">
              {en ? "Appointment Request" : "طلب موعد"}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl">
              {en ? "Essential details only" : "البيانات الأساسية فقط"}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
              {en
                ? "This form sends an appointment request, not a confirmed booking. Please do not include medical details in the note."
                : "هذا النموذج يرسل طلب موعد وليس تأكيدًا نهائيًا للحجز. يرجى عدم كتابة تفاصيل طبية في الملاحظة."}
            </p>
            <div className="mt-8 border-s-2 border-[var(--color-accent)] ps-5">
              <p className="font-black text-[var(--color-heading)]">
                {en ? "Prefer direct communication?" : "تفضل التواصل مباشرة؟"}
              </p>
              <a
                aria-label={`${en ? "Contact via WhatsApp" : "تواصل عبر واتساب"} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
                className="mt-4 inline-flex min-h-12 items-center border-b border-[var(--color-accent-strong)] font-black text-[var(--color-accent-strong)]"
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Contact via WhatsApp" : "تواصل عبر واتساب"}
              </a>
            </div>
          </div>

          <motion.form
            className="border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-card)] sm:p-8"
            initial={shouldReduceMotion ? false : "hidden"}
            noValidate
            onFocusCapture={handleFieldFocus}
            onSubmit={handleSubmit}
            variants={fadeUp}
            animate="visible"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="font-black text-[var(--color-heading)]" htmlFor="booking-name">
                {en ? "Name" : "الاسم"} <span aria-hidden="true">*</span>
                <input
                  {...getErrorProps("name")}
                  autoComplete="name"
                  className={inputClass}
                  id="booking-name"
                  maxLength="100"
                  name="name"
                  onChange={updateField}
                  ref={(element) => { fieldRefs.current.name = element; }}
                  required
                  type="text"
                  value={form.name}
                />
                {renderError("name")}
              </label>

              <label className="font-black text-[var(--color-heading)]" htmlFor="booking-phone">
                {en ? "Mobile number" : "رقم الجوال"} <span aria-hidden="true">*</span>
                <input
                  {...getErrorProps("phone")}
                  autoComplete="tel"
                  className={inputClass}
                  dir="ltr"
                  id="booking-phone"
                  inputMode="tel"
                  name="phone"
                  onChange={updateField}
                  placeholder="05xxxxxxxx"
                  ref={(element) => { fieldRefs.current.phone = element; }}
                  required
                  type="tel"
                  value={form.phone}
                />
                {renderError("phone")}
              </label>

              <label className="font-black text-[var(--color-heading)]" htmlFor="booking-service">
                {en ? "Service" : "الخدمة"} <span aria-hidden="true">*</span>
                <select
                  {...getErrorProps("service")}
                  className={inputClass}
                  id="booking-service"
                  name="service"
                  onChange={updateField}
                  ref={(element) => { fieldRefs.current.service = element; }}
                  required
                  value={form.service}
                >
                  <option value="">{en ? "Choose a Service" : "اختر الخدمة"}</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {renderError("service")}
              </label>

              <label className="font-black text-[var(--color-heading)]" htmlFor="booking-doctor">
                {en ? "Doctor (Optional)" : "الطبيب (اختياري)"}
                <select
                  {...getErrorProps("doctor")}
                  className={inputClass}
                  id="booking-doctor"
                  name="doctor"
                  onChange={updateField}
                  ref={(element) => { fieldRefs.current.doctor = element; }}
                  value={form.doctor}
                >
                  <option value="">{en ? "No Selection" : "بدون اختيار"}</option>
                  {relatedDoctors.map((doctor) => (
                    <option key={doctor.slug} value={doctor.slug}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                {renderError("doctor")}
              </label>
            </div>

            <label className="mt-6 block font-black text-[var(--color-heading)]" htmlFor="booking-notes">
              <span className="flex items-center justify-between gap-4">
                <span>{en ? "Short note (Optional)" : "ملاحظة قصيرة (اختيارية)"}</span>
                <span className="text-xs text-[var(--color-text-muted)]" aria-live="polite">
                  {form.notes.length}/{NOTES_MAX_LENGTH}
                </span>
              </span>
              <textarea
                {...getErrorProps("notes")}
                className={`${inputClass} min-h-32 resize-y`}
                id="booking-notes"
                maxLength={NOTES_MAX_LENGTH}
                name="notes"
                onChange={updateField}
                placeholder={en ? "Do not include medical information." : "لا تكتب معلومات طبية."}
                ref={(element) => { fieldRefs.current.notes = element; }}
                value={form.notes}
              />
              {renderError("notes")}
            </label>

            <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="booking-website">Website</label>
              <input
                autoComplete="off"
                id="booking-website"
                name="website"
                onChange={updateField}
                tabIndex="-1"
                type="text"
                value={form.website}
              />
            </div>

            {submitState === "success" ? (
              <div className="mt-7 border-s-4 border-green-700 bg-green-50 p-4 font-bold leading-7 text-green-900" role="status">
                {en
                  ? "Your request has been received successfully. The Kadina team will contact you to follow up on your appointment request."
                  : "تم استلام طلبك بنجاح، وسيتواصل معك فريق كادينا لمتابعة طلب الموعد."}
              </div>
            ) : null}

            {submitState === "error" || submitState === "unconfigured" ? (
              <div className="mt-7 border-s-4 border-red-700 bg-red-50 p-4 font-bold leading-7 text-red-900" role="alert">
                {en
                  ? "The request could not be sent right now. You can try again or contact us directly via WhatsApp."
                  : "تعذر إرسال الطلب حاليًا. يمكنك المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب."}
              </div>
            ) : null}

            <button
              className="ds-button ds-button-primary mt-7 min-h-12 w-full disabled:cursor-wait disabled:opacity-65"
              disabled={submitState === "submitting"}
              type="submit"
            >
              {submitState === "submitting"
                ? en
                  ? "Sending request..."
                  : "جارٍ إرسال الطلب..."
                : en
                  ? "Send appointment request"
                  : "إرسال طلب الموعد"}
            </button>

            <div className="mt-5 text-center text-sm font-black">
              <a
                aria-label={`${en ? "Use WhatsApp instead" : "استخدم واتساب بدلًا من ذلك"} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
                className="inline-flex min-h-11 items-center border-b border-[var(--color-accent-strong)] text-[var(--color-accent-strong)]"
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Use WhatsApp instead" : "استخدم واتساب بدلًا من ذلك"}
              </a>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
