import { motion } from "framer-motion";

export default function CTASection() {
  // Container stagger animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  // Text animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/banner1.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6 text-[#847a2e]"
          variants={itemVariants}
        >
          Discover Timeless Elegance
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 text-[#474322]"
          variants={itemVariants}
        >
          Upgrade your style with precision-crafted watches designed for
          durability and sophistication.
        </motion.p>

        <motion.a
          href="/shop"
          variants={itemVariants}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:scale-105 transition duration-300">
            Shop Now
          </button>
        </motion.a>
      </motion.div>
    </section>
  );
}
