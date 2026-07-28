import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { deviceDetails } from "../../data/devices";

export default function HomeTechnologySection() {
  return (
    <section
      className="scroll-mt-24 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="technology"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="الأجهزة والتقنيات"
          title="13 جهازًا من الطراز العالمي"
          description="تعرّف على أجهزة كادينا واستخداماتها، ويحدد الطبيب الخيار والإعداد الأنسب لك."
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deviceDetails.map((device) => (
            <Link
              className="group overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
              key={device.slug}
              to={`/technology/${device.slug}`}
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/70 p-4">
                {device.image ? (
                  <img
                    alt={device.arabicName}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={device.image}
                  />
                ) : (
                  <span className="p-6 text-center text-xl font-black text-[#4c2c00]">
                    {device.arabicName}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-[#4c2c00]">
                  {device.arabicName}
                </h3>
                {device.englishName && (
                  <p
                    className="mt-2 text-sm font-bold text-[#cf7d11]"
                    dir="ltr"
                  >
                    {device.englishName}
                  </p>
                )}
                <span className="mt-5 inline-block font-black text-[#cf7d11]">
                  تفاصيل الجهاز
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/technology"
          >
            عرض جميع الأجهزة
          </Link>
        </div>
      </div>
    </section>
  );
}
