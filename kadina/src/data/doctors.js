export const doctors = {
    ar: {
        eyebrow: "أطباؤنا",
        title: "نخبة من الأطباء السعوديين المتخصصين في مجال التجميل",
        description:
            "فريق طبي متخصص يجمع بين الخبرة، الدقة، واللمسة الجمالية الراقية.",
        items: [
            {
                name: "د. عبدالعزيز المديميغ",
                specialty: "استشاري جراحه تجميل",
                image: "/doctors/doctor-abdulazez.webp",
            },
            {
                name: "د. عبدالمحسن اللزام",
                specialty: "أستشاري جراحه و تجميل",
                image: "/doctors/doctor-abudalmohsen.webp",
            },
            {
                name: "د. علي القاضي",
                specialty: "استشاري جراحه تجميل الوجه و العيون",
                image: "/doctors/doctor-ali.webp",
            },
            {
                name: "د. إيمان المخضب",
                specialty: "استشاريه متختصه بامراض الجلديه و الحقن التجميلي و العلاج بليزر و مشاكل تساقط الشعر ",
                image: "/doctors/doctor-eman.webp",
            },
            {
                name: "د. حسام الغامدي",
                specialty: "أستشاري امراض جلدية و جراحة الجلد و الليزر",
                image: "/doctors/doctor-hosam.webp",
            },
            {
                name: "د. محمد الهداب",
                specialty: "استشاري في امراض الجلديه و جراحه الجلد و اليزر و الحقت التجميلي",
                image: "/doctors/doctor-mohmmed.webp",
            },
            {
                name: "د. نايف الشهراني",
                specialty: "استشاري جلدية و حقن تجميلي و جراحة جلدية",
                image: "/doctors/doctor-naife.webp",
            },
            {
                name: "د. وليد الغامدي",
                specialty: "استشاري زراعه شعر و جلديه و جراحه الجلد و اليزر",
                image: "/doctors/doctor-waled.webp",
            },
            {
                name: "د. منيرة الصالح",
                specialty: "استشارية جلدية وتجميل",
                image: "/kadina-logo.webp",
            },
        ],
    },

    en: {
        eyebrow: "Our Doctors",
        title: "A select group of Saudi doctors specializing in the field of aesthetic medicine.",
        description:
            "A specialized medical team combining experience, precision, and refined aesthetic care.",
        items: [
            {
                name: "Dr. Abdulaziz Al-Mudaimigh",
                specialty: "Plastic Surgery Consultant",
                image: "/doctors/doctor-abdulazez.webp",
            },
            {
                name: "Dr. Abdulmohsen Al-Lazzam",
                specialty: "Plastic Surgery and Aesthetics Consultant",
                image: "/doctors/doctor-abudalmohsen.webp",
            },
            {
                name: "Dr. Ali Al-Qadhi",
                specialty: "Facial and Oculoplastic Surgery Consultant",
                image: "/doctors/doctor-ali.webp",
            },
            {
                name: "Dr. Eman Al-Mukhadab",
                specialty:
                    "Dermatology Consultant specializing in skin diseases, aesthetic injections, laser treatments, and hair loss concerns",
                image: "/doctors/doctor-eman.webp",
            },
            {
                name: "Dr. Hosam Al-Ghamdi",
                specialty: "Dermatology, Skin Surgery, and Laser Consultant",
                image: "/doctors/doctor-hosam.webp",
            },
            {
                name: "Dr. Mohammed Al-Haddab",
                specialty:
                    "Dermatology Consultant specializing in skin surgery, laser treatments, and aesthetic injections",
                image: "/doctors/doctor-mohmmed.webp",
            },
            {
                name: "Dr. Naif Al-Shahrani",
                specialty:
                    "Dermatology Consultant specializing in aesthetic injections and skin surgery",
                image: "/doctors/doctor-naife.webp",
            },
            {
                name: "Dr. Waleed Al-Ghamdi",
                specialty:
                    "Hair Transplant, Dermatology, Skin Surgery, and Laser Consultant",
                image: "/doctors/doctor-waled.webp",
            },
            {
                name: "Dr. Munira Al-Saleh",
                specialty: "Dermatology and Aesthetics Consultant",
                image: "/kadina-logo.webp",
            },
        ],
    },
};

