DARK KADINA SYSTEM

مراجعة 13 سبتمبر 2026. التنفيذ مبني على التعديلات المحلية الموجودة عند البداية؛ لم تُستخدم أوامر add/commit/push/merge/reset/restore، ولم تُضف مكتبات.

| # | البند | النتيجة |
|---|---|---|
|1|Design tokens|أضيفت أسطح دلالية مستقلة مع إبقاء قيم هوية كادينا الأصلية ثابتة. أعيد توجيه `--color-surface`, `--color-heading`, `--color-text`, `--color-border` إلى النظام الداكن.|
|2|الخلفية العامة|`#302012` على body وMainLayout عبر token المشترك.|
|3|Dark hierarchy|Primary `#302012`، Secondary `#382719`، Elevated `#453121`، Footer `#21160d`.|
|4|Cream|`#fffaf2` للنص، وopacity .74 للنص الثانوي. الأسطح الفاتحة محصورة أساسًا في نموذج الحجز وخلفيات صور الأجهزة وصور المحتوى الأصلية.|
|5|Gold|`#d6a35b` للأرقام والأزرار والفلاتر النشطة والفواصل والتفاعل؛ hover الزر `#e3b777`.|
|6|الأزرار|Primary ذهبي ونص بني ثابت `--color-ink`؛ Secondary شفاف ونص Cream وحد رفيع؛ روابط نصية بخط/سهم ذهبي.|
|7|الحدود|Cream بنسبة .14، و.24 للحالات التي تحتاج فصلًا أقوى؛ إزالة ألوان white والدرجات القديمة من الاستخدامات المستهدفة.|
|8|Navbar|سطح بني بشفافية .96 وblur؛ شعار كادينا واضح على الداكن؛ روابط Cream وactive/hover ذهبي؛ حجز وتبديل لغة؛ Escape واستعادة التركيز وقفل التمرير.|
|9|Hero|الصورة الأصلية وطبقة Brown محفوظتان. Home H1 حتى68px؛ عنوان الطبيب حتى42px؛ لا بطاقات جديدة في Hero.|
|10|إيقاع Home|Hero → Numbers داكن → About secondary → Brand Statement primary → Doctors primary → Why secondary → Booking secondary مع نموذج فاتح → BeforeAfter primary → Location primary → Footer أغمق.|
|11|About|نسب الصفحة وHero نحو350px محفوظة؛ Identity وExperience secondary وMission elevated؛ الأرقام والـindices ذهبية.|
|12|Services|Specialty Panels محفوظة؛ المحيط داكن، وصور الأجهزة ذات خلفية Beige. العناصر البديلة دون صورة تبقى داكنة مقروءة. تفاصيل الخدمة ضمن النظام نفسه.|
|13|Technology|الخلفية والعناوين داكنة/Cream؛ صور الأجهزة contain فوق Beige؛ تحسين focus المرئي للفلاتر وروابط النتائج.|
|14|Solutions|تصميم الاحتياج محفوظ؛ درجات بنية ونصوص Cream؛ حالات عدم وجود نتائج والروابط القديمة حُولت إلى tokens.|
|15|FAQ|Accordion بفواصل رفيعة وأسئلة Cream وأجوبة muted Cream و+/× ذهبي؛ تخفيف أحجام العناوين والأسئلة الكبيرة.|
|16|Contact|صفوف تواصل داكنة بفواصل؛ CTA ذهبي؛ مصدر الخريطة ومحتواها دون تعديل أو filter.|
|17|Booking|نطاق tokens فاتح محلي للنموذج، مع مدخلات وحدود ونص بني مقروء؛ Formspree `mzebrazz` وvalidation وsubmit وquery prefill محفوظة حرفيًا.|
|18|BeforeAfter|خلفية داكنة وصور أصلية وضوابط ذهبية؛ يدوي دون autoplay.|
|19|Footer|`#21160d` وفاصل رفيع، نص Cream وروابط ذهبية؛ روابط الهاتف والبريد ≥44px. العروض والمدونة وحالات الخطأ تستفيد أيضًا من توحيد الألوان.|

