import { Link } from "react-router-dom";
import CardGrid from "../common/CardGrid";
import SectionTitle from "../common/SectionTitle";
import { servicePages } from "../../data/services";

export default function HomeServicesSection() {
  return (
    <section
      className="scroll-mt-24 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="خدماتنا"
          title="عناية متكاملة بروح كادينا"
          description="خمس خدمات رئيسية تبدأ بالتشخيص وتصل إلى الخطة الأنسب لكل حالة."
        />
        <CardGrid className="mt-9">
          {servicePages.map((service) => (
            <Link
              className="group rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
              key={service.slug}
              to={`/services/${service.slug}`}
            >
              <h3 className="text-xl font-black text-[#4c2c00]">
                {service.title}
              </h3>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {service.subtitle}
              </p>
              <span className="mt-5 inline-block font-black text-[#cf7d11]">
                تفاصيل الخدمة
              </span>
            </Link>
          ))}
        </CardGrid>
        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/services"
          >
            عرض جميع الخدمات
          </Link>
        </div>
      </div>
    </section>
  );
}
