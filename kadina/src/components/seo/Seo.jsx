import { useEffect } from "react";
import { absoluteUrl } from "./seoUtils";

function formatTitle(title) {
  const normalizedTitle = title.trim();
  return normalizedTitle.includes("كادينا")
    ? normalizedTitle
    : `${normalizedTitle} | كادينا`;
}

function formatDescription(description) {
  const normalizedDescription = description.trim();
  return normalizedDescription.length > 160
    ? `${normalizedDescription.slice(0, 157).trimEnd()}...`
    : normalizedDescription;
}

function normalizeJsonLd(jsonLd) {
  if (!jsonLd) return null;

  const graph = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd];
  if (graph.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
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
}) {
  const resolvedTitle = formatTitle(title);
  const resolvedDescription = formatDescription(description);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = image ? absoluteUrl(image) : null;
  const jsonLdContent = normalizeJsonLd(jsonLd);

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
    imageUrl,
    jsonLdContent,
    noindex,
    ogType,
    resolvedDescription,
    resolvedTitle,
  ]);

  return null;
}
