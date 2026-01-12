import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";


export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  if (!product) {
    return (
      <h2 className="text-center text-red-500 mt-10 text-lg">
        Product not found
      </h2>
    );
  }

  const handleAddToCart = () => {
    const productWithImg = { ...product, img: product.images?.[0] || "" };
    addToCart(productWithImg);
    toast.success(`${product.name} added to cart! 🎉`);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  return (
    <div className=" min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto  p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* ================= IMAGE SECTION ================= */}
          <div>
            <div
              className="relative w-full h-72 sm:h-96 md:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => {
                setIsZoomed(false);
                setZoomStyle({});
              }}
              onMouseMove={handleMouseMove}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 ease-out"
                style={isZoomed ? zoomStyle : {}}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover cursor-pointer transition-all duration-300
                    ${
                      selectedImage === img
                        ? "ring-2 ring-black scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="space-y-6">

            {/* Title */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Premium Analog Watch
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ₹{product.price}.00
              </span>

              <span className="text-sm sm:text-base text-gray-400 line-through">
                ₹{product.mrp}.00
              </span>

              <span className="bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                {Math.round(
                  ((product.mrp - product.price) / product.mrp) * 100
                )}
                % OFF
              </span>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Gender", product.gender],
                ["Strap", product.strapMaterial],
                ["Strap Color", product.strapColor],
                ["Dial Type", product.dialType],
                ["Dial Color", product.dialColor],
                ["Warranty", product.Warranty],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment Image */}
            <img
              src="/payment-product-detail.png"
              alt="Payment Options"
              className="w-full "
            />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-xl bg-black text-white font-semibold tracking-wide hover:bg-gray-900 transition-all"
              >
                Add to Cart
              </button>

              <Link
                to="/cart"
                className="flex-1 py-4 rounded-xl border-2 border-black text-black font-semibold text-center hover:bg-black hover:text-white transition-all"
              >
                Buy Now
              </Link>
            </div>

            {/* Trust Info */}
            <div className="text-xs sm:text-sm text-gray-500 space-y-1">
              <p>🚚 Delivery: 12–26 days (International), 3–6 days (USA)</p>
              <p>↩️ Easy 45-day returns | Duties & taxes non-refundable</p>
            </div>

          </div>
        </div>
      </div>
      <RelatedProducts
  products={products}
  currentProduct={product}
/>
    </div>
  );
}
