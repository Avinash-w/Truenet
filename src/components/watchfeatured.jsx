export default function WatchFeatures() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/img2.jpeg')" }} >
         <h2 className="text-5xl font-bold uppercase text-center text-white mb-12">
          Featured TrueNet
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        
        {/* Left Features */}
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h6 className="text-xl font-semibold text-gray-900 mb-2">
              Swiss Precision
            </h6>
            <p className="text-gray-600 leading-relaxed">
              Engineered with the world’s most trusted movement for unrivaled accuracy
              and durability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h6 className="text-xl font-semibold text-gray-900 mb-2">
              Timeless Craftsmanship
            </h6>
            <p className="text-gray-600 leading-relaxed">
              Handcrafted with meticulous detail, blending tradition with modern design.
            </p>
          </div>
        </div>

        {/* Middle Image */}
        <div className="flex items-center justify-center">
          <img
            src="/brand1.png"
            alt="Watch Brand"
            className="max-h-96 object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Right Features */}
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h6 className="text-xl font-semibold text-gray-900 mb-2">
              Luxury Materials
            </h6>
            <p className="text-gray-600 leading-relaxed">
              Built with premium steel and sapphire glass for strength and elegance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h6 className="text-xl font-semibold text-gray-900 mb-2">
              Everyday Versatility
            </h6>
            <p className="text-gray-600 leading-relaxed">
              Designed to suit every occasion—whether formal, casual, or adventure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
