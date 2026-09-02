export const DATA_STATUS = {
  OBSERVED_CONSISTENT: "observed-consistent",
  PENDING_ADMIN_CONFIRMATION: "pending-admin-confirmation",
};

export const businessContact = {
  phone: {
    local: "0114555444",
    internationalDisplay: "+966 11 455 5444",
    status: DATA_STATUS.OBSERVED_CONSISTENT,
  },
  whatsapp: {
    number: "966114555444",
    status: DATA_STATUS.OBSERVED_CONSISTENT,
  },
  email: {
    value: "info@kadina.sa",
    status: DATA_STATUS.OBSERVED_CONSISTENT,
  },
};

export const businessAddress = {
  status: DATA_STATUS.PENDING_ADMIN_CONFIRMATION,
  officialValue: null,
  activeDisplayCandidate: {
    ar: "الرياض — الحي المروج - مخرج 5",
    en: "Riyadh — Al-Murooj - Exit 5",
  },
  candidates: [
    {
      ar: "الرياض — الحي المروج - مخرج 5",
      en: "Riyadh — Al-Murooj - Exit 5",
      sourceGroup: "contact-data",
    },
    {
      ar: "المملكة العربية السعودية - الرياض - الطريق الدائري الشمالي",
      en: "Saudi Arabia - Riyadh - Northern Ring Road",
      sourceGroup: "site-content-and-faq",
    },
  ],
};

export const businessHours = {
  status: DATA_STATUS.PENDING_ADMIN_CONFIRMATION,
  officialValue: null,
  activeDisplayCandidate: {
    ar: { days: "السبت – الخميس", time: "9:00 ص – 10:00 م" },
    en: { days: "Saturday – Thursday", time: "9:00 AM – 10:00 PM" },
  },
  candidates: [
    {
      days: "Saturday–Thursday",
      time: "09:00–22:00",
      sourceGroup: "contact-data",
    },
    {
      days: "Saturday–Thursday",
      time: "10:00–22:00",
      sourceGroup: "site-content",
    },
    {
      days: "Monday–Friday",
      time: "09:00–22:00",
      sourceGroup: "faq-and-pages-content",
    },
  ],
};

export const businessMaps = {
  status: DATA_STATUS.PENDING_ADMIN_CONFIRMATION,
  officialValue: null,
  activeDisplayCandidate:
    "https://maps.app.goo.gl/cLeVtBdTjNd71GrPA?g_st=ic",
  candidates: [
    {
      url: "https://maps.app.goo.gl/cLeVtBdTjNd71GrPA?g_st=ic",
      sourceGroup: "contact-data",
    },
    {
      url: "https://maps.app.goo.gl/5RMSXMden4ex7MTD7?g_st=com.google.maps.preview.copy",
      sourceGroup: "site-content",
    },
  ],
  embedCandidate:
    "https://www.google.com/maps?q=Kadina%20Medical%20Center%20Riyadh&output=embed",
};

export const businessSocialLinks = [
  {
    key: "snapchat",
    url: "https://www.snapchat.com/add/kadina_center",
  },
  {
    key: "instagram",
    url: "https://www.instagram.com/kadina_center",
  },
  {
    key: "tiktok",
    url: "https://www.tiktok.com/@kadina_center",
  },
];

export const businessHistoryClaims = {
  foundingYear: {
    value: 2013,
    officialValue: null,
    status: DATA_STATUS.PENDING_ADMIN_CONFIRMATION,
  },
  generalExperience: {
    value: "15+",
    subject: null,
    officialValue: null,
    status: DATA_STATUS.PENDING_ADMIN_CONFIRMATION,
  },
};
