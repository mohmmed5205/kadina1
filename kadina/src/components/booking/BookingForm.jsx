import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { getDoctorDetails } from "../../data/doctors";
import { getServicePages } from "../../data/services";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { fadeUp } from "../../componetts/motionPresets";
import {
  BookingConfigurationError,
  isValidSaudiMobile,
  normalizeSaudiMobile,
  submitBookingRequest,
} from "../../utils/booking";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getCurrentPath,
  trackContactAction,
  trackEvent,
} from "../../utils/analytics";

const initialForm = {
  name: "",
  phone: "",
  service: "",
  doctor: "",
  notes: "",
  website: "",
};

const NOTES_MAX_LENGTH = 500;
const TRACKED_FORM_FIELDS = new Set(["name", "phone", "service", "doctor", "notes"]);

export default function BookingForm({
  idPrefix = "booking",
  sourceSection = SOURCE_SECTIONS.BOOKING_FORM,
  className = "",
}) {
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
    if (form.doctor && !matches.some((doctor) => doctor.slug === form.doctor)) {
      return doctors;
    }
    return matches;
  }, [doctors, form.doctor, form.service]);

  const fieldId = (name) => `${idPrefix}-${name}`;

  const trackBookingStart = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent(ANALYTICS_EVENTS.BOOKING_START, {
      language: lang,
      path: getCurrentPath(location),
      source_section: sourceSection,
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

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = en ? "Enter your name." : "أدخل الاسم.";
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
        source_section: sourceSection,
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
    "mt-2 min-h-12 w-full border-0 border-b border-[var(--color-border-strong)] bg-transparent px-0 py-3 text-base font-bold text-[var(--color-heading)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-strong)] focus:ring-0";
  const getErrorProps = (field) => ({
    "aria-describedby": errors[field] ? `${fieldId(field)}-error` : undefined,
    "aria-invalid": Boolean(errors[field]),
  });
  const renderError = (field) =>
    errors[field] ? (
      <span className="mt-2 block text-sm font-bold text-red-800" id={`${fieldId(field)}-error`}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <motion.form
      animate="visible"
      className={`booking-form bg-[var(--color-surface-raised)] p-5 sm:p-7 lg:p-8 ${className}`}
      initial={shouldReduceMotion ? false : "hidden"}
      noValidate
      onFocusCapture={(event) => {
        if (TRACKED_FORM_FIELDS.has(event.target.name)) trackBookingStart();
      }}
      onSubmit={handleSubmit}
      variants={fadeUp}
    >
      <div className="grid gap-x-7 gap-y-4 sm:grid-cols-2">
        <label className="font-black text-[var(--color-heading)]" htmlFor={fieldId("name")}>
          {en ? "Name" : "الاسم"} <span aria-hidden="true">*</span>
          <input {...getErrorProps("name")} autoComplete="name" className={inputClass} id={fieldId("name")} maxLength="100" name="name" onChange={updateField} ref={(element) => { fieldRefs.current.name = element; }} required type="text" value={form.name} />
          {renderError("name")}
        </label>

        <label className="font-black text-[var(--color-heading)]" htmlFor={fieldId("phone")}>
          {en ? "Mobile number" : "رقم الجوال"} <span aria-hidden="true">*</span>
          <input {...getErrorProps("phone")} autoComplete="tel" className={inputClass} dir="ltr" id={fieldId("phone")} inputMode="tel" name="phone" onChange={updateField} placeholder="05xxxxxxxx" ref={(element) => { fieldRefs.current.phone = element; }} required type="tel" value={form.phone} />
          {renderError("phone")}
        </label>

        <label className="font-black text-[var(--color-heading)]" htmlFor={fieldId("service")}>
          {en ? "Service" : "الخدمة"} <span aria-hidden="true">*</span>
          <select {...getErrorProps("service")} className={inputClass} id={fieldId("service")} name="service" onChange={updateField} ref={(element) => { fieldRefs.current.service = element; }} required value={form.service}>
            <option value="">{en ? "Choose a service" : "اختر الخدمة"}</option>
            {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
          </select>
          {renderError("service")}
        </label>

        <label className="font-black text-[var(--color-heading)]" htmlFor={fieldId("doctor")}>
          {en ? "Doctor (Optional)" : "الطبيب (اختياري)"}
          <select {...getErrorProps("doctor")} className={inputClass} id={fieldId("doctor")} name="doctor" onChange={updateField} ref={(element) => { fieldRefs.current.doctor = element; }} value={form.doctor}>
            <option value="">{en ? "No selection" : "بدون اختيار"}</option>
            {relatedDoctors.map((doctor) => <option key={doctor.slug} value={doctor.slug}>{doctor.name}</option>)}
          </select>
          {renderError("doctor")}
        </label>
      </div>

      <label className="mt-4 block font-black text-[var(--color-heading)]" htmlFor={fieldId("notes")}>
        <span className="flex items-center justify-between gap-4">
          <span>{en ? "Short note (Optional)" : "ملاحظة قصيرة (اختيارية)"}</span>
          <span aria-live="polite" className="text-xs text-[var(--color-text-muted)]">{form.notes.length}/{NOTES_MAX_LENGTH}</span>
        </span>
        <textarea {...getErrorProps("notes")} className={`${inputClass} min-h-20 resize-y`} id={fieldId("notes")} maxLength={NOTES_MAX_LENGTH} name="notes" onChange={updateField} placeholder={en ? "Do not include medical information." : "لا تكتب معلومات طبية."} ref={(element) => { fieldRefs.current.notes = element; }} value={form.notes} />
        {renderError("notes")}
      </label>

      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input autoComplete="off" id={fieldId("website")} name="website" onChange={updateField} tabIndex="-1" type="text" value={form.website} />
      </div>

      {submitState === "success" && (
        <div className="mt-7 border-s-4 border-green-700 bg-green-50 p-4 font-bold leading-7 text-green-900" role="status">
          {en ? "Your request has been received successfully. The Kadina team will contact you to follow up on your appointment request." : "تم استلام طلبك بنجاح، وسيتواصل معك فريق كادينا لمتابعة طلب الموعد."}
        </div>
      )}
      {(submitState === "error" || submitState === "unconfigured") && (
        <div className="mt-7 border-s-4 border-red-700 bg-red-50 p-4 font-bold leading-7 text-red-900" role="alert">
          {en ? "The request could not be sent right now. You can try again or contact us directly via WhatsApp." : "تعذر إرسال الطلب حاليًا. يمكنك المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب."}
        </div>
      )}

      <button className="ds-button ds-button-primary mt-5 min-h-12 w-full disabled:cursor-wait disabled:opacity-65 sm:w-auto sm:min-w-56" disabled={submitState === "submitting"} type="submit">
        {submitState === "submitting" ? (en ? "Sending request..." : "جارٍ إرسال الطلب...") : (en ? "Send appointment request" : "إرسال طلب الموعد")}
      </button>
      <div className="mt-3 text-sm font-black">
        <a
          aria-label={`${en ? "Use WhatsApp instead" : "استخدم واتساب بدلًا من ذلك"} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
          className="inline-flex min-h-11 items-center border-b border-[var(--color-accent-strong)] text-[var(--color-accent-strong)]"
          href={whatsappUrl}
          onClick={() => trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, { language: lang, page_type: location.pathname.includes("booking") ? "booking" : "home", source_section: sourceSection })}
          rel="noopener noreferrer"
          target="_blank"
        >
          {en ? "Use WhatsApp instead" : "استخدم واتساب بدلًا من ذلك"}
        </a>
      </div>
    </motion.form>
  );
}
