import { useState, useEffect } from "react";

export default function WelcomeLightbox() {
  const [isOpen, setIsOpen] = useState(false);

  // ⏳ Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeIn relative">

        {/* ❌ Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* 📝 Left Content Section */}
        <div className="flex-1 p-8 flex flex-col justify-center text-center md:text-left bg-[#fffaf5]">
          
          {/* 🧭 Logo */}
          <div className="flex justify-center md:justify-start mb-6">
            <img
              src="/logoblacki - Copy.jpeg" // ✅ Replace with your logo path
              alt="Truenet Logo"
              className="w-24 h-auto md:w-28 object-contain mx-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight italic">
            Truenet Welcomes You!
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Discover our exclusive men’s collection — crafted with precision and elegance.  
            Experience timeless style with Truenet.
          </p>
        </div>

        {/* 🖼️ Right Image Section */}
        <div className="flex-1">
          <img
            src="/light-box.webp" // ✅ Replace with your image
            alt="Welcome"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
