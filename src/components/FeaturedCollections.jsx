import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

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
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
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

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="my-20 bg-gray-50 relative">
      <div className="mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold uppercase text-center mb-12 text-[#847a2e]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Collections
        </motion.h2>

        {/* Slider */}
        <motion.div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden snap-x snap-mandatory"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {collections.concat(collections).map((item, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 snap-start w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] 
                        bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg 
                        transition flex items-center p-4 md:p-6"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 md:w-40 md:h-48 object-cover rounded-xl"
              />

              {/* Text */}
              <div className="ml-4 md:ml-6 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  {item.desc}
                </p>
                <button className="px-4 md:px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition">
                  {item.button}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
