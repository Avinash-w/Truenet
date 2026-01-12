import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function PremiumWatches() {
  // Filter premium watches
  const premiumProducts = products.filter(
    (item) => item.price > 999
  );

  if (premiumProducts.length === 0) return null;

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Premium Watches
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Crafted for those who value timeless luxury
            </p>
          </div>

          <Link
            to="/sale"
            className="text-sm font-semibold text-black hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {premiumProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 bg-gray-50 rounded-t-2xl flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                  PREMIUM
                </span>

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4 space-y-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                  {product.name}
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    ₹{product.price}
                  </span>

                  {product.mrp && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>

                {product.mrp && (
                  <span className="text-xs text-green-600 font-semibold">
                    {Math.round(
                      ((product.mrp - product.price) / product.mrp) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
