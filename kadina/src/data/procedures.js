export const procedures = [
  {
    slug: "laser-hair-removal",
    status: "published",
    contentReadiness: "ready",
    serviceSlug: "laser",
    title: "إزالة الشعر بالليزر",
    seoTitle: "إزالة الشعر بالليزر في الرياض — مركز كادينا",
    metaDescription:
      "لا نملك جهاز ليزر واحدًا، بل ثلاثة من الطراز الأول: GentleMax Pro وGentleMax Pro Plus وClarity. لكل نوع بشرة وشعر جهازه وإعداده الأمثل.",
    headline: "إزالة الشعر بالليزر",
    intro:
      "لا نملك جهاز ليزر واحدًا — بل ثلاثة من الطراز الأول: GentleMax Pro وGentleMax Pro Plus من Candela الأمريكية، وClarity من Lutronic. لكل نوع بشرة وشعر جهازه وإعداده الأمثل، بأنظمة تبريد تجعل الجلسة أسرع وأكثر راحة.",
    whatIsIt: null,
    whoIsItFor: [
      "جميع أنواع البشرة، ويحدد الطبيب الموجة والإعداد الأمثل في جلسة التقييم.",
      "من تفضل جلسة مريحة تغطي أكثر من منطقة.",
    ],
    howItWorks: [
      "لكل نوع بشرة وشعر جهازه وإعداده الأمثل، مع جلسة تقييم للبشرة.",
    ],
    expectedResults:
      "نتائج تدريجية بعد الجلسات، بأنظمة تبريد تجعل الجلسة أسرع وأكثر راحة.",
    alternatives: [],
    doctorSlugs: ["eman-almukhadab"],
    deviceSlugs: ["gentlemax-pro", "gentlemax-pro-plus", "clarity"],
    solutionSlugs: ["unwanted-hair"],
    faq: [
      {
        question: "كم جهاز ليزر لإزالة الشعر لدى كادينا؟",
        answer:
          "ثلاثة أجهزة من الطراز الأول: GentleMax Pro وGentleMax Pro Plus وClarity.",
      },
      {
        question: "كيف يُختار الجهاز والإعداد؟",
        answer:
          "لكل نوع بشرة وشعر جهازه وإعداده الأمثل، مع جلسة تقييم للبشرة.",
      },
    ],
    medicalReviewBy: null,
    lastReviewedDate: null,
    whatsappMessage:
      "مرحبًا، أرغب في حجز تقييم لإزالة الشعر بالليزر في مركز كادينا.",
    ctaLabel: "احجزي جلسة تقييم الليزر عبر واتساب",
    translations: {
      en: {
        title: "Laser Hair Removal",
        seoTitle: "Laser Hair Removal in Riyadh — Kadina Center",
        metaDescription:
          "Kadina uses three leading laser systems: GentleMax Pro, GentleMax Pro Plus and Clarity. The device and settings are selected for each skin and hair type.",
        headline: "Laser Hair Removal",
        intro:
          "We do not have just one laser device, but three leading systems: GentleMax Pro and GentleMax Pro Plus by Candela in the United States, and Clarity by Lutronic. Each skin and hair type has an optimal device and setting, with cooling systems that make sessions faster and more comfortable.",
        whoIsItFor: [
          "All skin types; the doctor selects the optimal wavelength and settings during assessment.",
          "Those who prefer a comfortable session covering more than one area.",
        ],
        howItWorks: [
          "The optimal device and settings are selected for each skin and hair type after a skin assessment.",
        ],
        expectedResults:
          "Progressive results over a course of sessions, with cooling systems for faster, more comfortable treatment.",
        faq: [
          {
            question: "How many laser hair removal devices does Kadina have?",
            answer:
              "Three leading devices: GentleMax Pro, GentleMax Pro Plus and Clarity.",
          },
          {
            question: "How are the device and settings selected?",
            answer:
              "The optimal device and settings are selected for each skin and hair type after a skin assessment.",
          },
        ],
        whatsappMessage:
          "Hello, I would like to book a laser hair-removal assessment at Kadina Center.",
        ctaLabel: "Book a Laser Assessment on WhatsApp",
      },
    },
  },
  {
    slug: "hair-transplant-riyadh",
    status: "draft",
    contentReadiness: "partial",
    serviceSlug: "hair",
    title: "زراعة الشعر",
    doctorSlugs: ["waleed-alghamdi"],
    deviceSlugs: [],
    solutionSlugs: ["hair-loss"],
  },
  {
    slug: "lip-filler",
    status: "draft",
    contentReadiness: "not-enough-content",
    serviceSlug: "injectables",
    title: "فيلر الشفايف",
    doctorSlugs: ["hosam-alghamdi"],
    deviceSlugs: [],
    solutionSlugs: [],
  },
  {
    slug: "botox-face",
    status: "draft",
    contentReadiness: "not-enough-content",
    serviceSlug: "injectables",
    title: "بوتوكس الوجه",
    doctorSlugs: [],
    deviceSlugs: [],
    solutionSlugs: ["skin-aging"],
  },
  {
    slug: "eyelid-lift",
    status: "draft",
    contentReadiness: "partial",
    serviceSlug: "plastic-surgery",
    title: "شد الجفون",
    doctorSlugs: ["ali-alqadi"],
    deviceSlugs: [],
    solutionSlugs: [],
  },
  {
    slug: "body-contouring",
    status: "draft",
    contentReadiness: "partial",
    serviceSlug: "plastic-surgery",
    title: "نحت القوام",
    doctorSlugs: ["abdulaziz-almudaimegh"],
    deviceSlugs: ["exilis-elite"],
    solutionSlugs: ["body-contouring"],
  },
];

export const proceduresBySlug = Object.fromEntries(
  procedures.map((procedure) => [procedure.slug, procedure]),
);

export function getProcedure(slug, lang = "ar") {
  const procedure = proceduresBySlug[slug];
  if (!procedure || procedure.status !== "published") return null;
  if (lang !== "en") return procedure;

  const translation = procedure.translations?.en;
  return translation ? { ...procedure, ...translation } : null;
}

export function getPublishedProceduresByService(serviceSlug, lang = "ar") {
  return procedures
    .filter(
      (procedure) =>
        procedure.status === "published" &&
        procedure.serviceSlug === serviceSlug &&
        (lang !== "en" || procedure.translations?.en),
    )
    .map((procedure) => getProcedure(procedure.slug, lang));
}

export function getPublishedProceduresByRelation({
  deviceSlug,
  doctorSlug,
  solutionSlug,
  lang = "ar",
} = {}) {
  return procedures
    .filter((procedure) => {
      if (procedure.status !== "published") return false;
      if (lang === "en" && !procedure.translations?.en) return false;
      if (deviceSlug && !procedure.deviceSlugs.includes(deviceSlug)) return false;
      if (doctorSlug && !procedure.doctorSlugs.includes(doctorSlug)) return false;
      if (solutionSlug && !procedure.solutionSlugs.includes(solutionSlug)) {
        return false;
      }
      return true;
    })
    .map((procedure) => getProcedure(procedure.slug, lang));
}
