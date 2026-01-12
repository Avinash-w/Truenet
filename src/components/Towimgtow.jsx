import { motion } from "framer-motion";

export default function TwoImageSection() {
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-20">
      
      {/* First Image */}
      <motion.img
        src="/poster1.jpg"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      {/* Second Image */}
      <motion.img
        src="/girls1.webp"
        alt="First"
        className="w-full h-auto rounded-2xl shadow-md"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

    </div>
  );
}
