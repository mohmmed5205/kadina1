import { useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { absoluteUrl } from "./seoUtils";
import { localizePath } from "../../utils/languageRouting";

function formatTitle(title, lang) {
  const normalizedTitle = title.trim();
  const brandName = lang === "en" ? "Kadina" : "كادينا";
  return normalizedTitle.toLocaleLowerCase().includes(brandName.toLocaleLowerCase())
    ? normalizedTitle
    : `${normalizedTitle} | ${brandName}`;
}

function formatDescription(description) {
  const normalizedDescription = description.trim();
  return normalizedDescription.length > 160
    ? `${normalizedDescription.slice(0, 157).trimEnd()}...`
    : normalizedDescription;
}

function localizeJsonLdUrls(value, lang, parentKey = "") {
  if (Array.isArray(value)) {
    return value.map((item) => localizeJsonLdUrls(item, lang, parentKey));
  }
  if (!value || typeof value !== "object") {
    if (
      typeof value === "string" &&
      ["url", "item", "@id"].includes(parentKey) &&
      value.startsWith(`${absoluteUrl("/")}`)
    ) {
      const parsedUrl = new URL(value);
      return absoluteUrl(
        localizePath(
          `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`,
          lang,
        ),
      );
    }
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      localizeJsonLdUrls(child, lang, key),
    ]),
  );
}

function normalizeJsonLd(jsonLd, lang) {
  if (!jsonLd) return null;

  const graph = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd];
  if (graph.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": localizeJsonLdUrls(graph, lang),
  });
}

export default function Seo({
  title,
  description,
  canonicalPath,
  ogType = "website",
  image,
  noindex = false,
  jsonLd,
  alternateLanguages = true,
}) {
  const { lang = "ar" } = useOutletContext();
  const resolvedTitle = formatTitle(title, lang);
  const resolvedDescription = formatDescription(description);
  const canonicalUrl = absoluteUrl(localizePath(canonicalPath, lang));
  const imageUrl = image ? absoluteUrl(image) : null;
  const jsonLdContent = normalizeJsonLd(jsonLd, lang);
  const alternateLanguageCodes = useMemo(
    () =>
      noindex
        ? []
        : alternateLanguages === true
          ? ["ar", "en"]
          : Array.isArray(alternateLanguages)
            ? alternateLanguages
            : [],
    [alternateLanguages, noindex],
  );

  useEffect(() => {
    const createdElements = [];
    const attributeSnapshots = [];
    const removedElements = [];
    const originalTitle = document.title;

    const ensureElement = (selector, createElement) => {
      const existingElement = document.head.querySelector(selector);
      if (existingElement) return existingElement;

      const element = createElement();
      document.head.appendChild(element);
      createdElements.push(element);
      return element;
    };

    const setAttribute = (element, name, value) => {
      if (!createdElements.includes(element)) {
        attributeSnapshots.push({
          element,
          name,
          hadAttribute: element.hasAttribute(name),
          value: element.getAttribute(name),
        });
      }
      element.setAttribute(name, value);
    };

    const setMeta = (selector, attributeName, attributeValue, content) => {
      const element = ensureElement(selector, () => {
        const meta = document.createElement("meta");
        meta.setAttribute(attributeName, attributeValue);
        return meta;
      });
      setAttribute(element, "content", content);
    };

    const removeExisting = (selector) => {
      const element = document.head.querySelector(selector);
      if (!element) return;

      removedElements.push({
        element,
        parent: element.parentNode,
        nextSibling: element.nextSibling,
      });
      element.remove();
    };

    document.title = resolvedTitle;

    setMeta(
      'meta[name="description"]',
      "name",
      "description",
      resolvedDescription,
    );

    const canonical = ensureElement('link[rel="canonical"]', () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      return link;
    });
    setAttribute(canonical, "href", canonicalUrl);

    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((element) => {
        removedElements.push({
          element,
          parent: element.parentNode,
          nextSibling: element.nextSibling,
        });
        element.remove();
      });

    const addAlternate = (hreflang, language) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = absoluteUrl(localizePath(canonicalPath, language));
      link.dataset.kadinaSeo = "alternate";
      document.head.appendChild(link);
      createdElements.push(link);
    };

    alternateLanguageCodes.forEach((language) =>
      addAlternate(language, language),
    );
    if (alternateLanguageCodes.includes("ar")) addAlternate("x-default", "ar");

    setMeta('meta[property="og:title"]', "property", "og:title", resolvedTitle);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      resolvedDescription,
    );
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      lang === "en" ? "en_US" : "ar_SA",
    );
    setMeta(
      'meta[property="og:locale:alternate"]',
      "property",
      "og:locale:alternate",
      lang === "en" ? "ar_SA" : "en_US",
    );
    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      imageUrl ? "summary_large_image" : "summary",
    );
    setMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      resolvedTitle,
    );
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      resolvedDescription,
    );

    if (imageUrl) {
      setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
      setMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        imageUrl,
      );
    } else {
      removeExisting('meta[property="og:image"]');
      removeExisting('meta[name="twitter:image"]');
    }

    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large",
    );

    if (jsonLdContent) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.kadinaSeo = "jsonld";
      script.textContent = jsonLdContent;
      document.head.appendChild(script);
      createdElements.push(script);
    }

    return () => {
      document.title = originalTitle;

      createdElements.forEach((element) => element.remove());

      attributeSnapshots.reverse().forEach((snapshot) => {
        if (snapshot.hadAttribute) {
          snapshot.element.setAttribute(snapshot.name, snapshot.value);
        } else {
          snapshot.element.removeAttribute(snapshot.name);
        }
      });

      removedElements.forEach(({ element, parent, nextSibling }) => {
        if (!parent) return;
        if (nextSibling?.parentNode === parent) {
          parent.insertBefore(element, nextSibling);
        } else {
          parent.appendChild(element);
        }
      });
    };
  }, [
    canonicalUrl,
    canonicalPath,
    alternateLanguageCodes,
    imageUrl,
    jsonLdContent,
    noindex,
    ogType,
    resolvedDescription,
    resolvedTitle,
    lang,
  ]);

  return null;
}
