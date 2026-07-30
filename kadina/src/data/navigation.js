export const primaryNavigation = [
  { id: "home", to: "/", ar: "الرئيسية", en: "Home" },

  { id: "about", to: "/about", ar: "من نحن", en: "About" },

  { id: "services", to: "/services", ar: "خدماتنا", en: "Services" },
{
    id: "technology",
    to: "/technology",
    ar: "التقنيات والأجهزة",
    en: "Technology",
  },

  { id: "solutions", to: "/solutions", ar: "الحلول", en: "Solutions" },

  
  { id: "doctors", to: "/doctors", ar: "أطباؤنا", en: "Doctors" },

  { id: "faq", to: "/faq", ar: "الأسئلة الشائعة", en: "FAQ" },

  // { id: "blog", to: "/blog", ar: "المدونة", en: "Blog" },

  { id: "contact", to: "/contact", ar: "تواصل معنا", en: "Contact" },

];

export function getPrimaryNavigation(lang) {
  const labelKey = lang === "en" ? "en" : "ar";

  return primaryNavigation.map((item) => ({
    id: item.id,
    to: item.to,
    title: item[labelKey],
  }));
}
