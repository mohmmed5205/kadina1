# Phase 9 — Privacy, Terms and Data Consistency

## Decision summary

- The privacy and terms routes exist in Arabic and English, but their content status is `admin-review`.
- The routes use `noindex, nofollow` and intentionally emit no `hreflang` alternates while unapproved.
- They are intentionally absent from the Footer and sitemap until legal content is approved for publication.
- No legal compliance claim, medical disclaimer, cookie policy, analytics tool, consent control, or Booking change was introduced.
- Confirmed contact identifiers are centralized in `src/data/business.js`. Conflicting operational data is preserved as explicitly pending candidates; no candidate is declared official.

## DATA REQUIRES ADMIN CONFIRMATION

| Field | Value A | Location A | Value B / C | Location B / C | Status | Admin action required |
|---|---|---|---|---|---|---|
| Phone | `0114555444` / same digits in international display | `src/data/business.js`, consumed by contact, content, and offer data | Same number remains hardcoded only in Booking | `src/pages/BookingPage.jsx` | Observed consistent | Confirm that this is the official public phone. Booking was not changed because it is outside Phase 9. |
| WhatsApp | `966114555444` | `src/data/business.js`, `src/utils/whatsapp.js`, `src/data/content.js` | No conflicting number found | Project audit | Observed consistent | Confirm ownership before production handoff. |
| Email | `info@kadina.sa` | `src/data/business.js`, consumed by contact/content data | No conflicting email found | Project audit | Observed consistent | Confirm the monitored mailbox. |
| Business hours | Saturday–Thursday, 09:00–22:00 | `src/data/contact.js` (now represented as a candidate in `src/data/business.js`) | Saturday–Thursday, 10:00–22:00; Monday–Friday, 09:00–22:00 | `src/data/content.js`; `src/data/pagesContent.js`, `src/pages/FaqPage.jsx` | Pending admin confirmation | Supply official days, opening time, closing time, timezone, and holiday policy. |
| Address | Riyadh — Al-Murooj — Exit 5 | `src/data/contact.js` (now represented as a candidate in `src/data/business.js`) | Riyadh — Northern Ring Road | `src/data/content.js`, `src/data/pagesContent.js`, `src/pages/FaqPage.jsx` | Pending admin confirmation | Supply one approved Arabic address and its approved English rendering. |
| Map URL | `https://maps.app.goo.gl/cLeVtBdTjNd71GrPA?g_st=ic` | `src/data/contact.js` (now represented as a candidate in `src/data/business.js`) | `https://maps.app.goo.gl/5RMSXMden4ex7MTD7?g_st=com.google.maps.preview.copy` | `src/data/content.js` | Pending admin confirmation | Identify the official listing URL and approved embed target. |
| Map embed | Google Maps text query for “Kadina Medical Center Riyadh” | `src/data/business.js`, consumed by `src/pages/ContactPage.jsx` | Two unverified short listing URLs above | Contact/content data | Pending admin confirmation | Replace the query candidate only after the official listing is selected. |
| Founding year | 2013 | `src/data/about.js`, `src/data/content.js`, `src/components/home/HomeTrustSection.jsx`, `src/pages/AboutPage.jsx` | No different founding year found | Project audit | Pending admin confirmation | Confirm the year and evidence before treating it as a verified organization fact or adding it to schema. |
| General experience claim | `15+` years | `src/data/about.js`, `src/data/content.js`, `src/data/pagesContent.js` | `+10` years in a separate generic stats block | `src/data/content.js` | Pending; subject is undefined | Define whether each claim describes the center, team, or a specific practitioner and provide the approved wording. |
| Individual doctor experience | 5, 10, 15, or 20 years depending on provider | Doctor data records | Generic `15+` / `+10` claims | About/home/page data | Separate provider claims; not merged | Verify each provider claim independently; do not use it to infer center age. |
| Social links | Snapchat `kadina_center`, Instagram `kadina_center`, TikTok `@kadina_center` | `src/data/business.js`, consumed by `src/data/content.js` and Footer | No empty or competing social URLs found | Project audit | Observed consistent | Confirm account ownership. Existing Footer anchors use `_blank` with `noopener noreferrer`. |
| MedicalClinic schema | No active `MedicalClinic` JSON-LD found | SEO/schema audit | Contact data exists in visible pages | Contact/Home/FAQ | No current schema conflict | Do not add organization phone/address/hours to schema until conflicting operational data is approved. |

