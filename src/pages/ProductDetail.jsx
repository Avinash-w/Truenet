import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  // Track selected image
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  if (!product) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }

  // Handle zoom movement on hover
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)", // zoom level
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          {/* Main Image with Zoom */}
          <div
            className="relative w-full h-96 overflow-hidden rounded-lg shadow cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => {
              setIsZoomed(false);
              setZoomStyle({});
            }}
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed((prev) => !prev)} // click toggles zoom lock
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full h-full object-contain transition-transform duration-200 ${
                isZoomed ? "scale-150" : ""
              }`}
              style={isZoomed ? zoomStyle : {}}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover rounded border cursor-pointer transition
                  ${
                    selectedImage === img
                      ? "ring-2 ring-blue-500"
                      : "hover:scale-105"
                  }
                `}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-xl sm:text-2xl text-black font-medium"> {product.name}</h1>
          <p className="text-xl sm:text-2xl text-gray-700 mt-2 font-bold">₹{product.price}</p>

          <div className="space-y-2 text-gray-700 mt-4">
            <p>
              <span className="text-lg font-semibold">Gender:</span> {product.gender}
            </p>
            <p>
              <span className="text-lg font-semibold">Strap Material:</span>{" "}
              {product.strapMaterial}
            </p>
            <p>
              <span className="text-lg font-semibold">Strap Color:</span>{" "}
              {product.strapColor}
            </p>
            <p>
              <span className="text-lg font-semibold">Dial Type:</span>{" "}
              {product.dialType}
            </p>
            <p>
              <span className="text-lg font-semibold">Dial Color:</span>{" "}
              {product.dialColor}
            </p>
             <p>
              <span className="text-lg font-semibold">Warranty:</span>{" "}
              {product.Warranty}
            </p>
          </div>

          <p className="mt-4 text-lg font-semibold">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
