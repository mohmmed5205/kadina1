import { articles } from "./articles.js";
import { deviceDetails } from "./devices.js";
import { doctorDetails } from "./doctors.js";
import { procedures } from "./procedures.js";
import { servicePages } from "./services.js";
import { solutionDetails } from "./solutions.js";

const linkSlug = (value) => value?.to?.split("/").filter(Boolean).at(-1) || null;
const linkSlugs = (items = []) => items.map(linkSlug).filter(Boolean);

function reviewAvailable(item) {
  const review = item.medicalReviewBy;
  return Boolean(review?.doctorSlug && review?.lastReviewedDate);
}

function inventoryItem({
  item,
  type,
  englishCoverage,
  relatedService = null,
  relatedDoctors = [],
  relatedDevices = [],
  relatedSolutions = [],
}) {
  return {
    slug: item.slug,
    type,
    language: englishCoverage === "COMPLETE" ? ["ar", "en"] : ["ar"],
    englishCoverage,
    status: item.status || "published",
    publishingControl: item.status ? "explicit" : "implicit-route",
    medicalDepth:
      type === "doctor"
        ? "profile"
        : type === "article" && item.sections?.length === 0
          ? "empty"
          : type === "service"
            ? "summary"
            : "substantive",
    doctorReviewAvailability: reviewAvailable(item),
    localIntent: /الرياض|riyadh/i.test(
      [item.seoTitle, item.metaDescription, item.targetKeyword]
        .filter(Boolean)
        .join(" "),
    ),
    relatedService,
    relatedDoctors,
    relatedDevices,
    relatedSolutions,
  };
}

export function buildContentInventory() {
  return [
    ...servicePages.map((item) =>
      inventoryItem({
        item,
        type: "service",
        englishCoverage: "COMPLETE",
        relatedDevices: linkSlugs(item.relatedDevices),
      }),
    ),
    ...procedures.map((item) =>
      inventoryItem({
        item,
        type: "procedure",
        englishCoverage: item.translations?.en ? "COMPLETE" : "MISSING",
        relatedService: item.serviceSlug,
        relatedDoctors: item.doctorSlugs,
        relatedDevices: item.deviceSlugs,
        relatedSolutions: item.solutionSlugs,
      }),
    ),
    ...solutionDetails.map((item) =>
      inventoryItem({
        item,
        type: "solution",
        englishCoverage: "COMPLETE",
        relatedService: linkSlug(item.relatedServices?.[0]),
        relatedDoctors: item.relatedDoctor ? [linkSlug(item.relatedDoctor)] : [],
        relatedDevices: linkSlugs(item.relatedDevices),
      }),
    ),
    ...deviceDetails.map((item) =>
      inventoryItem({
        item,
        type: "device",
        englishCoverage: "COMPLETE",
        relatedService: linkSlug(item.relatedService),
        relatedDoctors: linkSlugs(item.relatedDoctors),
        relatedDevices: item.relatedDevices,
        relatedSolutions: linkSlugs(item.relatedSolutions),
      }),
    ),
    ...doctorDetails.map((item) =>
      inventoryItem({
        item,
        type: "doctor",
        englishCoverage: "COMPLETE",
        relatedService: linkSlug(item.services?.[0]),
        relatedDevices: linkSlugs(item.devices),
        relatedSolutions: linkSlugs(item.solutions),
      }),
    ),
    ...articles.map((item) =>
      inventoryItem({
        item,
        type: "article",
        englishCoverage: item.translations?.en ? "COMPLETE" : "MISSING",
        relatedService: linkSlug(item.relatedService),
        relatedDoctors: item.relatedDoctor ? [linkSlug(item.relatedDoctor)] : [],
        relatedDevices: item.relatedDevice ? [linkSlug(item.relatedDevice)] : [],
        relatedSolutions: item.relatedSolution ? [linkSlug(item.relatedSolution)] : [],
      }),
    ),
  ];
}

export const claimReviewPatterns = [
  "الأفضل",
  "الأقوى",
  "المعيار الذهبي",
  "رقم واحد",
  "الأول عالمي",
  "أشهر",
  "مضمون",
  "نهائي",
  "100%",
  "بلا منافس",
  "لا يقبل المنافسة",
  "فوري",
  "آمن",
  "بدون تعاف",
  "دون تعاف",
  "دون فترة تعاف",
  "بدون فترة تعاف",
  "فترة نقاهة",
  "الطراز الأول",
  "الأمثل",
  "نتائج",
  "أسرع",
  "عالية التركيز",
];

const claimSources = [
  ["src/data/services.js", servicePages],
  ["src/data/procedures.js", procedures],
  ["src/data/solutions.js", solutionDetails],
  ["src/data/devices.js", deviceDetails],
  ["src/data/articles.js", articles],
];

function scanValue(value, file, field, matches) {
  if (typeof value === "string") {
    const terms = claimReviewPatterns.filter((term) => value.includes(term));
    if (terms.length) {
      matches.push({
        file,
        field,
        text: value,
        reason: `Claim language requires evidence or medical approval: ${terms.join(", ")}`,
      });
    }
    return;
  }
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([key, child]) => {
    scanValue(child, file, field ? `${field}.${key}` : key, matches);
  });
}

export function buildClaimsAudit() {
  const matches = [];
  claimSources.forEach(([file, items]) => {
    items.forEach((item) => scanValue(item, file, item.slug, matches));
  });
  return matches;
}