## BUSINESS HOURS REQUIRE ADMIN CONFIRMATION

Three incompatible schedules are currently present. `src/data/business.js` records all three as candidates and marks the field `pending-admin-confirmation`. The existing Contact/Home Contact presentation remains on its prior contact-data candidate; FAQ and other content were not silently rewritten. The nonsensical English mapping `Saturday – Saturday` was corrected to the corresponding existing candidate, `Saturday – Thursday`; this is a translation/mapping correction, not administrative confirmation of the schedule.

## OFFICIAL ADDRESS REQUIRED

“Al-Murooj — Exit 5” and “Northern Ring Road” may or may not describe the same destination, but the repository provides no authoritative evidence. Both are retained as candidates. Exact location wording was removed from Contact-page metadata so that metadata does not contradict the visible candidate while review is pending.

## OFFICIAL MAP URL REQUIRED

Two different Maps short URLs and one text-query embed were found. They are documented in `src/data/business.js`; none is labeled official. Administration must confirm the business listing before the map URL is propagated to all content or structured data.

## EXPERIENCE CLAIM REQUIRES ADMIN CONFIRMATION

The year 2013 is consistently described as the center's start year, but it is still an unverified claim. The generic `15+` and `+10` experience labels do not identify their subject. They must not be derived from 2013 or merged with individual clinician experience. `src/data/business.js` therefore stores the generic claim with `subject: null` and a pending status.

## LEGAL CONTENT REQUIRES ADMIN APPROVAL

`src/data/legal.js` defines the lifecycle states `draft`, `admin-review`, `approved`, and `published`. Privacy and Terms are currently `admin-review`, with `indexable: false` and no claimed last-updated date. Their Arabic and English pages provide a professional review-state structure only. Before publication, an authorized legal/administrative reviewer must supply and approve the actual policy, terms, medical-information wording, data practices, responsible contact channel, and effective/last-updated date.

## Single-source architecture

`src/data/business.js` is the governance layer:

- `businessContact` contains the observed-consistent phone, WhatsApp number, and email.
- `businessAddress`, `businessHours`, and `businessMaps` retain every conflicting candidate with `pending-admin-confirmation`.
- `businessSocialLinks` contains the non-empty current social URLs without changing account names.
- `businessHistoryClaims` separates founding year from the subjectless generic experience claim.

`src/data/contact.js`, the WhatsApp utility, current Contact/Home Contact consumers, and the shared content records now derive confirmed identifiers from this layer. Conflicting FAQ/content values remain untouched until confirmation so the refactor does not masquerade as an administrative decision.

## Publication gates

| Item | Current behavior | Approval gate |
|---|---|---|
| `/ar/privacy`, `/en/privacy` | Reachable, `admin-review`, `noindex, nofollow`, no alternates | Approved Arabic and English policy content |
| `/ar/terms`, `/en/terms` | Reachable, `admin-review`, `noindex, nofollow`, no alternates | Approved Arabic and English terms content |
| Footer links | Hidden | Add only when pages are suitable for publication |
| Sitemap entries | Excluded | Add only when status and indexing are approved |
| Legal-page hreflang | Excluded while noindex | Add `ar`, `en`, and Arabic `x-default` once both versions are approved/indexable |
| Canonicals | Self-referencing localized canonical on each route | Retain after publication |
| Legal structured data | None | `WebPage` may be considered after approval; no inappropriate legal schema |

## Out-of-scope safeguards

- `src/pages/BookingPage.jsx` was audited but not changed, including its current hardcoded phone.
- No Booking fields, consent checkbox, cookie banner, analytics, or standalone cookie policy were added.
- No PDPL, GDPR, DPO, processor, retention, security, or other unverified legal claim was introduced.
- No Phase 10 work was started.
