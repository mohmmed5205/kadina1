export const ANALYTICS_EVENTS = Object.freeze({
  PAGE_VIEW: "page_view",
  SERVICE_VIEW: "service_view",
  PROCEDURE_VIEW: "procedure_view",
  DOCTOR_VIEW: "doctor_view",
  DEVICE_VIEW: "device_view",
  SOLUTION_VIEW: "solution_view",
  ARTICLE_VIEW: "article_view",
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
  EMAIL_CLICK: "email_click",
  MAP_CLICK: "map_click",
  LANGUAGE_CHANGE: "language_change",
  FILTER_CHANGE: "filter_change",
  REVIEW_SOURCE_CLICK: "review_source_click",
  RELATED_CONTENT_CLICK: "related_content_click",
  BOOKING_START: "booking_start",
  BOOKING_SUBMIT: "booking_submit",
});

export const SOURCE_SECTIONS = Object.freeze({
  NAVBAR: "navbar",
  HERO: "hero",
  HOME_CONTACT: "home_contact",
  HOME_FINAL_CTA: "home_final_cta",
  FOOTER: "footer",
  CONTACT: "contact",
  ABOUT: "about",
  SERVICES: "services",
  SERVICE_DETAIL: "service_detail",
  DOCTORS: "doctors",
  DOCTOR_DETAIL: "doctor_detail",
  TECHNOLOGY: "technology",
  DEVICE_DETAIL: "device_detail",
  SOLUTIONS: "solutions",
  SOLUTION_DETAIL: "solution_detail",
  PROCEDURE_DETAIL: "procedure_detail",
  ARTICLE_DETAIL: "article_detail",
  REVIEWS: "reviews",
  FAQ: "faq",
  OFFERS: "offers",
  BOOKING_FORM: "booking_form",
});

const VALID_EVENT_NAME = /^[a-z][a-z0-9_]*$/;
const VALID_EVENT_NAMES = new Set(Object.values(ANALYTICS_EVENTS));
const BLOCKED_PAYLOAD_KEY =
  /(^|_)(name|phone|email|message|note|free_text|medical_concern|booking_note)($|_)/;

let navigationState = {
  hash: null,
  id: 0,
  key: null,
  path: null,
};
const trackedViews = new Set();

function isAllowedPayloadValue(value) {
  return ["string", "number", "boolean"].includes(typeof value);
}

function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) =>
        key !== "event" &&
        !BLOCKED_PAYLOAD_KEY.test(key) &&
        value !== undefined &&
        value !== null &&
        isAllowedPayloadValue(value),
    ),
  );
}

export function getCurrentPath(location = globalThis.window?.location) {
  if (!location) return "";
  return `${location.pathname || ""}${location.search || ""}`;
}

export function getPageType(pathname = "") {
  const segments = pathname.split("/").filter(Boolean);
  const route = segments[1] || "home";
  const detail = Boolean(segments[2]);

  if (route === "services" && detail) return "service";
  if (route === "procedures" && detail) return "procedure";
  if (route === "doctors" && detail) return "doctor";
  if (route === "technology" && detail) return "device";
  if (route === "solutions" && detail) return "solution";
  if (route === "blog" && detail) return "article";
  return route;
}

export function getContactEventName(href = "") {
  if (href.startsWith("tel:")) return ANALYTICS_EVENTS.PHONE_CLICK;
  if (href.startsWith("mailto:")) return ANALYTICS_EVENTS.EMAIL_CLICK;
  if (href.includes("wa.me/")) return ANALYTICS_EVENTS.WHATSAPP_CLICK;
  return null;
}

export function getNavigationId(location) {
  const path = getCurrentPath(location);
  const key = location?.key || "default";
  const hash = location?.hash || "";
  const isFirstNavigation = navigationState.path === null;
  const isNewPath = path !== navigationState.path;
  const isSamePathNavigation =
    key !== navigationState.key && hash === navigationState.hash;

  if (isFirstNavigation || isNewPath || isSamePathNavigation) {
    navigationState.id += 1;
  }

  navigationState = { hash, id: navigationState.id, key, path };
  return navigationState.id;
}

export function trackEvent(eventName, payload = {}) {
  if (
    typeof globalThis.window === "undefined" ||
    typeof eventName !== "string" ||
    !VALID_EVENT_NAME.test(eventName) ||
    !VALID_EVENT_NAMES.has(eventName)
  ) {
    return false;
  }

  const safePayload = sanitizePayload(payload);
  if (Object.keys(safePayload).length === 0) return false;

  globalThis.window.dataLayer = globalThis.window.dataLayer || [];
  globalThis.window.dataLayer.push({ event: eventName, ...safePayload });
  return true;
}

export function trackViewEvent(eventName, payload, navigationId) {
  const viewKey = `${navigationId}:${eventName}`;
  if (trackedViews.has(viewKey)) return false;

  const tracked = trackEvent(eventName, payload);
  if (tracked) trackedViews.add(viewKey);
  return tracked;
}

export function trackContactAction(eventName, context = {}) {
  return trackEvent(eventName, {
    ...context,
    path: getCurrentPath(),
  });
}
