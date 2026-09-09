import { useEffect, useState } from "react";


const offers = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    smallText: "LIMITED TIME OFFER",
    title: "Up to 50% Off",
    description: "Discover amazing deals on our latest collection.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
    smallText: "NEW COLLECTION",
    title: "Winter Collection",
    description: "Stay warm and stylish with our new winter collection.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    smallText: "MEN'S FASHION",
    title: "New Men's Collection",
    description: "Upgrade your wardrobe with our latest arrivals.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1600&q=80",
    smallText: "WOMEN'S FASHION",
    title: "Style For Every Moment",
    description: "Explore modern fashion designed for you.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
    smallText: "SPECIAL DEAL",
    title: "Buy More, Save More",
    description: "Get exclusive discounts on selected products.",
  },
];

const OfferCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % offers.length);
  };

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? offers.length - 1 : prev - 1
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-8">

      {/* Section Title */}

      <div className="mb-5">

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Don't Miss Out
        </p>

        <h2 className="text-3xl font-extrabold mt-1">
          Recent Offers
        </h2>

      </div>


      {/* Carousel */}

      <div className="relative h-[350px] sm:h-[450px] overflow-hidden rounded-3xl">

        {offers.map((offer, index) => (

          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              current === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >

            {/* Image */}

            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/50" />


            {/* Content */}

            <div className="absolute inset-0 flex items-center">

              <div className="text-white px-7 sm:px-14 max-w-2xl">

                <p className="text-sm tracking-[0.3em] font-semibold">
                  {offer.smallText}
                </p>

                <h3 className="text-4xl sm:text-6xl font-extrabold mt-4 leading-tight">
                  {offer.title}
                </h3>

                <p className="mt-5 text-gray-200 text-sm sm:text-base">
                  {offer.description}
                </p>

                <button className="mt-7 bg-white text-black px-7 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Shop Now
                </button>

              </div>

            </div>

          </div>

        ))}


        {/* Previous Button */}

        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center text-xl hover:bg-white transition"
        >
          ←
        </button>


        {/* Next Button */}

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center text-xl hover:bg-white transition"
        >
          →
        </button>


        {/* Dots */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">

          {offers.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50"
              }`}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default OfferCarousel;