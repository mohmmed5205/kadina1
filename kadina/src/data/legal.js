export const LEGAL_CONTENT_STATUS = {
  DRAFT: "draft",
  ADMIN_REVIEW: "admin-review",
  APPROVED: "approved",
  PUBLISHED: "published",
};

const sharedReviewNotice = {
  ar: "هذا الهيكل قيد المراجعة الإدارية، ولا يمثل نصًا قانونيًا نهائيًا أو معتمدًا.",
  en: "This structure is under administrative review and is not a final or approved legal text.",
};

export const legalPages = {
  privacy: {
    slug: "privacy",
    status: LEGAL_CONTENT_STATUS.ADMIN_REVIEW,
    indexable: false,
    lastUpdated: null,
    content: {
      ar: {
        title: "سياسة الخصوصية",
        eyebrow: "الشفافية والبيانات",
        description:
          "هيكل مخصص لتنظيم موضوعات الخصوصية قبل اعتماد السياسة الرسمية لمركز كادينا.",
        reviewNotice: sharedReviewNotice.ar,
        sections: [
          {
            heading: "مقدمة السياسة",
            body: "تحتاج الإدارة إلى اعتماد نطاق السياسة والجهة المسؤولة عنها قبل إضافة النص النهائي.",
          },
          {
            heading: "البيانات التي قد يجمعها الموقع",
            body: "يجب حصر حقول الموقع الحالية والمستقبلية واعتماد وصفها قبل نشر تفاصيل الجمع.",
          },
          {
            heading: "الغرض من جمع البيانات",
            body: "تحتاج أغراض الاستخدام والاحتفاظ والتواصل إلى تحديد واعتماد إداري.",
          },
          {
            heading: "ملفات الارتباط وأدوات القياس",
            body: "يُستكمل هذا القسم بعد حصر الأدوات الفعلية التي سيستخدمها الموقع واعتماد الإفصاح عنها.",
          },
          {
            heading: "مشاركة البيانات وحمايتها",
            body: "تحتاج الجهات ذات العلاقة وإجراءات الحماية وفترات الاحتفاظ إلى توثيق رسمي قبل النشر.",
          },
          {
            heading: "حقوق المستخدم والتواصل بخصوص الخصوصية",
            body: "تحتاج آلية الطلبات وقناة التواصل المسؤولة إلى اعتماد الإدارة.",
          },
        ],
      },
      en: {
        title: "Privacy Policy",
        eyebrow: "Transparency and Data",
        description:
          "A structure for organizing privacy topics before Kadina's official policy is approved.",
        reviewNotice: sharedReviewNotice.en,
        sections: [
          {
            heading: "Policy Introduction",
            body: "Management must approve the policy scope and responsible entity before final text is added.",
          },
          {
            heading: "Data the Website May Collect",
            body: "Current and future website fields must be inventoried and their descriptions approved before collection details are published.",
          },
          {
            heading: "Purposes of Data Collection",
            body: "Purposes for use, retention and communication require administrative definition and approval.",
          },
          {
            heading: "Cookies and Measurement Tools",
            body: "This section will be completed after the website's actual tools are inventoried and their disclosure is approved.",
          },
          {
            heading: "Data Sharing and Protection",
            body: "Relevant parties, protection measures and retention periods require formal documentation before publication.",
          },
          {
            heading: "User Rights and Privacy Contact",
            body: "The request process and responsible contact channel require management approval.",
          },
        ],
      },
    },
  },
  terms: {
    slug: "terms",
    status: LEGAL_CONTENT_STATUS.ADMIN_REVIEW,
    indexable: false,
    lastUpdated: null,
    content: {
      ar: {
        title: "الشروط والأحكام",
        eyebrow: "استخدام الموقع",
        description:
          "هيكل مخصص لتنظيم موضوعات استخدام الموقع قبل اعتماد الشروط الرسمية لمركز كادينا.",
        reviewNotice: sharedReviewNotice.ar,
        sections: [
          {
            heading: "استخدام الموقع",
            body: "يجب أن تعتمد الإدارة النطاق المسموح لاستخدام الموقع قبل إضافة الشروط النهائية.",
          },
          {
            heading: "المعلومات الطبية",
            body: "تحتاج صياغة حدود المعلومات الطبية وعلاقتها بالاستشارة إلى مراجعة واعتماد مختص.",
          },
          {
            heading: "التواصل وطلبات الحجز",
            body: "تحتاج آلية الطلب والتأكيد والإلغاء إلى توثيق واعتماد قبل نشر أي التزام.",
          },
          {
            heading: "مسؤولية المستخدم ومحتوى الموقع",
            body: "تحتاج المسؤوليات وحقوق المحتوى وحدود الاستخدام إلى صياغة قانونية معتمدة.",
          },
          {
            heading: "الروابط الخارجية",
            body: "تحتاج سياسة التعامل مع المواقع والخدمات الخارجية إلى اعتماد الإدارة.",
          },
          {
            heading: "التعديلات والتواصل",
            body: "تحتاج آلية تحديث الشروط وقناة التواصل المعتمدة إلى تحديد رسمي.",
          },
        ],
      },
      en: {
        title: "Terms and Conditions",
        eyebrow: "Website Use",
        description:
          "A structure for organizing website-use topics before Kadina's official terms are approved.",
        reviewNotice: sharedReviewNotice.en,
        sections: [
          {
            heading: "Website Use",
            body: "Management must approve the permitted scope of website use before final terms are added.",
          },
          {
            heading: "Medical Information",
            body: "Wording about the limits of medical information and its relationship to consultation requires specialist review and approval.",
          },
          {
            heading: "Communication and Appointment Requests",
            body: "Request, confirmation and cancellation processes require documentation and approval before any commitment is published.",
          },
          {
            heading: "User Responsibility and Website Content",
            body: "Responsibilities, content rights and permitted-use boundaries require approved legal wording.",
          },
          {
            heading: "External Links",
            body: "The policy for external websites and services requires management approval.",
          },
          {
            heading: "Changes and Contact",
            body: "The process for updating terms and the approved contact channel require formal definition.",
          },
        ],
      },
    },
  },
};

export function getLegalPage(type, lang = "ar") {
  const page = legalPages[type];
  const localizedContent = page?.content?.[lang];
  return page && localizedContent ? { ...page, ...localizedContent } : null;
}
