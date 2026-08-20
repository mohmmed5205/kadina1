export function normalizeLanguage(lang) {
  return lang === "en" ? "en" : "ar";
}

export function getLocalizedValue(value, lang, fallbackLang = "ar") {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object" || Array.isArray(value)) return value;

  const normalizedLang = normalizeLanguage(lang);
  return (
    value[normalizedLang] ??
    value[fallbackLang] ??
    value.ar ??
    value.en ??
    Object.values(value).find((item) => item !== null && item !== undefined)
  );
}

export function getLocalizedText(value, lang, fallbackLang = "ar") {
  const localizedValue = getLocalizedValue(value, lang, fallbackLang);
  if (typeof localizedValue === "string") return localizedValue;
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value).find((item) => typeof item === "string") ?? "";
  }

  return "";
}