export const doctorDetails = [
    {
        slug: "mohammed-alhaddab",
        name: "د. محمد الهداب",
        title: "استشاري",
        specialty:
            "استشاري في أمراض الجلدية وجراحة الجلد والليزر والحقن التجميلي",
        shortBio: null,
        yearsOfExperience: 20,
        services: [
            { title: "الجلدية", to: "/services/dermatology" },
            { title: "الليزر", to: "/services/laser" },
            { title: "الحقن التجميلية", to: "/services/injectables" },
        ],
        devices: [],
        solutions: [],
        image: "/doctors/doctor-mohmmed.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. محمد الهداب.",
    },
    {
        slug: "hosam-alghamdi",
        name: "د. حسام الغامدي",
        title: "استشاري",
        specialty: "استشاري الأمراض الجلدية وجراحة الجلد والليزر",
        shortBio: null,
        yearsOfExperience: 15,
        services: [
            { title: "الجلدية", to: "/services/dermatology" },
            { title: "الليزر", to: "/services/laser" },
        ],
        devices: [],
        solutions: [],
        image: "/doctors/doctor-hosam.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. حسام الغامدي.",
    },
    {
        slug: "naif-alshahrani",
        name: "د. نايف الشهراني",
        title: "استشاري",
        specialty: "استشاري جلدية وحقن تجميلي وجراحة جلدية",
        shortBio: null,
        yearsOfExperience: 10,
        services: [
            { title: "الحقن التجميلية", to: "/services/injectables" },
            { title: "الجلدية", to: "/services/dermatology" },
        ],
        devices: [],
        solutions: [],
        image: "/doctors/doctor-naife.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. نايف الشهراني.",
    },
    {
        slug: "ali-alqadi",
        name: "د. علي القاضي",
        title: "استشاري",
        specialty: "استشاري جراحة تجميل الوجه والعيون",
        shortBio: null,
        yearsOfExperience: 5,
        services: [
            {
                title: "جراحة تجميل الوجه والجفون",
                to: "/services/plastic-surgery",
            },
        ],
        devices: [],
        solutions: [],
        image: "/doctors/doctor-ali.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. علي القاضي.",
    },
    {
        slug: "abdulmohsen-allazzam",
        name: "د. عبدالمحسن اللزام",
        title: "استشاري",
        specialty:
            "استشاري جراحة تجميل (Reconstructive & Plastic Surgery)",
        shortBio: null,
        yearsOfExperience: 15,
        services: [
            {
                title: "جراحة التجميل والترميم",
                to: "/services/plastic-surgery",
            },
        ],
        devices: [],
        solutions: [],
        image: "/doctors/doctor-abudalmohsen.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. عبدالمحسن اللزام.",
    },
    {
        slug: "abdulaziz-almudaimegh",
        name: "د. عبدالعزيز المديميغ",
        title: "استشاري",
        specialty: "استشاري جراحة تجميل",
        shortBio: null,
        yearsOfExperience: 10,
        services: [
            {
                title: "جراحة التجميل ونحت القوام",
                to: "/services/plastic-surgery",
            },
        ],
        devices: [],
        solutions: [
            {
                title: "نحت القوام",
                to: "/solutions/body-contouring",
            },
        ],
        image: "/doctors/doctor-abdulazez.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. عبدالعزيز المديميغ.",
    },
    {
        slug: "waleed-alghamdi",
        name: "د. وليد الغامدي",
        title: "استشاري",
        specialty: "استشاري زراعة شعر وجلدية وجراحة الجلد والليزر",
        shortBio: null,
        yearsOfExperience: 20,
        services: [{ title: "خدمة الشعر", to: "/services/hair" }],
        devices: [
            {
                title: "Regenera Activa",
                to: "/technology/regenera-activa",
            },
            { title: "Magellan PRP", to: "/technology/magellan-prp" },
        ],
        solutions: [],
        image: "/doctors/doctor-waled.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. وليد الغامدي.",
    },
    {
        slug: "eman-almukhadab",
        name: "د. إيمان المخضب",
        title: "استشارية",
        specialty:
            "استشارية مختصة بالأمراض الجلدية والحقن التجميلي والعلاج بالليزر ومشاكل تساقط الشعر",
        shortBio: null,
        yearsOfExperience: 15,
        services: [
            { title: "الجلدية", to: "/services/dermatology" },
            { title: "الحقن التجميلية", to: "/services/injectables" },
            { title: "خدمة الشعر", to: "/services/hair" },
        ],
        devices: [],
        solutions: [
            {
                title: "تساقط الشعر",
                to: "/solutions/hair-loss",
            },
        ],
        image: "/doctors/doctor-eman.webp",
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. إيمان المخضب.",
    },
    {
        slug: "munira-alsaleh",
        name: "د. منيرة الصالح",
        title: "استشارية",
        specialty: "استشارية الأمراض الجلدية وجراحة الجلد والليزر",
        shortBio: null,
        yearsOfExperience: null,
        services: [
            { title: "الجلدية", to: "/services/dermatology" },
            { title: "الليزر", to: "/services/laser" },
        ],
        devices: [],
        solutions: [],
        image: null,
        socialLinks: [],
        whatsappMessage:
            "مرحبًا، أرغب في حجز استشارة مع د. منيرة الصالح.",
    },
];

