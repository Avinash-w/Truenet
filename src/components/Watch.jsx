// src/components/Watch.jsx
import products from "../data/products.json";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Watch({ filters }) {
  const { addToCart } = useCart();

 const handleAddToCart = (product) => {
  const productWithImg = {
    ...product,
    img: product.images?.[0] || "", // ✅ Add the first image as 'img'
  };
  addToCart(productWithImg);
  toast.success(`${product.name} added to cart! 🎉`);
};


  const filteredProducts = products.filter((p) => {
    return (
      p.price >= filters.price[0] &&
      p.price <= filters.price[1] &&
      (filters.gender.length === 0 || filters.gender.includes(p.gender)) &&
      (filters.strapMaterial.length === 0 ||
        filters.strapMaterial.includes(p.strapMaterial)) &&
      (filters.strapColor.length === 0 ||
        filters.strapColor.includes(p.strapColor)) &&
      (filters.dialType.length === 0 || filters.dialType.includes(p.dialType)) &&
      (filters.dialColor.length === 0 || filters.dialColor.includes(p.dialColor))
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-contain rounded"
            />
            
            <h2  className="mt-4 text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            {/* <p className="text-sm text-gray-500 mt-2">{product.description}</p> */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="px-4 py-2 border-2 text-[#776c18] border-solid border-[#776c18]  rounded hover:bg-[#776c18] hover:text-white"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="px-4 py-2 bg-[#776c18] text-white rounded border-[#776c18]  hover:bg-white hover:border-2  hover:text-[#776c18]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          No products match your filters.
        </p>
      )}
    </div>
  );
}
