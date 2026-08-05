export function normalizeLanguage(lang) {
  return lang === "en" ? "en" : "ar";
}

export function getLocalizedValue(value, lang, fallbackLang = "ar") {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object" || Array.isArray(value)) return value;

  const normalizedLang = normalizeLanguage(lang);
  return value[normalizedLang] ?? value[fallbackLang];
}

export function getLocalizedText(value, lang, fallbackLang = "ar") {
  const localizedValue = getLocalizedValue(value, lang, fallbackLang);
  return typeof localizedValue === "string" ? localizedValue : "";
}
