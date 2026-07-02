import { doctors } from "../data/doctors";

export default function Doctors({ lang = "ar" }) {
    const data = doctors[lang] || doctors.ar;

    return (
        <section id="doctors" className="bg-[#fff7eb] py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="section-eyebrow">{data.eyebrow}</span>

                    <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
                        {data.title}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
                        {data.description}
                    </p>
                </div>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {data.items.map((doctor) => (
                        <article
                            key={doctor.name}
                            className="group overflow-hidden rounded-[2rem] border border-[#4c2c00]/10 bg-white/75 p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#f8aa2d] hover:bg-white hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f8ead8]">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    loading="lazy"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = "/kadina-logo.svg";
                                    }}
                                    className="aspect-[4/5] w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2b1b08]/45 to-transparent" />
                            </div>

                            <div className="px-3 py-6 text-center">
                                <h3 className="text-xl font-black leading-8 text-[#2b1b08]">
                                    {doctor.name}
                                </h3>

                                <p className="mt-3 min-h-14 text-sm font-bold leading-7 text-[#cf7d11]">
                                    {doctor.specialty}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}