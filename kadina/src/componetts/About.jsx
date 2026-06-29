export default function About() {
    return (
        <section id="about" className="bg-white py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">

                {/* Image */}
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900"
                        alt="عن المركز"
                        className="h-[600px] w-full rounded-3xl object-cover shadow-xl"
                    />
                </div>

                {/* Content */}
                <div>

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        من نحن
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        مركز متخصص في الجلدية والتجميل بأحدث التقنيات
                    </h2>

                    <p className="mt-6 leading-8 text-gray-600">
                        نسعى لتقديم أفضل خدمات الجلدية والعناية بالبشرة والشعر والحقن
                        التجميلية وعمليات التجميل وفق أعلى المعايير الطبية وباستخدام أحدث
                        الأجهزة العالمية لتحقيق أفضل النتائج.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border p-6">
                            <h3 className="text-xl font-semibold text-gray-900">
                                رؤيتنا
                            </h3>

                            <p className="mt-3 text-gray-600">
                                أن نكون الوجهة الأولى في خدمات الجلدية والتجميل.
                            </p>
                        </div>

                        <div className="rounded-2xl border p-6">
                            <h3 className="text-xl font-semibold text-gray-900">
                                رسالتنا
                            </h3>

                            <p className="mt-3 text-gray-600">
                                تقديم خدمات طبية آمنة بنتائج طبيعية وجودة عالية.
                            </p>
                        </div>

                    </div>

                    {/* Features */}

                    <div className="mt-12 space-y-5">

                        <div className="rounded-xl bg-gray-50 p-5">
                            ✔ أحدث الأجهزة الطبية العالمية
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            ✔ نخبة من الأطباء والاستشاريين
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            ✔ بيئة علاجية آمنة ومريحة
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            ✔ متابعة مستمرة بعد الإجراء
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}