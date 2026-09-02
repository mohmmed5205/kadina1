# PHASE 11 — Full QA and Production Audit

التاريخ: 2026-09-02
الفرع: `premium-visual-redesign`
النطاق: Functional، Responsive، RTL/LTR، SEO، Accessibility، Motion، Analytics، Data Consistency، وHostinger readiness. لم يبدأ تنفيذ Booking.

## الملخص التنفيذي

- اجتازت جميع أوامر الجودة النهائية: `npm run lint` و`npm run build` و`git diff --check`.
- تم تدقيق 94 عنوانًا قابلاً للفهرسة من sitemap (47 عربي + 47 إنجليزي)، إضافة إلى حالات Booking والقانوني والمسودات و404 ذات `noindex`.
- اجتازت مصفوفة responsive عدد 112 حالة ممثلة لأنواع الصفحات بالعربية والإنجليزية عبر المقاسات الثمانية المطلوبة، بلا global horizontal overflow.
- تم اكتشاف عيبين تقنيين مؤكدين وإصلاحهما: نافذة العروض لم يكن لها trigger في التطبيق، وحدث `procedure_view` كان يمكن أن يتكرر أثناء خروج الصفحة عند انتقال AnimatePresence سريع.
- توجد بوابات إدارية لازمة قبل Production، لكنها لا تمنع الانتقال إلى مرحلة Booking: اعتماد بيانات العمل المتعارضة، اعتماد Privacy/Terms، مراجعة 40 content claim، وتطبيق 301 على استضافة الدومين القديم.

## تغييرات PHASE 11 فقط

1. `src/componetts/Hero.jsx`: إضافة trigger ثنائي اللغة لنافذة العروض باستخدام `t.hero.offersCta`، مع lazy loading للمودال واستبقاء Swiper خارج initial Home bundle.
2. `src/hooks/useAnalytics.js`: منع semantic view للمكوّن الخارج إذا لم يتطابق نوع الحدث ومساره مع عنوان المتصفح الحالي.
3. `docs/phase-11-production-audit.md`: هذا التقرير.

ملفات `/tmp/phase11-*.mjs` أدوات QA مؤقتة فقط، خارج المستودع ونسخة الإنتاج، ولم تُضف إلى التطبيق.

## Route inventory

### Published / indexable

لكل لغة 47 مسارًا:

| النوع | لكل لغة | اللغتان |
|---|---:|---:|
| Home | 1 | 2 |
| About | 1 | 2 |
| Services index + 5 details | 6 | 12 |
| Published procedure | 1 | 2 |
| Technology index + 13 devices | 14 | 28 |
| Solutions index + 10 solutions | 11 | 22 |
| Doctors index + 9 doctors | 10 | 20 |
| FAQ | 1 | 2 |
| Contact | 1 | 2 |
| Blog index | 1 | 2 |
| **الإجمالي** | **47** | **94** |

الإجراء المنشور الوحيد هو `laser-hair-removal`.

### Draft / noindex

- الإجراءات الخمسة: `hair-transplant-riyadh`، `lip-filler`، `botox-face`، `eyelid-lift`، `body-contouring`.
- المقالات الاثنا عشر: `sweating-botox-before-summer`، `gentlemax-pro-vs-clarity`، `prp-or-hair-transplant`، `hifu-vs-surgical-facelift`، `acne-scars-treatment-guide`، `melasma-why-it-returns`، `hydrafacial-before-an-event`، `natural-looking-fillers`، `how-regenera-treats-hair`، `red-vs-white-stretch-marks`، `questions-before-plastic-surgery`، `fractional-laser-recovery-day-by-day`.
- `/ar/booking` و`/en/booking`: موجودان تقنيًا و`noindex`، وغير مرتبطين من الواجهة أو sitemap. لم تُعدّل صفحة Booking.
- Privacy وTerms في اللغتين: `noindex, nofollow`، بلا hreflang وبلا sitemap أو Footer أثناء `admin-review`، مع canonical صحيح.
- المسارات غير الموجودة وصفحات draft المباشرة تعرض unavailable/404 state مع H1 و`noindex`.

### Legacy redirects

