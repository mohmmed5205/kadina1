export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center bg-gray-50 pt-20"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">

                {/* Left Content */}
                <div className="text-center lg:text-right">

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                        مركز متخصص في الجلدية والتجميل
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                        جمالك يبدأ من
                        <span className="text-amber-700"> العناية الصحيحة </span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        نقدم أحدث تقنيات الجلدية، العناية بالشعر، الحقن التجميلية،
                        وعمليات التجميل بإشراف نخبة من الأطباء وباستخدام أحدث الأجهزة الطبية.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

                        <a
                            href="https://wa.me/966500000000"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-amber-700 px-8 py-4 text-center font-semibold text-white transition hover:bg-amber-800"
                        >
                            تواصل عبر واتساب
                        </a>

                        <a
                            href="#services"
                            className="rounded-xl border border-gray-300 px-8 py-4 text-center font-semibold transition hover:border-amber-700 hover:text-amber-700"
                        >
                            استكشف الخدمات
                        </a>

                    </div>

                    {/* Statistics */}

                    <div className="mt-16 grid grid-cols-3 gap-6">

                        <div>
                            <h3 className="text-3xl font-bold text-amber-700">+15</h3>
                            <p className="mt-2 text-gray-600">طبيب متخصص</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-amber-700">+5000</h3>
                            <p className="mt-2 text-gray-600">عميل سعيد</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-amber-700">+10</h3>
                            <p className="mt-2 text-gray-600">سنوات خبرة</p>
                        </div>

                    </div>

                </div>

                {/* Right Image */}

                <div className="flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=900&auto=format&fit=crop"
                        alt="Beauty Clinic"
                        className="w-full max-w-lg rounded-3xl object-cover shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
}