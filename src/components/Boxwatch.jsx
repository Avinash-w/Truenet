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
    const cardWidth = 280 + 24;

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="px-6 py-14 my-16 bg-gradient-to-b from-gray-50 to-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* SECTION HEADER */}
      <motion.div
        className="text-center mb-10"
        variants={cardVariants}
      >
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Handpicked For You
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mt-2">
          Top Selling <span className="text-[#776c18]">Watches</span>
        </h2>
      </motion.div>

      {/* SLIDER */}
      <motion.div
        ref={sliderRef}
        className="flex gap-6 overflow-x-scroll snap-x snap-mandatory 
                   scroll-smooth 
                   [&::-webkit-scrollbar]:hidden 
                   [-ms-overflow-style:'none'] 
                   [scrollbar-width:'none']"
        variants={containerVariants}
      >
        {randomProducts.map((product, index) => {
          const discount =
            product.mrp
              ? Math.round(
                  ((product.mrp - product.price) / product.mrp) * 100
                )
              : null;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="relative w-[280px] flex-shrink-0 snap-center 
                         rounded-3xl bg-white shadow-md 
                         hover:shadow-2xl transition-all duration-300 
                         border border-gray-200"
            >
              {/* Discount Badge */}
              {discount && (
                <span className="absolute top-4 left-4 z-10 
                                 bg-black text-white text-xs font-semibold 
                                 px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>
              )}

              {/* Image */}
              <div className="h-56 bg-gray-50 rounded-t-3xl flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-5 text-center space-y-2">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </p>

                <div className="flex justify-center items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.mrp && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="inline-block mt-2 px-5 py-2 
                             text-sm font-semibold text-[#776c18] 
                             border border-[#776c18] rounded-full 
                             hover:bg-[#776c18] hover:text-white 
                             transition-all"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
