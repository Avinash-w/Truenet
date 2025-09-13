import React, { useEffect, useRef, useState } from "react";
import products from "../data/products.json";

import { Link } from "react-router-dom";

export default function RecommendedSlider() {
  const [randomProducts, setRandomProducts] = useState([]);
  const sliderRef = useRef(null);

  // Pick random 6 products
  useEffect(() => {
    const shuffled = [...products].sort(() => 0.9 - Math.random());
    setRandomProducts(shuffled.slice(0, 10));
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const cardWidth = 260 + 24; // card width (w-64 = 256px) + gap (24px)

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        // if end reached → reset to start
        slider.scrollTo({ left: 0, behavior: "smooth" });
        scrollAmount = 0;
      } else {
        scrollAmount += cardWidth;
        slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [randomProducts]);

  return (
    <div className="px-6 py-10 my-10 bg-gradient-to-b from-gray-50 to-gray-100 ">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Recommended <span className="text-[#776c18]">Watches</span>
      </h2>

      {/* SLIDER CONTAINER */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll gap-6 snap-x snap-mandatory 
                   scroll-smooth 
                   [&::-webkit-scrollbar]:hidden 
                   [-ms-overflow-style:'none'] 
                   [scrollbar-width:'none']"
      >
        {randomProducts.map((product, index) => (
          <div
            key={index}
            className="w-64 flex-shrink-0 
                       snap-center rounded-2xl p-5 
                       bg-white/70 backdrop-blur-xl shadow-lg 
                       hover:shadow-2xl transition-all duration-300 
                       hover:-translate-y-2 border border-gray-200"
          >
            <span className="absolute top-0 left-0 z-10 bg-[#776c18] text-white text-xs px-3 py-1 rounded-full shadow">
                Premium
              </span>
            {/* Product Image */}
            <div className="relative">
              <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-contain rounded"
            />
              
            </div>

            {/* Product Info */}
            <div className="mt-4 text-center">
              {/* <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3> */}
              <p className="text-xl font-semibold text-black mt-1">₹{product.price}</p>

              <Link
                to={`/product/${product.id}`}
                className="px-4 py-2  text-[#776c18] rounded border-[#776c18]  hover:bg-white hover:border-2  hover:text-[#776c18]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
