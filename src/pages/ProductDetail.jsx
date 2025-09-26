import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  if (!product) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl">
      <div className="grid sm:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div>
          <div
            className="relative w-full h-[550px] overflow-hidden rounded-2xl shadow-lg bg-white cursor-zoom-in border border-gray-200"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => {
              setIsZoomed(false);
              setZoomStyle({});
            }}
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed((prev) => !prev)}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${
                isZoomed ? "scale-150" : ""
              }`}
              style={isZoomed ? zoomStyle : {}}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-5 justify-center">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition-all duration-300 
                  ${
                    selectedImage === img
                      ? "border-black scale-105 shadow-md"
                      : "border-gray-200 hover:scale-105"
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#776c18] tracking-wide">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-yellow-600">₹{product.price}</p>

          <div className="space-y-2 text-gray-700 text-lg">
            <p><span className="font-semibold text-gray-900">Gender:</span> {product.gender}</p>
            <p><span className="font-semibold text-gray-900">Strap Material:</span> {product.strapMaterial}</p>
            <p><span className="font-semibold text-gray-900">Strap Color:</span> {product.strapColor}</p>
            <p><span className="font-semibold text-gray-900">Dial Type:</span> {product.dialType}</p>
            <p><span className="font-semibold text-gray-900">Dial Color:</span> {product.dialColor}</p>
            <p><span className="font-semibold text-gray-900">Warranty:</span> {product.Warranty}</p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          {/* Payment Info */}
          <img src="/payment-product-detail.png" alt="Payment Options" className="mt-4 w-full opacity-90" />

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-yellow-600 hover:text-black transition-all duration-300"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-600 transition-all duration-300"
            >
              Go to Cart
            </Link>
          </div>

          <p className="text-gray-600 text-sm ">Estimate delivery times: 12-26 days (International), 3-6 days (United States).</p>
          <p className="text-gray-600 text-sm ">Return within 45 days of purchase. Duties & taxes are non-refundable.</p>
        </div>
      </div>
    </div>
  );
}
