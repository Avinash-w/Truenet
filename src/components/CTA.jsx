export default function CTASection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/banner1.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#847a2e]">
          Discover Timeless Elegance
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[#474322]">
          Upgrade your style with precision-crafted watches designed for
          durability and sophistication.
        </p>
        <a href="/shop">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:scale-105 transition duration-300">
            Shop Now
          </button>
        </a>
      </div>
    </section>
  );
}
