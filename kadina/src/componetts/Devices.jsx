import { devices } from "../data/devices";

export default function Devices({ lang = "ar" }) {
    const data = devices[lang] || devices.ar;

    return (
        <section id="devices" className="bg-[#f8ead8] py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center reveal">
                    <span className="section-eyebrow">{data.eyebrow}</span>

                    <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
                        {data.title}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
                        {data.description}
                    </p>
                </div>

                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4 reveal-stagger">
                    {data.items.map((device) => (
                        <article
                            key={device.name}
                            className="group overflow-hidden rounded-[2rem] border border-[#4c2c00]/10 bg-white/80 p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#f8aa2d] hover:bg-white hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#fff7eb]">
                                <img
                                    src={device.image}
                                    alt={device.name}
                                    loading="lazy"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = "/kadina-logo.svg";
                                    }}
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2b1b08]/35 to-transparent" />
                            </div>

                            <div className="px-3 py-6 text-center">
                                <h3 className="text-xl font-black leading-8 text-[#2b1b08]">
                                    {device.name}
                                </h3>

                                <p className="mt-3 text-sm font-semibold leading-7 text-[#4c2c00]/70">
                                    {device.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}