- اختُبرت `/` و`/about` و`/services` و`/technology` و`/solutions` و`/doctors` و`/faq` و`/contact`.
- لا توجد loop، وتحفظ query وhash. الافتراضي عربي عندما لا توجد لغة إنجليزية محفوظة؛ وتُحترم اللغة المحفوظة وفق `LegacyRedirect`.
- `.htaccess` يستخدم 302 لمسارات current-domain legacy، ويحفظ query string، ثم SPA fallback.
- تحويل `kadina.com.sa` إلى `kadinacenter.com/ar/...` موثق كـ301 في Phase 8 ويحتاج إعدادًا على استضافة الدومين القديم؛ لم يوضع داخل React.

## Browser and functional QA

### Routes and runtime

- تدقيق sitemap: 94/94 تعرض محتوى، H1 واحد، canonical و`og:url` صحيحين، hreflang `ar/en/x-default`، `lang/dir` صحيحين، وJSON-LD صالحًا.
- لا `undefined` أو `[object Object]` أو blank main أو missing chunk.
- جميع الخدمات 5/5، الأطباء 9/9، الأجهزة 13/13، والحلول 10/10 اختُبرت في اللغتين، مباشرة وعلى mobile reference 390×844 ضمن تغطية routes/matrix.
- لم تظهر روابط `/booking` أو روابط procedure/article draft في المحتوى المنشور.
- الصور المستخدمة: 33 مرجعًا محليًا في الجرد الثابت، 0 مفقود، 0 فارغ، و0 broken image في جولات المتصفح.
- Console errors = 0، runtime exceptions = 0، وفشل شبكة محلي = 0.

### Responsive matrix

المقاسات: 360×800، 375×812، 390×844، 430×932، 768×1024، 1024×1366، 1440×900، 1920×1080.

- 14 عينة ممثلة لكل مقاس (أنواع Home، service، procedure، doctor، device، solution، FAQ، contact، legal وباللغتين): 112/112 ناجحة.
- الشرط `document.documentElement.scrollWidth <= window.innerWidth` نجح في كل حالة.
- المسارات الأفقية الداخلية المقصودة للفلاتر وSwiper لم تسبب overflow للوثيقة.

### Navbar, Home and interaction

- Desktop navigation وactive state واللغة وWhatsApp صحيحة.
- Mobile menu يفتح من أول تفاعل، يقفل body scroll، ينقل focus لأول رابط، يحصر Tab، يغلق بـEscape/route/language، يعيد focus، ويزيل lock؛ الطبقة `z-index: 80` داخل header stack صحيحة.
- ترتيب Home ومكوّناته موجود؛ Reviews لا يُرندر عند صفر بيانات ولا يترك section أو فراغًا.
- Hero LCP image: `loading=eager` و`fetchPriority=high` وسليمة.
- Home Technology وDoctors: touch swipe فعلي نجح في الاتجاه الفيزيائي الموافق لـRTL/LTR، ويتغير عنصر واحد وتتطابق الصورة/العنوان والمؤشر.
- BeforeAfter: 6 حالات، الصور سليمة، swipe/navigation/pagination يدوية، انتقال 0→1 ناجح، ولا autoplay.
- Offers: trigger عربي/إنجليزي، 3 عروض/تبويبات، dialog semantics، scroll lock، focus trap، Escape، focus return، وانتقال يدوي 0→1؛ لا autoplay.
- FAQ: 5/5، `aria-expanded` و`aria-controls` صالحان، Enter وSpace ناجحان، وFAQPage schema موجود.

### Filters and language

- Technology: 6 أزرار (`all`, `laser`, `skin-renewal`, `skincare`, `lifting-contouring`, `hair`) وinvalid fallback إلى all. التعداد الكلي 13، وتصفية laser أعطت 3. Click/Back/Forward/Refresh تحفظ الحالة الصحيحة.
- Solutions: 5 أزرار (`all`, `face`, `body`, `hair`, `skin`) وinvalid fallback إلى all. التعداد الكلي 10، وface أعطى 2. URL والحالة متزامنان.
- Doctors: 9 روابط طبيب، 6 أزرار filter، active state واحد، وعينة filter أظهرت 3 نتائج صحيحة.
- تبديل `ar → en → ar` نجح على Home وService وProcedure وDoctor وDevice وSolution وFAQ وContact، مع حفظ slug وquery وhash وH1 و`lang/dir`.

## SEO, schema and indexing

