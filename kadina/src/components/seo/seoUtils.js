export const SEO_BASE_URL = "https://kadinacenter.com";

export function absoluteUrl(path = "/") {
  return new URL(path || "/", `${SEO_BASE_URL}/`).toString();
}

export function createBreadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createWebPageSchema({
  type = "WebPage",
  name,
  description,
  path,
}) {
  return {
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function createFaqSchema(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
