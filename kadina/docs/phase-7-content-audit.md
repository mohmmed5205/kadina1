# Phase 7 — GEO / AI Search and Medical Content Audit

This report is an internal editorial control document. It does not approve any
medical claim and does not authorize publication. The referenced
`Kadina_Website_Audit.pdf` was not present in the available workspace or
attachment directory; the implementation follows the audit requirements quoted
in the Phase 7 brief.

## Inventory summary

The executable inventory is produced by `buildContentInventory()` in
`src/data/contentAudit.js`. It records slug, type, language, status, medical
depth, review availability, local intent and content relations.

| Type | Count | Published | Draft | English complete | English missing |
|---|---:|---:|---:|---:|---:|
| Service | 5 | 5 | 0 | 5 | 0 |
| Procedure | 6 | 1 | 5 | 1 | 5 |
| Solution | 10 | 10 | 0 | 10 | 0 |
| Device | 13 | 13 | 0 | 13 | 0 |
| Doctor | 9 | 9 | 0 | 9 | 0 |
| Article | 12 | 0 | 12 | 0 | 12 |
| Total | 55 | 38 | 17 | 38 | 17 |

Legacy service, solution, device and doctor pages have no source `status`
field. The inventory records them as published with `publishingControl` set to
`implicit-route`; this is a governance issue, not an editorial approval.

No inventoried item has complete medical reviewer metadata. No article is
published. The single published procedure is `laser-hair-removal`; its Arabic
and English bodies exist, but its medical reviewer and review date are absent.

## Opportunity groups

The controlled candidate records live in `src/data/geoContent.js`.

- Direct questions: one factual inventory answer is ready (the number of laser
  systems). Device selection, suitability, recovery and expected-result answers
  require medical review.
- Comparisons: GentleMax Pro vs Clarity and GentleMax Pro vs GentleMax Pro Plus
  have both entities in the data, but the comparison itself requires medical
  review. Red vs white stretch marks also requires medical review. PRP vs hair
  transplant, HIFU vs surgical facelift and Botox vs filler are partial.
- Decision support: choosing a hair-transplant doctor, selecting a laser system
  for the skin and preparing for filler all require reviewed source material.
- Riyadh intent: strengthen the existing dermatology, laser, plastic surgery
  and hair service pages. Keep the hair-transplant procedure draft. Do not
  create location doorway variants.
- Doctor-led: existing procedure relations identify possible contributors for
  hair transplant, lip filler, eyelid lift and body contouring, but none is
  evidence that the doctor reviewed an article.
- Problem-led: use the existing solution page for problem intent and reserve a
  separate article for education, comparison or decision support.

## Content intent map

| Type | Primary intent | Boundary |
|---|---|---|
| Service | Category | Overview and navigation across a care category |
| Procedure | Treatment | One named treatment or procedure |
| Solution | Problem | Understanding a concern and its available paths |
| Device | Technology | A named device and its documented role |
| Doctor | Provider | Verified provider profile and scope |
| Article | Informational / comparison | Answer, comparison or decision support without duplicating transactional pages |

## Cannibalization controls

1. `/services/laser`, `/procedures/laser-hair-removal` and
   `/solutions/unwanted-hair` currently repeat closely related copy. The service
   should retain category intent, the procedure should own treatment intent and
   the solution should own problem intent.
2. `/services/hair`, `/solutions/hair-loss`, the draft hair-transplant procedure
   and the draft PRP comparison need distinct category/problem/treatment/
   comparison angles before any additional publication.
3. Draft acne-scar, pigmentation and stretch-mark articles must answer a
   narrower educational question than their solution pages.
4. The draft recovery article must not be published until its day-by-day claims
   and medical reviewer are approved.

## Publishing and schema gates

- Only `status === "published"` articles and procedures are retrievable by
  their publishing selectors.
- English articles return no content unless an explicit `translations.en`
  object exists. Translated titles are not treated as approved articles.
