const images = [
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
];

export default function Gallery() {
    return (
        <section id="gallery" className="bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Title */}

                <div className="mb-16 text-center">

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        معرض الصور
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        تعرف على مركزنا
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        مجموعة من الصور التي تعكس جودة خدماتنا وبيئة المركز الحديثة.
                    </p>

                </div>

                {/* Images */}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-3xl shadow-lg"
                        >
                            <img
                                src={image}
                                alt={`Gallery ${index + 1}`}
                                className="h-80 w-full object-cover transition duration-500 hover:scale-110"
                            />
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}