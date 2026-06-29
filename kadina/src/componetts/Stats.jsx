const stats = [
    {
        id: 1,
        number: "+10",
        title: "سنوات خبرة",
    },
    {
        id: 2,
        number: "+15",
        title: "طبيب متخصص",
    },
    {
        id: 3,
        number: "+5000",
        title: "عميل سعيد",
    },
    {
        id: 4,
        number: "98%",
        title: "نسبة رضا العملاء",
    },
];

export default function Stats() {
    return (
        <section className="bg-amber-700 py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-4">

                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl bg-white/10 p-10 backdrop-blur-sm"
                        >
                            <h2 className="text-5xl font-bold text-white">
                                {item.number}
                            </h2>

                            <p className="mt-4 text-lg text-amber-100">
                                {item.title}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}