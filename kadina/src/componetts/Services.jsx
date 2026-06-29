const services = [
    {
        id: 1,
        title: "الجلدية",
        description:
            "علاج جميع مشاكل البشرة والجلد باستخدام أحدث الأجهزة والتقنيات الطبية.",
    },
    {
        id: 2,
        title: "الشعر",
        description:
            "تشخيص وعلاج مشاكل الشعر وتساقطه وزراعة الشعر بأحدث الأساليب.",
    },
    {
        id: 3,
        title: "الحقن التجميلية",
        description:
            "بوتكس، فيلر، نضارة البشرة، والبلازما للحصول على مظهر طبيعي.",
    },
    {
        id: 4,
        title: "عمليات التجميل",
        description:
            "إجراءات تجميلية بإشراف نخبة من الاستشاريين وفق أعلى المعايير الطبية.",
    },
];

export default function Services() {
    return (
        <section id="services" className="bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mb-16 text-center">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        خدماتنا
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        خدمات متكاملة للعناية بالجمال والصحة
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        نقدم مجموعة واسعة من الخدمات الطبية والتجميلية بأحدث الأجهزة
                        العالمية وعلى يد نخبة من الأطباء المتخصصين.
                    </p>
                </div>

                {/* Cards */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                                ✨
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {service.title}
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                {service.description}
                            </p>

                            <button
                                className="mt-8 rounded-xl border border-amber-700 px-6 py-3 font-semibold text-amber-700 transition hover:bg-amber-700 hover:text-white"
                            >
                                معرفة المزيد
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}