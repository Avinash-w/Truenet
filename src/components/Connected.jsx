import { motion } from "framer-motion";

export default function Connected() {
  // Animation variants (soft + premium)
  const bannerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-20 px-4 md:px-8">
      
      {/* First Banner */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-md"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src="imgfortext2.webp"
          alt="Smartwatch Banner"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
          <motion.div
            className="text-white px-6 md:px-10"
            variants={textVariants}
          >
            <p className="text-yellow-400 text-sm uppercase tracking-widest mb-2">
              Smart & Connected
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 max-w-md">
              Stay ahead with smartwatches built for modern life
            </h2>
            <button className="border-b-2 border-yellow-400 text-yellow-400 font-semibold hover:text-white hover:border-white transition">
              View Products
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Second Banner */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-md"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src="imgfortext1.webp"
          alt="Adventure Banner"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
          <motion.div
            className="text-white px-6 md:px-10"
            variants={textVariants}
          >
            <p className="text-yellow-400 text-sm uppercase tracking-widest mb-2">
              Sport & Adventure
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-4 max-w-md">
              Rugged timepieces ready for your next challenge
            </h2>
            <button className="border-b-2 border-yellow-400 text-yellow-400 font-semibold hover:text-white hover:border-white transition">
              Shop Now
            </button>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
