import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import {
  ScanFace,
  Scissors,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import CardGrid from "../common/CardGrid";
import SectionTitle from "../common/SectionTitle";
import { cardItem } from "../../componetts/motionPresets";
import { servicePages } from "../../data/services";

const MotionLink = motion.create(Link);

const serviceIcons = {
  dermatology: Stethoscope,
  laser: Sparkles,
  "plastic-surgery": Scissors,
  hair: ScanFace,
  injectables: Syringe,
};

const englishServices = {
  dermatology: ["Dermatology", "Consultant-led diagnosis and treatment plans for skin conditions."],
  laser: ["Laser", "Advanced laser hair removal with technologies suited to different skin types."],
  "plastic-surgery": ["Plastic Surgery", "Specialized surgical procedures planned around natural, considered results."],
  hair: ["Hair", "Diagnosis and treatment options for hair loss and scalp concerns."],
  injectables: ["Cosmetic Injectables", "Botox, fillers and plasma treatments with a balanced, natural approach."],
};

export default function HomeServicesSection() {
  const { lang } = useOutletContext();
  return (
    <section
      className="scroll-mt-24 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={lang === "ar" ? "خدماتنا" : "Our Services"}
          title={lang === "ar" ? "الخدمات" : "Services"}
        />
        <CardGrid className="mt-9">
          {servicePages.map((service) => {
            const ServiceIcon = serviceIcons[service.slug];

            return (
              <MotionLink
                className="group rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                key={service.slug}
                to={`/services/${service.slug}`}
                variants={cardItem}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8aa2d]/16 text-[#cf7d11]">
                  <ServiceIcon aria-hidden="true" size={24} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-black text-[#4c2c00]">
                  {lang === "ar" ? service.title : englishServices[service.slug][0]}
                </h3>
                <p className="mt-3 leading-8 text-[#4c2c00]/68">
                  {lang === "ar" ? service.subtitle : englishServices[service.slug][1]}
                </p>
                <span className="mt-5 inline-block font-black text-[#cf7d11]">
                  {lang === "ar" ? "التفاصيل" : "Details"}
                </span>
              </MotionLink>
            );
          })}
        </CardGrid>
        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/services"
          >
            {lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
          </Link>
        </div>
      </div>
    </section>
  );
}
