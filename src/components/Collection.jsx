import { motion } from "framer-motion";

export default function Collection() {
  // Container stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Large Image */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src="https://watches-store-newdemo.myshopify.com/cdn/shop/files/image_1344.webp?v=1754294706&width=750"
            alt="Premium Watch"
            className="w-full h-full object-cover rounded-2xl shadow-xl transition duration-500"
          />
        </motion.div>

        {/* Right Grid of 4 Images */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {/* Image 1 */}
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/watch2.webp"
              alt="Luxury Watch"
              className="w-full h-80 object-cover rounded-2xl shadow-md transition duration-500"
            />
            <h4 className="mt-2 text-lg font-semibold">Exclusive Offer</h4>
            <p className="text-sm text-gray-500">
              Elegant design with premium build
            </p>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/watch1.jpg"
              alt="Luxury Watch"
              className="w-full h-80 object-cover rounded-2xl shadow-md transition duration-500"
            />
            <h4 className="mt-2 text-lg font-semibold">New Arrival</h4>
            <p className="text-sm text-gray-500">
              Latest style for modern trends
            </p>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/watch1.jpg"
              alt="Luxury Watch"
              className="w-full h-80 object-cover rounded-2xl shadow-md transition duration-500"
            />
            <h4 className="mt-2 text-lg font-semibold">Luxury Edition</h4>
            <p className="text-sm text-gray-500">Crafted with timeless elegance</p>
          </motion.div>

          {/* Image 4 */}
          <motion.div
            className="text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://watches-store-newdemo.myshopify.com/cdn/shop/files/image_1348.jpg?v=1754099596&width=600"
              alt="Luxury Watch"
              className="w-full h-80 object-cover rounded-2xl shadow-md transition duration-500"
            />
            <h4 className="mt-2 text-lg font-semibold">Best Seller</h4>
            <p className="text-sm text-gray-500">Our most loved collection</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
