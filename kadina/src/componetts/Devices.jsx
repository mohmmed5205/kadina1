import { useEffect, useMemo, useState } from "react";
import { devices } from "../data/devices";

function getDevicesPerSlide() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function chunkItems(items, size) {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}

export default function Devices({ lang = "ar" }) {
    const data = devices[lang] || devices.ar;
    const [index, setIndex] = useState(0);
    const [perSlide, setPerSlide] = useState(getDevicesPerSlide());
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const handleResize = () => setPerSlide(getDevicesPerSlide());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = useMemo(
        () => chunkItems(data.items, perSlide),
        [data.items, perSlide]
    );

    useEffect(() => {
        setIndex(0);
    }, [lang, perSlide]);

    useEffect(() => {
        if (paused || slides.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [paused, slides.length]);

    const nextSlide = () => {
        setIndex((current) => (current + 1) % slides.length);
    };

    const prevSlide = () => {
        setIndex((current) => (current - 1 + slides.length) % slides.length);
    };

    return (
        <section id="devices" className="relative overflow-hidden bg-[#f8ead8] py-24">
            <div className="absolute right-[-160px] top-16 h-80 w-80 rounded-full bg-[#f8aa2d]/20 blur-3xl" />
            <div className="absolute bottom-0 left-[-160px] h-80 w-80 rounded-full bg-[#4c2c00]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mx-auto mb-12 max-w-3xl text-center reveal">
                    <span className="section-eyebrow">{data.eyebrow}</span>

                    <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
                        {data.title}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
                        {data.description}
                    </p>
                </div>

                <div
                    className="relative reveal"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="overflow-hidden rounded-[2.5rem] border border-[#4c2c00]/10 bg-white/40 p-4 shadow-sm backdrop-blur">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(${lang === "ar" ? index * 100 : -index * 100}%)`,
                            }}
                        >
                            {slides.map((slide, slideIndex) => (
                                <div key={slideIndex} className="min-w-full px-1">
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {slide.map((device) => (
                                            <article
                                                key={device.name}
                                                className="group overflow-hidden rounded-[2rem] border border-[#4c2c00]/10 bg-[#fffaf3] p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#f8aa2d] hover:bg-white hover:shadow-xl"
                                            >
                                                <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#fff7eb] to-[#f8ead8]">
                                                    <img
                                                        src={device.image}
                                                        alt={device.name}
                                                        loading="lazy"
                                                        onError={(event) => {
                                                            event.currentTarget.onerror = null;
                                                            event.currentTarget.src = "/kadina-logo.svg";
                                                        }}
                                                        className="aspect-[4/3] w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                                                    />

                                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2b1b08]/35 to-transparent" />
                                                </div>

                                                <div className="px-3 py-6">
                                                    <div className="mb-3 flex items-center justify-between gap-3">
                                                        <h3 className="text-xl font-black leading-8 text-[#2b1b08]">
                                                            {device.name}
                                                        </h3>

                                                        <span className="shrink-0 rounded-full bg-[#f8aa2d]/15 px-3 py-1 text-xs font-black text-[#cf7d11]">
                                                            KADINA
                                                        </span>
                                                    </div>

                                                    <p className="min-h-28 text-sm font-semibold leading-7 text-[#4c2c00]/75">
                                                        {device.description}
                                                    </p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {slides.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={prevSlide}
                                className="absolute top-1/2 -translate-y-1/2 rounded-full border border-[#4c2c00]/10 bg-white/90 px-4 py-3 text-xl font-black text-[#4c2c00] shadow-lg transition hover:bg-[#f8aa2d] hover:text-white ltr:-left-5 rtl:-right-5"
                                aria-label="Previous devices slide"
                            >
                                ‹
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                className="absolute top-1/2 -translate-y-1/2 rounded-full border border-[#4c2c00]/10 bg-white/90 px-4 py-3 text-xl font-black text-[#4c2c00] shadow-lg transition hover:bg-[#f8aa2d] hover:text-white ltr:-right-5 rtl:-left-5"
                                aria-label="Next devices slide"
                            >
                                ›
                            </button>
                        </>
                    )}

                    <div className="mt-8 flex justify-center gap-2">
                        {slides.map((_, dotIndex) => (
                            <button
                                key={dotIndex}
                                type="button"
                                onClick={() => setIndex(dotIndex)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${dotIndex === index
                                        ? "w-8 bg-[#f8aa2d]"
                                        : "w-2.5 bg-[#4c2c00]/20 hover:bg-[#4c2c00]/40"
                                    }`}
                                aria-label={`Go to devices slide ${dotIndex + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}