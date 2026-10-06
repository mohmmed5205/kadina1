# Luxury pass — resume QA

Branch: `symphony-home-redesign-v2`. Existing local work preserved.

Only application files changed during this resume:

- `src/componetts/BeforAfter.jsx`: remove forced 4:3 wrapper; use natural image height with object-contain.
- `src/pages/HomePage.css`: full-width mobile Hero CTA; adjust image position to 55% 25% at 1800px+ to retain the building mark.

Validation:

- Existing 90-case AR/EN viewport matrix retained; no internal layout rewrites.
- Home revisited and scrolled fully at 390, 768, 1024, 1440, 1920 in both languages.
- 59 functional checks rerun successfully; 18 additional checks cover mock failure/retry, real touch gestures, RTL/LTR carousel navigation and reduced motion.
- All six before/after images retain their natural ratios; one visible case on mobile and two on desktop; no autoplay or mirrored images.
- SEO spot checks: Home, Doctor, Service, Device, Solution, both languages. Canonical, three hreflang entries, parseable JSON-LD verified.
- No observed horizontal page overflow, broken images, runtime exceptions or console errors in visual checks. The intentionally mocked HTTP 500 is tested separately.
- No headings stuck transparent after scrolling with normal motion. Menu focus visible; outer touch target 44px including border.
- Real Formspree requests: **0**. Success/error responses intercepted in the browser; delivery not tested.
- Protected content, data, routing, SEO, analytics, booking logic, dependencies and sitemap hashes unchanged.

The images in this folder show the final composition. `hero-before.jpg` preserves the former rigid split for comparison. `existing-90-viewport-results.json` is the earlier completed matrix; `visual-results.json` records the resume checks. The 1920 Hero screenshot includes the final crop adjustment.