- `public/sitemap.xml`: 94 URL، 47 عربي + 47 إنجليزي، بلا duplicate أو host خاطئ أو Booking أو legal أو draft أو 404.
- `public/robots.txt` يسمح بالصفحات العامة ويشير إلى `https://kadinacenter.com/sitemap.xml`.
- canonical واحد صحيح لكل صفحة مختبرة؛ صفحات noindex تحتفظ canonical الصحيح وفق النظام الحالي.
- الصفحات المنشورة لها hreflang عربي وإنجليزي وx-default؛ noindex بلا alternates.
- JSON-LD صالح وروابطه localized. أنواع Breadcrumb/WebPage/Medical/Person/FAQ تُنشأ حسب نوع الصفحة؛ عينات الأطباء التسعة اجتازت route audit وPerson schema موجود في template.
- title/description وOG locale/URL ثنائية اللغة، ولم تظهر fallback عربية غير مقصودة في النسخة الإنجليزية.

## Analytics and PII

- نُفذت أحداث: `page_view`, `service_view`, `procedure_view`, `doctor_view`, `device_view`, `solution_view`, `language_change`, `filter_change`, `whatsapp_click`, `phone_click`, `email_click`, `map_click`.
- بعد الإصلاح: انتقال Procedure → Doctor أنتج `procedure_view` واحدًا لمساره و`doctor_view` واحدًا لمساره، دون حدث stale للمكوّن الخارج.
- payload audit: لا name أو phone أو email أو message أو free text أو medical concern أو booking notes أو WhatsApp message. لا أرقام هاتف أو بريد مستخدم ضمن payloads.
- لا GTM/GA ID أو external analytics script؛ الاختبار على `window.dataLayer` المحلي كما هو مقصود في Phase 10.

## Motion, accessibility and performance

- Normal motion: transitions، reveals، sliders، modal، والفلاتر تعمل دون opacity عالق.
- `prefers-reduced-motion: reduce`: لا عناصر نصية ظاهرة عالقة عند opacity 0، Hero transform = none، parallax off، autoplay off، وSmoothScroll لا ينشئ Lenis وفق الحارس البرمجي.
- skip link موجود، focus traps وfocus return ناجحة، عناصر التحكم الأساسية 44px+، alt attributes كاملة في الجولات، وFAQ keyboard/dialog semantics ناجحة.
- build النهائي: CSS الرئيسي 93.48 kB (gzip 16.84)، JS الرئيسي 109.16 kB (gzip 31.10)، React vendor 231.41 kB (gzip 74.15)، Swiper vendor 90.72 kB (gzip 27.57)، وOffersModal lazy chunk 18.36 kB (gzip 5.22).
- Lighthouse غير مثبت محليًا، لذلك لم تُخترع نتيجة رقمية ولم تُنزّل dependency في Phase 11.

## Hostinger / dist

- `dist/.htaccess` و`dist/_redirects` و`dist/robots.txt` و`dist/sitemap.xml` موجودة بعد build.
- refresh مباشر من dist أعاد HTTP 200 وعرض React مع H1 وcanonical وبلا overflow/errors لهذه المسارات:
  - `/ar/services/dermatology`
  - `/en/doctors/eman-almukhadab`
  - `/ar/technology/gentlemax-pro`
  - `/en/solutions/unwanted-hair`
- real files/directories bypass ثم fallback إلى `index.html` ملائم لاستضافة Apache/Hostinger.

## Data and governance gates

- ما زالت `pending-admin-confirmation` مع `officialValue: null` للعناصر المتعارضة: العنوان، ساعات العمل، الخرائط، سنة التأسيس، وادعاء الخبرة العام. لم تُعتمد قيمة افتراضية.
- `CONTENT CLAIM REVIEW REQUIRED` ما زالت موثقة لعدد 40 حقلًا، مع medical review gates. لم تُعدّل claims طبية.
- Privacy وTerms لا تزالان `admin-review` و`noindex` وغير ظاهرتين في Footer.
- يلزم تنفيذ 301 على استضافة `kadina.com.sa` قبل إطلاق Production.

## Final command status

| الأمر | النتيجة |
|---|---|
| `npm run lint` | PASS |
| `npm run build` | PASS — 464 modules |
| `git diff --check` | PASS |

## الحكم

READY FOR FINAL BOOKING PHASE
