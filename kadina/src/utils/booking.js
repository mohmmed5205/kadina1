const FORMSPREE_FORM_ID = "mzebrazz";
const FORMSPREE_FORM_ID_PATTERN = /^[a-z0-9]+$/i;
const FORM_SUBJECT = "Kadina Booking Request — طلب حجز جديد";

export class BookingConfigurationError extends Error {
  constructor() {
    super("The booking form provider is not configured.");
    this.name = "BookingConfigurationError";
  }
}

export class BookingSubmissionError extends Error {
  constructor(status = 0) {
    super("The booking request could not be submitted.");
    this.name = "BookingSubmissionError";
    this.status = status;
  }
}

function normalizeDigits(value = "") {
  return String(value)
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
}

export function normalizeSaudiMobile(value = "") {
  const compact = normalizeDigits(value).replace(/[\s().-]/g, "");

  if (/^05\d{8}$/.test(compact)) return `+966${compact.slice(1)}`;
  if (/^9665\d{8}$/.test(compact)) return `+${compact}`;
  if (/^\+9665\d{8}$/.test(compact)) return compact;
  if (/^009665\d{8}$/.test(compact)) return `+${compact.slice(2)}`;

  return compact;
}

export function isValidSaudiMobile(value = "") {
  return /^\+9665\d{8}$/.test(normalizeSaudiMobile(value));
}

export function getBookingProviderStatus() {
  return {
    configured: FORMSPREE_FORM_ID_PATTERN.test(FORMSPREE_FORM_ID),
    provider: "formspree",
  };
}

export async function submitBookingRequest(
  booking,
  { fetchImpl = globalThis.fetch, formId = FORMSPREE_FORM_ID } = {},
) {
  if (!FORMSPREE_FORM_ID_PATTERN.test(formId)) {
    throw new BookingConfigurationError();
  }

  const payload = {
    name: booking.name,
    phone: booking.phone,
    service: booking.service,
    language: booking.language,
    current_path: booking.currentPath,
    subject: FORM_SUBJECT,
    _gotcha: booking.honeypot || "",
  };

  if (booking.doctor) payload.doctor = booking.doctor;
  if (booking.notes) payload.notes = booking.notes;

  let response;
  try {
    response = await fetchImpl(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new BookingSubmissionError();
  }

  if (!response.ok) throw new BookingSubmissionError(response.status);

  return { ok: true, provider: "formspree" };
}
