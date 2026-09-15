RESUME SUMMARY

Resumed from the existing worktree on 2026-09-15. The worktree, current diff, and fresh browser checks were used as evidence. The previous `dark-kadina-system-review.md` contains unfinished placeholders and refers to unavailable `/tmp/kadina-dark` artifacts; its QA claims were not reused.

| Requirement | State When Resumed | Action Taken | Final State |
|---|---|---|---|
| Dark tokens | DONE | Audited existing semantic tokens; no second token system | DONE |
| Main background | DONE | Verified dark body and page surfaces | DONE |
| Navbar | DONE | Verified mobile menu, language switch, active links and scrolled surface | DONE |
| Home | PARTIALLY DONE | Reused existing rail, fixed focused-card visibility; preserved control-row spacing and other sections | DONE |
| About | DONE | Preserved About fidelity layout and proportions; browser checks only | DONE |
| Services | DONE | Preserved specialty panels and service details; verified device contrast | DONE |
| Doctors marquee | PARTIALLY DONE / REGRESSION FOUND | Shared the existing CSS implementation with the directory; explicitly scroll focused cards fully into view | DONE |
| Doctors page | PARTIALLY DONE | Replaced the remaining grid with the existing rail and cards; preserved filters and their analytics | DONE |
| Doctor detail | DONE | Verified Person schema, links, analytics and dark surfaces; no edits | DONE |
| Technology | DONE | Verified index/detail, filters and object-contain on intentional beige image surfaces | DONE |
| Solutions | DONE (main UI); PARTIAL (fallback shadow) | Preserved architecture/data; replaced old fallback shadow with existing semantic shadow | DONE |
| FAQ | DONE | Verified question toggles, cream text, gold controls and hairline separators | DONE |
| Contact | DONE | Verified phone/email/WhatsApp/map links and unfiltered map | DONE |
| Booking | DONE | Verified query prefill, validation, normalized phone, mock error/success and analytics; no form edits | DONE |
| BeforeAfter | DONE | Verified manual slide navigation and no autoplay | DONE |
| Footer | DONE | Verified darkest surface and mobile/desktop layout | DONE |
| Reduced Motion | DONE | Verified animation none, visible originals and native manual scrolling | DONE |
| RTL/LTR | PARTIAL (keyboard visibility) | Preserved direction handling; verified repaired focused-card visibility in both directions | DONE |
| Remaining color audit | PARTIAL | Replaced old blog orange glow/brown shadows and scroll-progress glow with existing semantic tokens | DONE |

The only production files changed during this resume are `HomeDoctorsSection.jsx`, `DoctorsPage.jsx`, the new shared `DoctorsMarquee.jsx`, the static-filter rules in `index.css`, and small token substitutions in ArticleCard, ArticleTemplate, BlogPage, ScrollProgress and SolutionPageTemplate. Existing medical data, routes, slugs, SEO, analytics definitions, booking logic/provider, WhatsApp data, manifests and lockfile were preserved. No git add/commit/push/merge/reset/restore/checkout was performed.

DOCTORS MARQUEE FINAL

- Existing CSS keyframes retained: `doctors-marquee 60s linear infinite`; equal original/duplicate groups and `translateX(-50%)`.
- Home and the unfiltered Doctors page each display all 9 doctors. Filtered subsets use a static horizontal scroller, avoiding short looping groups and preserving the existing filters.
- 9 original interactive links, 9 visual duplicates with `aria-hidden` and `tabIndex=-1`; no duplicate tab stops. Both sets remain pointer-clickable.
- Cards retain a 4:5 portrait, name and specialty. Existing missing portrait uses the existing placeholder rather than invented imagery.
- Measured fractional card capacity: 390 → 1.49; 1440 → 4.04; 1920 → 5.56. Cards cap at 20rem on large screens.
- Twelve browser cases: Home/Doctors × AR/EN × 390/1440/1920. All passed hover pause, leave resume, focus pause, focus leave resume, all nine focused cards fully visible, duplicate tab exclusion, reduced-motion manual scrolling and no page overflow.
- Loop geometry sampled at 0, 1, 15000, 30000, 59999 and 60001ms. The seam has exactly the ordinary inter-card spacing, with no extra gap or discontinuous card layout.
- Existing keyboard mode switches to a stationary native scroller and hides the duplicate group while focus is inside. The repair adds `scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'instant' })` because Chrome otherwise leaves partially visible focused cards clipped.
- Explicit pause/resume control retained. No timer or dependency was added.

DARK SYSTEM FINAL

| Role | Value / behavior |
|---|---|
| Primary | `#302012` |
| Secondary | `#382719` |
| Elevated | `#453121` |
| Footer | `#21160d` |
| Cream | `#fffaf2` headings/body; muted cream at 74% |
| Gold | `#d6a35b` accents, active states, focus and primary buttons |
| Light exceptions | Warm Beige `#f1e7d8` booking form and device visual islands; original image artwork and the unfiltered map |
| Buttons | Gold with brown text; subtle outlined secondary buttons; existing hover tokens |
| Borders | Warm cream hairlines at 14%, stronger separation at 24% |

No palette or duplicate semantic token system was introduced. Functional red/green feedback remains intact. Existing layout widths, typography reductions, About hero and service panel direction were preserved. A quick check of [Symphony Home](https://symphony.sa/) confirmed the same broad sequence of compact navigation, hero, numbers, team, booking, before/after and contact; no new redesign or content copying was done.

QA

- 14 templates in AR and EN at 390×844 and 1440×900: Home, About, Services, Service Detail, Doctors, Doctor Detail, Technology, Device Detail, Solutions, Solution Detail, Procedure Detail, FAQ, Contact and Booking.
- 56 normal-motion cases plus 80 reduced-motion cases (the latter includes Home/Doctors/Services/Booking spot checks at 768, 1024 and 1920; 1920 height 1080).
- Three matrix navigations encountered transient browser resource-loading delays. Their page headings/canonicals were individually rechecked, rather than treating the initially empty shell as a pass.
- No page horizontal overflow or broken images in completed/rechecked pages. Zero application console errors and runtime exceptions in the matrix; browser network logs separately include aborted/resource-limited requests from the batch navigation.
- 54 targeted checks passed: mobile menu/language, FAQ toggling, all technology/solution filters, original/duplicate pointer links, offers opening/closing, and lower-section visibility/overflow.
- Booking success/error used an in-page fetch stub with Formspree network requests blocked. No real submission. Confirmed `mzebrazz`, query prefill, validation, Arabic-digit mobile normalization, form reset, `booking_start` and `booking_submit` with no PII.
- Verified `page_view`, `doctor_view`, `whatsapp_click`; external navigation prevented during click tests. Phone/email/map targets read without contacting anyone.
- SEO spot checks: localized canonical, hreflang/OG, JSON-LD, Person and FAQ schemas. Booking retains its existing noindex behavior without hreflang/JSON-LD.
- `npm run lint`: PASS. `npm run build`: PASS. `git diff --check`: PASS.

Persistent structured summary: [dark-resume-qa.json](./dark-resume-qa.json). Detailed fresh browser evidence and screenshots: `/tmp/kadina-resume/` (`matrix.json`, `normal-matrix.json`, `marquee.json`, `functional.json`, `targeted.json`, `recheck.json`, logs and PNGs). The first functional pass had selectors/timing that required targeted rechecks; the final targeted results supersede those inconclusive readings.

Touch emulation at 390×844: AR and EN both passed pause-on-touch and card navigation. All three delayed pages passed their individual rechecks.

RESUMED DARK KADINA PASS COMPLETE
