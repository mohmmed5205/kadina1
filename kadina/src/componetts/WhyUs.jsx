const features = [
    {
        id: 1,
        title: "أطباء متخصصون",
        description:
            "فريق طبي بخبرة واسعة في الجلدية والتجميل يقدم أفضل الحلول العلاجية.",
    },
    {
        id: 2,
        title: "أحدث الأجهزة",
        description:
            "نعتمد على أجهزة وتقنيات حديثة معتمدة عالميًا لتحقيق أفضل النتائج.",
    },
    {
        id: 3,
        title: "رعاية متكاملة",
        description:
            "متابعة مستمرة قبل وبعد العلاج لضمان راحة العميل وتحقيق النتائج المطلوبة.",
    },
    {
        id: 4,
        title: "نتائج موثوقة",
        description:
            "نسعى للحصول على نتائج طبيعية وآمنة تناسب احتياجات كل عميل.",
    },
];

export default function WhyUs() {
    return (
        <section id="why-us" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Title */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        لماذا نحن؟
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        لماذا يختارنا عملاؤنا؟
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        نحرص على تقديم تجربة علاجية متكاملة تجمع بين الخبرة الطبية،
                        أحدث التقنيات، والاهتمام بأدق التفاصيل لضمان أفضل النتائج.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl border border-gray-100 bg-gray-50 p-8 transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                                ⭐
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}