التوكنز الجديدة في `src/index.css`: `--surface-dark-primary`, `--surface-dark-secondary`, `--surface-dark-elevated`, `--surface-dark-footer`, `--surface-light`, `--surface-muted`, `--text-on-dark`, `--text-on-dark-muted`, `--accent-gold`, `--border-on-dark`, `--color-ink`, `--color-accent-hover`, `--color-accent-wash`.

التباين المحسوب: Cream على الأسطح البنية 11.79–17.05:1، muted Cream ‏7.24–9.69:1، Gold ‏5.40–7.80:1، النص البني على زر Gold ‏6.90:1، accent النموذج على Beige ‏5.46:1. هذه قياسات أزواج الألوان الدلالية؛ ليست قياسًا لكل بكسل فوق الصور.

DOCTORS MARQUEE

| # | البند | النتيجة |
|---|---|---|
|20|التنفيذ|React/Tailwind وCSS animation في index.css؛ حذف Swiper من HomeDoctorsSection. صف واحد بمجموعتين متساويتين، بلا setInterval أو CSS منفصل للأطباء.|
|21|مدة الدورة|60 ثانية، linear، infinite.|
|22|عدد الأطباء|9 أطباء من البيانات الأصلية، و9 نسخ بصرية مخفية دلاليًا؛ 8 صور فعلية والعنصر البديل الموجود للطبيبة دون صورة محفوظ.|
|23|1440|نحو4.04 بطاقة؛ عرض البطاقة331px تقريبًا، وصورة4:5.|
|24|390|نحو1.49 بطاقة؛ عرض البطاقة242px تقريبًا، وصورة4:5.|
|25|Loop|كل مجموعة تشمل المسافة النهائية؛ translateX(-50%) يساوي عرض مجموعة كاملة. فُحصت التغطية عند0/1/15000/30000/59999/60001ms دون فراغ زائد.|
|26|Hover|animation-play-state: paused، مع pointer handling للماوس أيضًا؛ استئناف عند المغادرة.|
|27|Focus|توقف بـfocus-within. أثناء تنقل لوحة المفاتيح تصبح المجموعة الأصلية scroller ثابتًا لضمان ظهور كل بطاقة مركزة؛ يعود الشريط بعد مغادرة التركيز.|
|28|Touch|توقف أثناء pointerdown، واستئناف عند up/cancel/leave؛ البطاقات روابط مباشرة، ولا تعتمد اللمسات على hover.|
|29|Reduced Motion|animation:none صريح، وإخفاء النسخة البصرية، وتمرير أفقي يدوي؛ ترتيب RTL يبدأ من أول طبيب منطقي.|
|30|RTL|انعكاس اتجاه animation؛ النصوص والقوائم RTL، والـviewport أثناء الحركة LTR لعزل إحداثيات transform ومنع اختفاء الشريط.|
|31|LTR|اتجاه الحركة الافتراضي والنصوص الإنجليزية LTR؛ الفحص على390 و1440.|
|32|Accessibility|9 روابط أصلية؛ النسخة الثانية aria-hidden وروابطها tabIndex=-1؛ focus مرئي، زر إيقاف/استئناف مستقل، وتحقق الوصول للأطباء التسعة بلوحة المفاتيح.|

فلاتر الأطباء محفوظة في صفحة الدليل المدمجة؛ الرئيسية تعرض الأطباء التسعة دائمًا. وصلنا فلتر الدليل بحدث `filter_change` الموجود لأنه لم يكن يرسله في النسخة المحلية السابقة. لم تتغير تعريفات الأحداث أو تنقية البيانات؛ لا PII في الأحداث المختبرة.

SYMPHONY FIDELITY

