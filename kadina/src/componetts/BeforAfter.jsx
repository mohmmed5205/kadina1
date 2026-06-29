const cases = [
    {
        id: 1,
        title: "علاج آثار حب الشباب",
        before:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
        after:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    },
    {
        id: 2,
        title: "تجديد البشرة",
        before:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
        after:
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    },
];

export default function BeforeAfter() {
    return (
        <section id="before-after" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Title */}

                <div className="mb-16 text-center">

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        قبل وبعد
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        نتائج حقيقية لعملائنا
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        بعض النتائج التي حققها المركز بعد العلاج باستخدام أحدث التقنيات
                        الطبية.
                    </p>

                </div>

                {/* Cases */}

                <div className="space-y-20">

                    {cases.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl bg-gray-50 p-8 shadow-lg"
                        >

                            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
                                {item.title}
                            </h3>

                            <div className="grid gap-8 md:grid-cols-2">

                                {/* Before */}

                                <div>

                                    <h4 className="mb-4 text-center text-lg font-semibold text-red-500">
                                        قبل
                                    </h4>

                                    <img
                                        src={item.before}
                                        alt="Before"
                                        className="h-96 w-full rounded-2xl object-cover"
                                    />

                                </div>

                                {/* After */}

                                <div>

                                    <h4 className="mb-4 text-center text-lg font-semibold text-green-600">
                                        بعد
                                    </h4>

                                    <img
                                        src={item.after}
                                        alt="After"
                                        className="h-96 w-full rounded-2xl object-cover"
                                    />

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}