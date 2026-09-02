# Analytics event schema

## Contract

All events use `snake_case` and are appended synchronously to `window.dataLayer` by `src/utils/analytics.js`. The data layer is transport-neutral: it does not load GTM, GA4, pixels, cookies, or any other external script.

Every active payload is limited to routing and content taxonomy. The following are prohibited and filtered by key at the utility boundary: names, phone numbers, email addresses, messages, notes, free text, medical concerns, booking notes, and nested/non-primitive values. WhatsApp message text and destination contact identifiers are never copied into events.

`path` means the actual localized pathname plus query string. Hash fragments are excluded.

## Active events

| Event | Trigger | Payload | Example | Excluded data | Purpose |
|---|---|---|---|---|---|
| `page_view` | Once when the SPA pathname or query string changes; not for a hash-only change | `page_type`, `language`, `path` | `{ event: "page_view", page_type: "service", language: "ar", path: "/ar/services/laser" }` | Titles, user data, full canonical URL | Measure route consumption by language and page type |
| `service_view` | A valid service detail is rendered | `service_slug`, `language`, `path` | `{ event: "service_view", service_slug: "laser", language: "en", path: "/en/services/laser" }` | Service name, user data | Compare interest across services |
| `procedure_view` | A published, localized procedure is rendered | `procedure_slug`, `service_slug`, `language`, `path` | `{ event: "procedure_view", procedure_slug: "laser-hair-removal", service_slug: "laser", language: "ar", path: "/ar/procedures/laser-hair-removal" }` | Draft content, user/health data | Measure published procedure interest |
| `doctor_view` | A valid doctor detail is rendered | `doctor_slug`, `language`, `path` | `{ event: "doctor_view", doctor_slug: "eman-almukhadab", language: "ar", path: "/ar/doctors/eman-almukhadab" }` | Doctor display name, user data | Measure doctor-profile interest without sending names |
| `device_view` | A valid device detail is rendered | `device_slug`, `category`, `language`, `path` | `{ event: "device_view", device_slug: "gentlemax-pro", category: "إزالة الشعر بالليزر", language: "en", path: "/en/technology/gentlemax-pro" }` | Device display copy, user data | Compare device and category interest |
| `solution_view` | A valid solution detail is rendered | `solution_slug`, `area`, `language`, `path` | `{ event: "solution_view", solution_slug: "unwanted-hair", area: "الجسم", language: "ar", path: "/ar/solutions/unwanted-hair" }` | Concern text entered by a user; no such input is read | Compare interest by solution and site taxonomy |
| `article_view` | A published, localized article is rendered | `article_slug`, `language`, `path` | `{ event: "article_view", article_slug: "example-published-article", language: "ar", path: "/ar/blog/example-published-article" }` | Draft articles, titles, reader data | Measure published editorial content |
| `whatsapp_click` | Activation of a tracked WhatsApp anchor by click, tap, or keyboard | `source_section`, `page_type`, optional `slug`, `language`, `path` | `{ event: "whatsapp_click", source_section: "doctor_detail", page_type: "doctor", slug: "eman-almukhadab", language: "ar", path: "/ar/doctors/eman-almukhadab" }` | WhatsApp number and message text | Attribute WhatsApp intent to its page and CTA section |
| `phone_click` | Activation of a tracked `tel:` link outside Booking | `source_section`, `page_type`, `language`, `path` | `{ event: "phone_click", source_section: "contact", page_type: "contact", language: "en", path: "/en/contact" }` | Phone number | Measure call intent |
| `email_click` | Activation of a tracked `mailto:` link | `source_section`, `page_type`, `language`, `path` | `{ event: "email_click", source_section: "home_contact", page_type: "home", language: "ar", path: "/ar/" }` | Email address | Measure email intent |
| `map_click` | Activation of a tracked map link | `source_section`, `page_type`, `language`, `path` | `{ event: "map_click", source_section: "contact", page_type: "contact", language: "ar", path: "/ar/contact" }` | Map destination URL and address | Measure directions intent without propagating disputed location data |
| `language_change` | The user explicitly activates an available language switch | `from`, `to`, `path` | `{ event: "language_change", from: "ar", to: "en", path: "/ar/services/laser" }` | Initialization and browser-language data | Measure deliberate language switching |
| `filter_change` | The user chooses a different Technology or Solutions filter | `filter_type`, `value`, `language` | `{ event: "filter_change", filter_type: "technology_category", value: "laser", language: "en" }` | Initial/default state and repeated active-filter clicks | Understand directory filtering without inflating initialization events |

## Conditional and inactive events

| Event | Status | Activation rule | Planned payload | Example | Excluded data | Purpose |
|---|---|---|---|---|---|---|
| `review_source_click` | Inactive | Activate only when approved review data and a verified external source link are visible | `source_section`, `language`, `path` | `{ event: "review_source_click", source_section: "reviews", language: "ar", path: "/ar/" }` | Reviewer identity and review text | Measure movement to the verified review source |
| `related_content_click` | Not implemented | Add only if a defined content-path analysis requires it | `from_type`, `from_slug`, `to_type`, `to_slug`, `language` | `{ event: "related_content_click", from_type: "service", from_slug: "laser", to_type: "device", to_slug: "gentlemax-pro", language: "en" }` | Link text and user data | Optional cross-content journey analysis |
| `booking_start` | Future only | Final approved Booking phase | To be defined after the approved form and consent design | Not emitted | All form values and health/identity data | Measure an approved booking funnel |
| `booking_submit` | Future only | Final approved Booking phase and successful submission definition | To be defined after the approved form and consent design | Not emitted | All form values and health/identity data | Measure an approved booking completion |

**BOOKING EVENTS NOT ACTIVE UNTIL FINAL BOOKING PHASE.**

## Source-section taxonomy

The canonical values are defined by `SOURCE_SECTIONS`:

`navbar`, `hero`, `home_contact`, `home_final_cta`, `footer`, `contact`, `about`, `services`, `service_detail`, `doctors`, `doctor_detail`, `technology`, `device_detail`, `solutions`, `solution_detail`, `procedure_detail`, `article_detail`, `reviews`, `faq`, and `offers`.

New spelling variants must not be introduced. A source identifies the UI section where an action occurred; `page_type` separately identifies the current route type.