- BlogPosting is emitted only after the article passes the published gate.
- FAQPage is emitted only when the visible article FAQ has approved entries.
- Reviewer schema and the visible reviewer block require both a resolvable
  `doctorSlug` and an explicit `lastReviewedDate`.
- No current date is generated and no fallback reviewer name is shown.
- No new route, sitemap URL or internal link is created for a candidate.

## Internal linking architecture

Published articles may declare singular or plural relations to services,
procedures, doctors, devices and solutions. `ArticleTemplate` renders only
non-empty declared relations. A reviewer link is separate from a treatment
relationship and is resolved only through review metadata. Draft candidates do
not enter internal linking.

## Claim review

`buildClaimsAudit()` scans the medical data and returns `file`, `field`, `text`
and `reason`. The current scan identifies 40 fields: 9 in services, 7 in
procedures, 9 in solutions and 15 in devices. These include comparative or
absolute language, safety wording, recovery wording, durations and result
claims. None was automatically rewritten.

High-priority examples include:

- `services.js` — `laser.subtitle`: "لا يقبل المنافسة".
- `services.js` — `hair.intro`: "عالية التركيز".
- `procedures.js` — `laser-hair-removal.expectedResults`: result and speed
  claims.
- `solutions.js` — `sweating.kadinaSolution`: a four-to-six-month duration and
  safety wording.
- `solutions.js` — `skin-aging.whatToExpect`: timing and immediacy claims.
- `devices.js` — `gentlemax-pro.tagline`: "المعيار الذهبي عالميًا".
- `devices.js` — `gentlemax-pro-plus.tagline`: "الأقوى" and safety language.
- `devices.js` — `fractional-co2.tagline`: "الأول عالميًا".
- `devices.js` — `hydrafacial.tagline`: "أشهر ... في العالم".
- `devices.js` — recovery claims for Spectra and DermaFacial.

The executable audit is the authoritative full list because it retains the
complete text and exact object path without copying claims into publishable UI.

## Required approvals

### MEDICAL REVIEW DATA REQUIRED

- A verified reviewer `doctorSlug` and explicit review date for every article
  intended for publication.
- Confirmation that a procedure-doctor treatment relation also authorizes an
  editorial reviewer attribution; these are not assumed to be equivalent.
- Review governance for substantive legacy service, solution, procedure and
  device content that is already routable.

### DIRECT ANSWER CONTENT REQUIRES MEDICAL REVIEW

- Suitability for a patient's condition.
- Device or wavelength selection by skin/hair type.
- Recovery duration or absence of recovery.
- Expected results, onset and duration.
- Any safety or comfort comparison.

### DEVICE COMPARISON CONTENT REQUIRES MEDICAL REVIEW

- GentleMax Pro vs Clarity.
- GentleMax Pro vs GentleMax Pro Plus.
- Red vs white stretch marks.
- Any table comparing indications, skin suitability, results, pain, safety,
  session time, recovery or price.

## Template and accessibility notes

`DirectAnswer` keeps the primary answer visible in the DOM and outside an
accordion. `MedicalReviewBy` shows the doctor's verified profile relation,
specialty and supplied review date only when both required values exist.
`ArticleTemplate` supports direct answers, paragraphs, lists, verified
comparison rows, visible FAQ, all five relation types and medical review
metadata. Empty sections are not rendered. Tables use horizontal containment
on narrow screens; related links already stack responsively; interactive links
have at least a 44px minimum target where introduced.

Headless Chrome DOM QA was run against the published laser-hair-removal
procedure at 390×844, 768×1024, 1024×900 and 1440×1000. Every size had one H1,
the direct answer was present, no element crossed the viewport and document
scroll width did not exceed viewport width. Arabic reported `lang=ar` and
`dir=rtl`; a separate 390×844 English run reported `lang=en` and `dir=ltr`, with
the same H1, direct-answer and overflow checks passing.
