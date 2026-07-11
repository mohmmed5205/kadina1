import { devices } from "./devices";
import { doctors } from "./doctors";

const deviceIndexesByService = {
  dermatology: [3, 4, 6, 7, 8, 11],
  laser: [0, 1, 2, 6, 7],
  aesthetics: [3, 4, 8, 10, 11, 6],
  hair: [5, 9],
};

const doctorIndexesByService = {
  dermatology: [3, 4, 5, 6, 7],
  laser: [3, 4, 5, 7],
  aesthetics: [0, 1, 2, 3, 5, 6],
  hair: [3, 5, 7],
};

const serviceCopy = {
  ar: {
    dermatology: {
      title: "الجلدية",
      description: "تشخيص وعلاج مشاكل البشرة والجلد بخطط دقيقة وتقنيات آمنة.",
    },
    laser: {
      title: "الليزر",
      description: "جلسات ليزر وعناية متقدمة بتجربة مريحة ونتائج تدريجية.",
    },
    aesthetics: {
      title: "التجميل",
      description: "حقن تجميلية ونضارة البشرة بلمسة طبيعية ومتوازنة.",
    },
    hair: {
      title: "العناية بالشعر",
      description: "حلول للعناية بفروة الرأس وتساقط الشعر وتحسين الكثافة.",
    },
  },
  en: {
    dermatology: {
      title: "Dermatology",
      description: "Diagnosis and treatment for skin concerns with precise, safe plans.",
    },
    laser: {
      title: "Laser",
      description: "Laser sessions and advanced care with a comfortable experience and gradual results.",
    },
    aesthetics: {
      title: "Aesthetics",
      description: "Injectables and glow treatments with a natural, balanced touch.",
    },
    hair: {
      title: "Hair Care",
      description: "Scalp, hair loss, and density care solutions supported by focused technologies.",
    },
  },
};

function pickItems(items, indexes) {
  return indexes.map((index) => items[index]).filter(Boolean);
}

function buildServiceDetails(lang) {
  const deviceItems = devices[lang]?.items || devices.ar.items;
  const doctorItems = doctors[lang]?.items || doctors.ar.items;

  return Object.fromEntries(
    Object.entries(serviceCopy[lang]).map(([key, copy]) => [
      key,
      {
        ...copy,
        devices: pickItems(deviceItems, deviceIndexesByService[key]),
        doctors: pickItems(doctorItems, doctorIndexesByService[key]),
      },
    ]),
  );
}

export const serviceDetails = {
  ar: buildServiceDetails("ar"),
  en: buildServiceDetails("en"),
};
