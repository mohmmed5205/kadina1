# Phase 8 — Multilingual SEO and hreflang

## URL and default policy

Arabic and English use independent `/ar/...` and `/en/...` URL trees. The URL
prefix is the source of truth for language. With no prefix, browser-side legacy
handling reads `kadina-language` first and otherwise chooses Arabic. At the
Hostinger/Netlify layer, legacy URLs redirect deterministically to Arabic
because server redirects cannot access browser storage.

The root is a redirect, not an indexable landing page. `/ar/` is the
`x-default` target. This avoids a third duplicate home page while retaining a
clear default for crawlers.

Bare `/ar` and `/en` normalize to `/ar/` and `/en/` so each language home has
one URL form.

## Redirect policy

Current-host legacy URLs temporarily use 302 redirects to the same path under
`/ar` at the host layer. React Router provides the equivalent fallback for local
and SPA-only environments and can honor a saved English preference. Query
strings are retained by the host and router. URL fragments are retained by the
router; fragments are never transmitted to the server.

The old domain redirect must be configured at `kadina.com.sa`; it is not
implemented in React. The required production map is:

| Old URL | Target |
|---|---|
| `https://kadina.com.sa/` | `https://kadinacenter.com/ar/` |
| `https://kadina.com.sa/about` | `https://kadinacenter.com/ar/about` |
| `https://kadina.com.sa/services` | `https://kadinacenter.com/ar/services` |
| `https://kadina.com.sa/technology` | `https://kadinacenter.com/ar/technology` |
| `https://kadina.com.sa/solutions` | `https://kadinacenter.com/ar/solutions` |
| `https://kadina.com.sa/doctors` | `https://kadinacenter.com/ar/doctors` |
| `https://kadina.com.sa/faq` | `https://kadinacenter.com/ar/faq` |
| `https://kadina.com.sa/contact` | `https://kadinacenter.com/ar/contact` |
| other retained paths | same path below `https://kadinacenter.com/ar/` |

These should be 301 redirects after the new-domain mapping is verified.

## Indexing gates

The sitemap contains 47 Arabic and 47 English URLs. It excludes Booking, 404,
all 12 draft articles and five draft procedures. The published laser hair
removal procedure is included in both languages because it has an explicit
complete English data object.

English switching is disabled on an Arabic article detail without a published
English translation and on a procedure detail without an English published
record. No Arabic medical fallback is rendered as indexable English content.

## Head metadata

Indexable bilingual pages receive one self-referencing canonical plus `ar`,
`en` and `x-default` alternates. `x-default` points to Arabic. `og:url` matches
the canonical, `og:locale` is `ar_SA` or `en_US`, and the alternate OG locale is
the other language. Page URLs in JSON-LD (`url`, breadcrumb `item`, and `@id`)
are localized; image asset URLs remain unchanged.

Noindex pages receive no hreflang alternates. Booking remains noindex, is absent
from navigation and sitemap, and its form was not changed.
