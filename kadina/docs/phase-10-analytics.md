# Phase 10 — Analytics and Data Layer

## Existing analytics audit

No existing `gtag`, `dataLayer`, GTM container, GA4 measurement ID, Meta Pixel, TikTok Pixel, Snap Pixel, page-view tracker, event helper, or consent layer was found in application code. Package-lock references to the generic `cookie` dependency are transitive package metadata, not a site analytics implementation.

## Architecture

- `src/utils/analytics.js` owns event constants, the source taxonomy, payload sanitization, current-path/page-type helpers, the browser-safe data-layer push, and view-event duplicate protection.
- `src/hooks/useAnalytics.js` owns SPA `page_view` and detail-view effects.
- `MainLayout` observes route language and location. The actual localized pathname plus query string is used; the hash is excluded.
- Detail templates emit their own semantic view event only after their localized record passes its availability/publication gate.
- Contact actions use normal `click` handlers, which cover mouse, touch-generated click, and keyboard activation. `dataLayer.push` is synchronous and does not block external navigation.
- No design, user-facing copy, SEO, schema, sitemap, Privacy/Terms content, or Booking implementation was changed.

## Data-layer safety

`trackEvent` returns without throwing when `window` is unavailable, accepts only names from the approved event constants, rejects invalid names and payload attempts to override `event`, removes `undefined`, `null`, prohibited PII-key patterns, arrays, and objects, and refuses to push an event with no safe payload fields. It creates `window.dataLayer` only in the browser. No production logging is present.

The active schema never includes customer names, phone numbers, customer email addresses, free text, medical concerns, booking notes, or WhatsApp message contents. Content titles and doctor names are also omitted where slugs are sufficient.

## View and duplicate behavior

Each real pathname/query navigation receives an internal navigation ID. The combination of navigation ID and view-event name can be emitted once. This prevents React StrictMode's repeated development effects while allowing the same path to be measured again after the user leaves and later returns. Hash-only navigation does not create a new page view.

Query changes, including user-selected directory filters, create a new `page_view` carrying the updated actual path. The explicit filter action also produces one `filter_change`. Default filter initialization and clicking an already active filter produce no `filter_change`.

## Activation status

Active events are documented in `docs/analytics-event-schema.md`: `page_view`, the six detail-view events, published `article_view`, four contact actions, `language_change`, and `filter_change`.

`review_source_click` remains inactive because the approved review collection and verified source URL are empty. `related_content_click` was not implemented because the current measurement requirement is satisfied without creating another broad interaction event.

`booking_start` and `booking_submit` exist as future constants/documentation only. No trigger was added and `BookingPage` was not modified.

## GTM, GA, consent, and privacy

**GTM/GA ID REQUIRED.** No GTM or GA ID exists, so no external script or invented identifier was added. Meta, TikTok, and Snap pixels are also absent.

No cookie or consent banner was added. Before any analytics vendor is connected, the actual vendor, storage behavior, data destinations, retention settings, and consent requirements must be reviewed, and the `admin-review` Privacy content must be updated and approved accordingly.

## QA results

Browser QA covered Home, Service, published Procedure, Doctor, Device, Solution, and Contact in Arabic and English at 390px and 1440px: 28 route/viewport combinations. Every navigation emitted exactly one `page_view`; every valid detail emitted exactly one matching semantic view. There was no horizontal overflow and no console exception in any case.

Additional interaction results:

- Contact WhatsApp, phone, keyboard-activated email, and map actions each emitted their expected event exactly once.
- An Arabic-to-English service switch emitted one `language_change`, one English `page_view`, and one English `service_view`. A temporary stale-language transition found during QA was fixed by requiring the detail payload language to match the URL prefix before emission.
- Technology and Solutions filter selections each emitted one `filter_change`; their query-string navigation emitted one `page_view` with the updated path.
- A hash-only change emitted no additional event.
- A draft article emitted `page_view` only and no `article_view`.
- All inspected payloads passed the prohibited-key audit; no PII, health data, message contents, phone destination, or email destination appeared.
- A direct utility-boundary test rejected an invalid event name and an empty payload, stripped PII-pattern keys and a nested object, retained only the safe `path`, and returned safely with no browser `window` present.
- StrictMode produced no duplicate view event.

Static verification: `npm run lint`, `npm run build`, and `git diff --check` pass at Phase 10 handoff.
