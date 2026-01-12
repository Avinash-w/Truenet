import products from "../data/products.json";
import { Link } from "react-router-dom";

export default function Sale() {
  // Sale logic: show products with discount
  const saleProducts = products.filter(
    (p) => p.mrp && p.price && p.price < p.mrp
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= SALE HERO ================= */}
      <div className="bg-white text-black py-14 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-wide">
          WATCH SALE
        </h1>
        <p className="text-sm sm:text-base text-yellow-700 mt-2">
          Upto 50% Off on Premium Watches
        </p>
      </div>

      {/* ================= SALE GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "Men", "Women", "Unisex"].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-black hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 bg-gray-50 rounded-t-2xl flex items-center justify-center">
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  SALE
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
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                </div>

                <span className="text-xs text-green-600 font-semibold">
                  {Math.round(
                    ((product.mrp - product.price) / product.mrp) * 100
                  )}
                  % OFF
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
