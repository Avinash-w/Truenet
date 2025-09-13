import { useRef, useEffect } from "react";

export default function FeaturedCollections() {
  const collections = [
    {
      title: "Refined In Rose",
      desc: "Bold. Elegant. Always on time.",
      img: "/brand1.png",
      button: "Watch Now",
    },
    {
      title: "Two-Tone GMT",
      desc: "Classic look. Modern edge.",
      img: "/truenet/TR-441BL/img1.jpeg",
      button: "Watch Now",
    },
    {
      title: "Chrono Black",
      desc: "Timeless style. Built to last.",
      img: "/truenet/TR-441BL/img1.jpeg",
      button: "Watch Now",
    },
    {
      title: "Luxury Steel",
      desc: "Premium steel. Premium look.",
      img: "/truenet/TR-441BL/img1.jpeg",
      button: "Watch Now",
    },
  ];

  const sliderRef = useRef(null);

  // Scroll one card at a time
  const scroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.firstChild.offsetWidth + 24; // width + gap
    slider.scrollBy({ left: cardWidth, behavior: "smooth" });

    // If reached the end → reset to start
    if (
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 5
    ) {
      setTimeout(() => {
        slider.scrollTo({ left: 0, behavior: "auto" });
      }, 500);
    }
  };

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => scroll(), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-20 bg-white relative">
      <div className=" mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold uppercase text-center mb-12">
          Featured Collections
        </h2>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden snap-x snap-mandatory"
        >
          {collections.concat(collections).map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-start w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] 
              bg-gray-100 rounded-2xl shadow hover:shadow-lg transition  flex items-center"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 md:w-40 md:h-48 object-cover"
              />

              {/* Text */}
              <div className="ml-6 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {item.desc}
                </p>
                <button className="px-4 md:px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition">
                  {item.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
