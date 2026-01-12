import React, { useEffect, useRef, useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecommendedSlider() {
  const [randomProducts, setRandomProducts] = useState([]);
  const sliderRef = useRef(null);

  // Pick random products
  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 10));
  }, []);

  // Auto-slide
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const cardWidth = 260 + 24;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
        scrollAmount = 0;
      } else {
        scrollAmount += cardWidth;
        slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [randomProducts]);

  // Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="px-4 sm:px-8 py-12 bg-gradient-to-b from-[#fafafa] to-[#f1f1f1]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900"
          variants={cardVariants}
        >
          Recommended <span className="text-[#776c18]">Watches</span>
        </motion.h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Handpicked styles you’ll love
        </p>
      </div>

      {/* Slider */}
      <motion.div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
                   [&::-webkit-scrollbar]:hidden 
                   [-ms-overflow-style:'none'] 
                   [scrollbar-width:'none']"
        variants={containerVariants}
      >
        {randomProducts.map((product, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-64 flex-shrink-0 snap-center 
                       rounded-2xl bg-white shadow-md hover:shadow-xl 
                       transition-all duration-300 border border-gray-200"
          >
            {/* Badge */}
            <span className="absolute top-3 left-3 z-10 
                             bg-gradient-to-r from-[#776c18] to-[#9c8b24]
                             text-white text-xs px-3 py-1 rounded-full shadow">
              Premium
            </span>

            {/* Image */}
            <div className="p-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="px-4 pb-5 text-center">
              <p className="text-sm text-gray-700 line-clamp-2">
                {product.name}
              </p>

              <p className="text-lg font-semibold text-gray-900 mt-2">
                ₹{product.price}
              </p>

              <Link
                to={`/product/${product.id}`}
                className="inline-block mt-3 px-5 py-2 text-sm font-medium 
                           text-[#776c18] border border-[#776c18] rounded-full
                           hover:bg-[#776c18] hover:text-white transition-all"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
