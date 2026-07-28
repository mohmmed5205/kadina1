export const services = [
  { title: "الجلدية", to: "/services/dermatology" },
  { title: "الليزر", to: "/services/laser" },
  { title: "جراحة التجميل", to: "/services/plastic-surgery" },
  { title: "الشعر", to: "/services/hair" },
  { title: "الحقن التجميلية", to: "/services/injectables" },
];

export const technologyCategories = [
  {
    title: "إزالة الشعر بالليزر",
    devices: [
      { title: "GentleMax Pro", to: "/technology/gentlemax-pro" },
      { title: "GentleMax Pro Plus", to: "/technology/gentlemax-pro-plus" },
      { title: "Clarity", to: "/technology/clarity" },
    ],
  },
  {
    title: "تجديد البشرة وعلاج آثارها",
    devices: [
      { title: "Fractional CO2", to: "/technology/fractional-co2" },
      { title: "Spectra", to: "/technology/spectra" },
      { title: "Bi-one Lifetouch", to: "/technology/bi-one-lifetouch" },
    ],
  },
  {
    title: "العناية والنضارة",
    devices: [
      { title: "HydraFacial", to: "/technology/hydrafacial" },
      { title: "DermaFacial", to: "/technology/dermafacial" },
    ],
  },
  {
    title: "الشد والنحت غير الجراحي",
    devices: [
      { title: "Ultraformer III", to: "/technology/ultraformer-iii" },
      { title: "Matrix Pro", to: "/technology/matrix-pro" },
      { title: "Exilis Elite", to: "/technology/exilis-elite" },
    ],
  },
  {
    title: "علاج الشعر",
    devices: [
      { title: "Regenera Activa", to: "/technology/regenera-activa" },
      { title: "Magellan PRP", to: "/technology/magellan-prp" },
    ],
  },
];

export const solutions = [
  { title: "فرط التعرق", to: "/solutions/sweating", category: "الجسم" },
  { title: "تساقط الشعر", to: "/solutions/hair-loss", category: "الشعر" },
  { title: "آثار حب الشباب", to: "/solutions/acne-scars", category: "البشرة" },
  { title: "الشعر غير المرغوب فيه", to: "/solutions/unwanted-hair", category: "الجسم" },
  { title: "علامات تقدم البشرة في العمر", to: "/solutions/skin-aging", category: "الوجه" },
  { title: "التصبغات", to: "/solutions/pigmentation", category: "البشرة" },
  { title: "علامات التمدد", to: "/solutions/stretch-marks", category: "الجسم" },
  { title: "بهتان البشرة", to: "/solutions/dull-skin", category: "البشرة" },
  { title: "نحت القوام", to: "/solutions/body-contouring", category: "الجسم" },
  { title: "الهالات السوداء", to: "/solutions/dark-circles", category: "الوجه" },
];

export const doctors = [
  {
    name: "د. محمد الهداب",
    slug: "mohammed-alhaddab",
    specialty: "استشاري في أمراض الجلدية وجراحة الجلد والليزر والحقن التجميلي",
    experience: "20 سنة",
    areas: "الجلدية، الليزر، الحقن التجميلية",
  },
  {
    name: "د. حسام الغامدي",
    slug: "hosam-alghamdi",
    specialty: "استشاري الأمراض الجلدية وجراحة الجلد والليزر",
    experience: "15 سنة",
    areas: "الجلدية، الليزر",
  },
  {
    name: "د. نايف الشهراني",
    slug: "naif-alshahrani",
    specialty: "استشاري جلدية وحقن تجميلي وجراحة جلدية",
    experience: "10 سنوات",
    areas: "الحقن التجميلية، الجلدية",
  },
  {
    name: "د. علي القاضي",
    slug: "ali-alqadi",
    specialty: "استشاري جراحة تجميل الوجه والعيون",
    experience: "5 سنوات",
    areas: "جراحة تجميل الوجه والجفون",
  },
  {
    name: "د. عبدالمحسن اللزام",
    slug: "abdulmohsen-allazzam",
    specialty: "استشاري جراحة تجميل (Reconstructive & Plastic Surgery)",
    experience: "15 سنة",
    areas: "جراحة التجميل، الترميم",
  },
  {
    name: "د. عبدالعزيز المديميغ",
    slug: "abdulaziz-almudaimegh",
    specialty: "استشاري جراحة تجميل",
    experience: "10 سنوات",
    areas: "جراحة التجميل، نحت القوام",
  },
  {
    name: "د. وليد الغامدي",
    slug: "waleed-alghamdi",
    specialty: "استشاري زراعة شعر وجلدية وجراحة الجلد والليزر",
    experience: "20 سنة",
    areas: "خدمة الشعر، ريجينيرا، ماجلان",
  },
  {
    name: "د. إيمان المخضب",
    slug: "eman-almukhadab",
    specialty:
      "استشارية مختصة بالأمراض الجلدية والحقن التجميلي والعلاج بالليزر ومشاكل تساقط الشعر",
    experience: "15 سنة",
    areas: "الجلدية، الحقن، تساقط الشعر",
  },
  {
    name: "د. منيرة الصالح",
    slug: "munira-alsaleh",
    specialty: "استشارية الأمراض الجلدية وجراحة الجلد والليزر",
    experience: null,
    areas: "الجلدية، الليزر",
  },
];

export const faqs = [
  {
    question: "ما الفرق بين أجهزة الليزر الثلاثة لديكم؟ وأيها الأنسب لي؟",
    answer:
      "كل جهاز له نقاط قوته حسب نوع البشرة والشعر والمنطقة، ولهذا نبدأ بجلسة تقييم يحدد فيها الطبيب الجهاز والإعداد الأمثل لك، لا العكس.",
  },
  {
    question: "هل الهايفو بديل حقيقي لعمليات الشد؟",
    answer:
      "للترهل الخفيف والمتوسط، يقدم Ultraformer III نتيجة شد ورفع ملموسة دون جراحة. الحالات المتقدمة قد يكون خيارها الأمثل جراحيًا، ونخبرك بذلك بصراحة في الاستشارة.",
  },
  {
    question: "هل نتائج البوتوكس والفيلر تبدو مصطنعة؟",
    answer:
      "فلسفتنا «الجمال الطبيعي»: نتيجة يلاحظها الآخرون دون أن يعرفوا السبب.",
  },
  {
    question: "ما الفرق بين ريجينيرا والبلازما لعلاج التساقط؟",
    answer:
      "البلازما تغذي البصيلة وتقويها، بينما ريجينيرا تحفزها بخلايا دقيقة من فروة رأسك نفسها، وقد يجمع الطبيب بينهما في خطة واحدة حسب حالتك.",
  },
  {
    question: "ما مواعيد العمل وأين موقعكم؟",
    answer:
      "الرياض، الطريق الدائري الشمالي، من الاثنين إلى الجمعة، 9 صباحًا حتى 10 مساءً.",
  },
];

export const blogCategories = [
  "العناية بالبشرة",
  "الشعر",
  "الليزر",
  "الحقن التجميلية",
  "جراحة التجميل",
  "قبل الإجراء وبعده",
];

export const plannedArticles = [
  {
    category: "الحقن التجميلية",
    title: "بوتوكس التعرق: كل ما تحتاج معرفته قبل الصيف",
  },
  {
    category: "الليزر",
    title: "الفرق بين جنتل ماكس برو وكلاريتي: أيهما لبشرتك؟",
  },
  {
    category: "الشعر",
    title: "متى تكفي البلازما ومتى تحتاج زراعة الشعر؟",
  },
];
