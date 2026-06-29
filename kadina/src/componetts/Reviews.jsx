const reviews = [
    {
        id: 1,
        name: "سارة محمد",
        rating: 5,
        review:
            "تجربة ممتازة، الطاقم احترافي جدًا والنتائج كانت أفضل من المتوقع.",
    },
    {
        id: 2,
        name: "نورة خالد",
        rating: 5,
        review:
            "المركز نظيف جدًا، والدكتورة شرحت لي كل التفاصيل قبل الإجراء.",
    },
    {
        id: 3,
        name: "ريم عبدالله",
        rating: 5,
        review:
            "أفضل مركز تعاملت معه، اهتمام بالعميل من أول زيارة وحتى المتابعة.",
    },
];

export default function Reviews() {
    return (
        <section id="reviews" className="bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mb-16 text-center">

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        آراء العملاء
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        ماذا يقول عملاؤنا؟
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        نفخر بثقة عملائنا، وهذه بعض آرائهم وتجاربهم مع خدمات المركز.
                    </p>

                </div>

                {/* Reviews Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >

                            <div className="mb-5 text-amber-500 text-xl">
                                {"★★★★★"}
                            </div>

                            <p className="leading-8 text-gray-600">
                                "{review.review}"
                            </p>

                            <div className="mt-8 border-t pt-5">

                                <h3 className="text-lg font-bold text-gray-900">
                                    {review.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    عميل لدى المركز
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

                {/* Google Reviews Button */}

                <div className="mt-14 text-center">

                    <a
                        href="#"
                        className="inline-flex rounded-xl bg-amber-700 px-8 py-4 font-semibold text-white transition hover:bg-amber-800"
                    >
                        مشاهدة جميع التقييمات على Google
                    </a>

                </div>

            </div>
        </section>
    );
}