export const SUPPORTED_LANGUAGES = ["ar", "en"];
export const DEFAULT_LANGUAGE = "ar";

export function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value);
}

export function getLanguageFromPath(pathname = "/") {
  const language = pathname.split("/").filter(Boolean)[0];
  return isSupportedLanguage(language) ? language : null;
}

export function stripLanguagePrefix(pathname = "/") {
  const stripped = pathname.replace(/^\/(?:ar|en)(?=\/|$)/, "");
  return stripped || "/";
}

export function localizePath(to, language) {
  if (!to || typeof to !== "string") return to;
  if (/^(?:[a-z]+:|\/\/|#)/i.test(to)) return to;

  const match = to.match(/^([^?#]*)([?#].*)?$/);
  const pathname = stripLanguagePrefix(match?.[1] || "/");
  const suffix = match?.[2] || "";
  const normalizedPath = pathname === "/" ? "/" : pathname;
  return `/${language}${normalizedPath}${suffix}`;
}

export function switchLanguagePath(location, language) {
  const pathname = stripLanguagePrefix(location.pathname);
  return localizePath(`${pathname}${location.search}${location.hash}`, language);
}
