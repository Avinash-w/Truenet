import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeSlider() {
  const slides = [
    {
      image: "/specification-banner.jpeg",
      heading: "Premium Analog Watches for Men & Women",
      text: "Shop stylish and durable analog watches from TrueNetWatches, designed for everyday wear, comfort, and long-lasting performance.",
    },
    {
      image: "/slider1-bg.jpeg",
      heading: "Stylish Men’s Analog Watches",
      text: "Explore premium men’s watches with elegant dials and durable straps, crafted for style, precision, and comfort.",
    },
    {
      image: "/slider2-bg.jpeg",
      heading: "Modern & Stylish Watches for Everyday Wear",
      text: "TrueNetWatches offers fashionable and reliable wrist watches that match your lifestyle and enhance your look.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // 🔥 Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden shadow-lg">
      
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={`slide-${i}`}
            className="w-full flex-shrink-0 h-[500px] object-cover"
          />
        ))}
      </div>

      {/* Overlay with Animated Text */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
        <div className="max-w-3xl px-6 text-white overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}   // IMPORTANT for re-animation
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Top Label */}
              <motion.p className="text-yellow-400 tracking-widest text-xs md:text-sm font-semibold mb-3 drop-shadow-lg">
                TRUENET WATCHES • NEW ARRIVALS • PREMIUM COLLECTION
              </motion.p>

              {/* Heading */}
              <motion.h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {slides[current].heading}
              </motion.h1>

              {/* Paragraph */}
              <motion.p className="text-base md:text-lg leading-relaxed text-gray-200 drop-shadow-md">
                {slides[current].text}
              </motion.p>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