export const doctorDetailsBySlug = Object.fromEntries(
    doctorDetails.map((doctor) => [doctor.slug, doctor]),
);

const doctorTranslations = {
    "mohammed-alhaddab": ["Dr. Mohammed Al-Haddab", "Dermatology, Skin Surgery, Laser and Aesthetic Injections Consultant"],
    "hosam-alghamdi": ["Dr. Hosam Al-Ghamdi", "Dermatology, Skin Surgery and Laser Consultant"],
    "naif-alshahrani": ["Dr. Naif Al-Shahrani", "Dermatology, Aesthetic Injections and Skin Surgery Consultant"],
    "ali-alqadi": ["Dr. Ali Al-Qadhi", "Facial and Oculoplastic Surgery Consultant"],
    "abdulmohsen-allazzam": ["Dr. Abdulmohsen Al-Lazzam", "Plastic and Reconstructive Surgery Consultant"],
    "abdulaziz-almudaimegh": ["Dr. Abdulaziz Al-Mudaimigh", "Plastic Surgery Consultant"],
    "waleed-alghamdi": ["Dr. Waleed Al-Ghamdi", "Hair Transplant, Dermatology, Skin Surgery and Laser Consultant"],
    "eman-almukhadab": ["Dr. Eman Al-Mukhadab", "Dermatology, Aesthetic Injections, Laser and Hair Loss Consultant"],
    "munira-alsaleh": ["Dr. Munira Al-Saleh", "Dermatology, Skin Surgery and Laser Consultant"],
};

const doctorRelationTitles = {
    "الجلدية": "Dermatology", "الليزر": "Laser", "الحقن التجميلية": "Cosmetic Injectables", "جراحة تجميل الوجه والجفون": "Facial and Eyelid Plastic Surgery", "جراحة التجميل والترميم": "Plastic and Reconstructive Surgery", "جراحة التجميل ونحت القوام": "Plastic Surgery and Body Contouring", "خدمة الشعر": "Hair", "نحت القوام": "Body Contouring", "تساقط الشعر": "Hair Loss",
};

export function getDoctorDetail(slug, lang = "ar") {
    const doctor = doctorDetailsBySlug[slug];
    if (!doctor || lang !== "en") return doctor;
    const [name, specialty] = doctorTranslations[slug];
    const localizeItems = (items) => items.map((item) => ({ ...item, title: doctorRelationTitles[item.title] || item.title }));
    return {
        ...doctor,
        name,
        title: "Consultant",
        specialty,
        services: localizeItems(doctor.services),
        solutions: localizeItems(doctor.solutions),
        whatsappMessage: `Hello, I would like to book a consultation with ${name} at Kadina Center.`,
    };
}

export function getDoctorDetails(lang = "ar") {
    return doctorDetails.map((doctor) => getDoctorDetail(doctor.slug, lang));
}
