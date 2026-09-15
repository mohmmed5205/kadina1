# Final Booking Phase — Formspree Setup and QA

التاريخ: 2026-09-02
الفرع: `premium-visual-redesign`
الحالة: **التنفيذ البرمجي والاختبار الحقيقي مكتملان**.

## القرار التقني

لم يكشف Backend audit عن API أو server أو serverless functions أو Supabase أو Firebase أو Formspree أو Web3Forms أو EmailJS أو Resend أو webhook/CRM قائم. التكامل المختار هو **Formspree** لأنه يعمل مع مواقع Vite الثابتة وHostinger عبر HTTPS ولا يتطلب Gmail SMTP أو password أو secret داخل browser.

التكامل يستخدم endpoint الرسمي:

```text
https://formspree.io/f/mzebrazz
```

يحتوي تكامل الحجز وحده على Form ID العام:

```text
mzebrazz
```

هذا ID معرّف عام وليس credential سريًا. لا يوجد Gmail password أو App Password أو API secret في frontend أو documentation. إدارة recipient والتحقق منه وتغييره تتم من Formspree Dashboard فقط، ولا يُكرّر عنوانه داخل React.

## تغيير البريد لاحقًا

غيّر recipient من إعدادات Formspree Form في Dashboard من البريد المؤقت إلى البريد الرسمي للمركز، ثم أكمل تحقق البريد الجديد. لا يحتاج هذا إلى تعديل React أو إعادة build ما دام Form ID نفسه مستمرًا.

## Form fields and payload

الحقول المرئية:

- `name` — مطلوب، حقل واحد، `autocomplete="name"`.
- `phone` — مطلوب، `type="tel"` و`autocomplete="tel"` و`dir="ltr"`.
- `service` — مطلوب، slug من `services.js`.
- `doctor` — اختياري، slug من `doctors.js`.
- `notes` — اختياري، 500 حرف كحد أقصى.

Provider metadata:

- `language` — `AR` أو `EN`.
- `current_path` — المسار وquery الحاليان.
- `subject` — `Kadina Booking Request — طلب حجز جديد`.
- `_gotcha` — honeypot فارغ للمستخدم الطبيعي.

لا يجمع النموذج تشخيصًا أو أمراضًا أو أدوية أو تاريخًا طبيًا أو صورًا أو هوية أو تاريخ ميلاد أو تأمينًا أو ملفات. لا يستخدم `dangerouslySetInnerHTML`، ولا يحفظ البيانات في localStorage/sessionStorage، ولا يطبعها في console.

## Validation and UX

- صيغ الهاتف المدعومة: `05xxxxxxxx` و`+9665xxxxxxxx` و`9665xxxxxxxx`، إضافة إلى `00966` والفواصل البسيطة والأرقام العربية.
- يطبّع الهاتف عند submit إلى `+9665xxxxxxxx` دون تغيير النص أثناء الكتابة.
- يمنع double submit بواسطة ref متزامن وdisabled loading state.
- لا تظهر success إلا بعد `response.ok` حقيقي.
- عند الخطأ تبقى البيانات ويظهر WhatsApp كمسار مستقل.
- query prefill يدعم `service` و`doctor`، ويتجاهل slug غير الصالح بأمان ويحفظ query عند تغيير اللغة.
- الأطباء يفلترون فقط بالعلاقات الصريحة في `doctor.services`. إذا كان الطبيب المحدد صالحًا لكنه خارج نتائج الخدمة، تعرض القائمة كاملة بدل استنتاج ملاءمة طبية.
- لم يُضف Navbar CTA لأن الشريط الحالي يحتوي navigation واللغة وWhatsApp وسيصبح مزدحمًا. لم تتغير Home أو Doctor/Service CTAs.

## Analytics

`booking_start`:

- أول focus/change حقيقي في أحد حقول النموذج فقط.
- مرة واحدة لكل mount.
- payload: `language`, `path`, `source_section: booking_form`.

`booking_submit`:

- بعد Formspree `response.ok` فقط.
- payload: `language`, `path`, `service_slug`, و`doctor_slug` عند وجوده، و`submission_method: email_form`.

لا تُرسل name أو phone أو notes أو Formspree payload أو WhatsApp message إلى dataLayer.

## Privacy and legal follow-up

Privacy وTerms ما زالتا `admin-review` و`noindex`. لم تُعدّل legal copy ولم يُضف consent checkbox بصياغة مخترعة.

**BOOKING CONSENT TEXT REQUIRES ADMIN APPROVAL**

**PRIVACY POLICY MUST BE UPDATED BEFORE PRODUCTION**

يجب أن توضح السياسة قبل Production: Formspree كمزود، الاسم والهاتف والخدمة والطبيب/الملاحظة الاختياريين، غرض متابعة طلب الموعد، جهة الاستقبال، مدة الاحتفاظ المعتمدة، والمعالجة لدى المزود الخارجي.

**LEGAL BOOKING WORDING REQUIRES ADMIN APPROVAL**

يجب اعتماد صياغة قانونية توضح أن إرسال طلب الموعد لا يعني تأكيد الموعد.

## Final QA result

- AR/EN booking route: PASS.
- noindex/nofollow، canonical، وغياب hreflang: PASS.
- 390×844 RTL/LTR، 16px inputs، 48px+ controls، ولا overflow: PASS.
- empty/invalid phone/missing service/focus first invalid: PASS.
- valid/invalid query prefill واللغة: PASS.
- `booking_start` بنقرتين فعليتين: حدث واحد، بلا PII.
- provider/network error handling بعقدة fetch محلية محقونة: PASS.
- Success payload serialization: PASS.
- اختبار Formspree الحقيقي: طلب POST واحد، HTTP 200، وظهرت success بعد `response.ok` فقط.
- `booking_start`: مرة واحدة. `booking_submit`: مرة واحدة بعد نجاح Formspree.
- Form reset بعد النجاح: PASS.
- Regression لعدد 12 صفحة AR/EN: PASS.
- Console errors: 0. Runtime exceptions: 0.

**FORM SUBMISSION API SUCCESS CONFIRMED: YES**

**EMAIL RECEIVED: CONFIRMED BY ADMIN**
