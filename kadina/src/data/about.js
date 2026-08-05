export const aboutContent = {
  intro: "من نحن، ولماذا نستحق أن نلمس وجهك.",
  story:
    "في عام 2013، وفي قلب الرياض، انطلق مركز كادينا بسؤال واحد: لماذا يضطر الباحث عن الجمال إلى التنقل بين عيادة للجلدية وأخرى للجراحة وثالثة لليزر؟ فكان الجواب: مركز واحد يجمع نخبة الاستشاريين وأحدث الأجهزة العالمية، ويعامل كل حالة كأنها الوحيدة.",
  vision:
    "أن تكون كادينا المرجع الأول للجلدية والتجميل في المملكة، بترسيخ ثابت أنها المكان الذي يُقصد حين لا تحتمل النتيجة المجازفة.",
  mission:
    "نمنح من يأتمننا على جماله رعاية استشارية متخصصة تبدأ بتشخيص صادق، وتُنفذ بأيدي استشاريين وأحدث تقنيات العالم، وتُتابع خطوة بخطوة حتى تحقيق نتيجة طبيعية يفخر بها.",
};

export const aboutValues = [
  {
    title: "الأمان قبل الجمال",
    description:
      "لا يوجد إجراء «بسيط» في قاموسنا، كل ما يلمس جسد الإنسان يستحق أقصى درجات الاحتراز.",
  },
  {
    title: "الصراحة قبل الصفقة",
    description: "التشخيص عندنا حكم طبي لا عرض بيع.",
  },
  {
    title: "الطبيعي هو المعيار",
    description: "نجاحنا يُقاس بسؤال واحد: هل تبدو النتيجة وكأنها منك؟",
  },
  {
    title: "التقنية استثمار لا ديكور",
    description:
      "لا نقتني الجهاز ليُصوّر، بل ليصنع فرقًا يلمسه العميل.",
  },
];

export const aboutMetrics = [
  { value: "15+", label: "عامًا خبرة طبية" },
  { value: "22", label: "قسمًا صحيًا" },
  { value: "146", label: "خدمة" },
  { value: "9", label: "استشاريين" },
  { value: "13+", label: "جهازًا عالميًا" },
];

const aboutContentEn = {
  intro: "Who we are, and why we deserve your trust.",
  story: "In 2013, in the heart of Riyadh, Kadina Center began with one question: why should someone seeking aesthetic care move between a dermatology clinic, a surgery clinic, and a laser clinic? The answer was one center bringing together leading consultants and world-class technology, while treating every case as unique.",
  vision: "For Kadina to be the Kingdom's leading reference for dermatology and aesthetics—the destination chosen when the result cannot be left to chance.",
  mission: "We give those who trust us with their appearance specialist consultant care that begins with an honest diagnosis, is delivered by consultants using leading global technologies, and is followed step by step toward a natural result they can be proud of.",
};

const aboutValuesEn = [
  { title: "Safety before beauty", description: "There is no such thing as a 'simple' procedure in our practice. Anything that touches the human body deserves the highest level of care." },
  { title: "Honesty before a sale", description: "Our diagnosis is a medical judgment, not a sales pitch." },
  { title: "Natural is the standard", description: "We measure success with one question: does the result look naturally yours?" },
  { title: "Technology is an investment", description: "We do not acquire a device for display, but for the difference it can make to the client." },
];

const aboutMetricsEn = [
  { value: "15+", label: "Years of medical experience" },
  { value: "22", label: "Healthcare departments" },
  { value: "146", label: "Services" },
  { value: "9", label: "Consultants" },
  { value: "13+", label: "World-class devices" },
];

export function getAboutData(lang) {
  return lang === "en"
    ? { content: aboutContentEn, values: aboutValuesEn, metrics: aboutMetricsEn }
    : { content: aboutContent, values: aboutValues, metrics: aboutMetrics };
}
