import { Link } from "react-router-dom";

export default function RelatedProducts({ products, currentProduct }) {
  const related = products
    .filter(
      (item) =>
        item.id !== currentProduct.id &&
        item.gender === currentProduct.gender
    )
    .slice(-8); // 👈 last 8 products

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="h-44 sm:h-52 bg-gray-50 rounded-t-2xl flex items-center justify-center overflow-hidden">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {item.name}
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  ₹{item.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.mrp}
                </span>
              </div>

              <span className="text-xs text-green-600 font-semibold">
                {Math.round(
                  ((item.mrp - item.price) / item.mrp) * 100
                )}
                % OFF
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