| # | البند | النتيجة |
|---|---|---|
|33|الفروقات الملحوظة|المرجع الحي متصل بأسطح داكنة، بينما كادينا كانت تستخدم Cream/Beige في Navbar وصفحات رئيسية وداخلية. المرجع يعرض حاليًا صورة جماعية في الرئيسية وصفوف أطباء مصنفة في الدليل، وليس نفس شريط Home المطلوب. كانت بعض عناوين Contact/FAQ/Doctor أكبر من التسلسل المرغوب.|
|34|ما طُبق|توحيد سيادة اللون، وفصل الأسطح، وتبسيط بطاقة الطبيب إلى صورة/اسم/تخصص، وحركة هادئة، وإصلاح التباين والفلاتر والتركيز. حُفظت الحاوية76rem والمسافات والنسب المعتمدة، ومنها نسب About الخاصة.|
|35|ما لم يُنسخ|لا نصوص أو صور أو أيقونات أو شعارات أو ألوان Symphony. لا إبدال لمحتوى كادينا أو تخصصاتها ولا اختلاق بيانات لملء المساحات؛ الشريط ينفذ طلب المستخدم حتى مع اختلاف عرض المرجع الحالي.|
|36|390×844|هوية داكنة متصلة، أرقام2×2، دليل أطباء بعمودين، marquee نحو1.49 بطاقة؛ فحص AR/EN. شُمل أيضًا430×932.|
|37|768×1024|تكديس تابلت متوازن، صور أجهزة محدودة، نصوص كاملة، فحص AR/EN.|
|38|1024×1366|بنية desktop حيث تسمح breakpoints، نسب Hero محفوظة، فحص AR/EN.|
|39|1440×900|نحو4.04 أطباء في Home، صور4:5 وعناوين مضبوطة، فحص AR/EN.|
|40|1920×1080|حاويات المحتوى لا تتمدد بلا حد؛ بطاقات marquee حدها20rem؛ فحص AR/EN.|

المراجع المفتوحة والمفحوصة فعليًا في Chrome: [Home](https://symphony.sa/)، [About](https://symphony.sa/about/)، [Services](https://symphony.sa/services/)، [Doctors](https://symphony.sa/doctors/)، [Contact](https://symphony.sa/contact/). حفظت لقطات وقياسات المرجع في `/tmp/kadina-dark/reference*`. مقارنة التصميم هي ملاءمة الإيقاع والنسب لهوية كادينا، وليست ادعاء تطابق بكسلي أو نسخ الموقع الآخر.

| # | QA | النتيجة |
|---|---|---|
|41|Console errors|MATRIX_STATUS|
|42|Runtime exceptions|MATRIX_STATUS|
|43|Horizontal overflow|MATRIX_STATUS|
|44|Broken images|MATRIX_STATUS؛ فحص إضافي حمّل جميع صور الأطباء، و28 لقطة صفحة/مقاس مع تحميل كل الصور. البديل الموجود لطبيبة واحدة ليس صورة مكسورة.|
|45|npm run lint|COMMAND_STATUS|
|46|npm run build|COMMAND_STATUS|
|47|git diff --check|COMMAND_STATUS|

نطاق الاختبار: 14 قالب صفحة × لغتين ×6 مقاسات =168 حالة؛ تشمل Home/About/Services/Doctors/Technology/Solutions/FAQ/Contact/Booking ونموذج تفاصيل لكل من Service/Doctor/Device/Solution/Procedure. لا يعني ذلك زيارة كل slug من الدلائل على كل مقاس. فُحصت94 حالة تفاعل إضافية و28 لقطة مع Reduced Motion. اختبارات الحجز تستخدم fetch وهميًا للحالتين success/error؛ لم يُرسل طلب حجز حقيقي، ولم تُجرَ مكالمة أو رسالة WhatsApp.

بقيت29 ملفًا محميًا مطابقة للنسخة الأولية: البيانات، أدوات الحجز وWhatsApp والتحليلات، SEO، routing، hooks، App وBookingForm. لم يتغير sitemap أو package manifest/lock. Canonical/OG وJSON-LD وPerson/FAQ schema محفوظة؛ صفحة Booking تظل noindex دون hreflang أو JSON-LD كما كانت أصلًا.

أدلة الاختبار: `/tmp/kadina-dark/matrix.json`, `functional.json`, `extra.json`, `visual.json`, `contrast.json`, `protected.json`, `lint.log`, `build.log`, `diff-check.log`. التعديلات الخاصة بهذه الجولة مفصولة عن التعديلات السابقة في `changed-files.txt`، والنسخة الأولية في `/tmp/kadina-dark/baseline`.

FINAL_STATUS
