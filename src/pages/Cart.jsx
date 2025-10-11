import { useCart } from "../CartContext";
import { useState } from "react";
import RecommendedSlider from "../components/Boxwatch";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { cart } = useCart();

  // Group same products
  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find((p) => p.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  const [products, setProducts] = useState(groupedCart);

  const handleIncrease = (index) => {
    const updated = [...products];
    updated[index].qty += 1;
    setProducts(updated);
  };

  const handleDecrease = (index) => {
    const updated = [...products];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    } else {
      updated.splice(index, 1);
    }
    setProducts(updated);
  };
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = products.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left - Product Details */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            🛍️ Shopping Cart
          </h1>

          {products.length === 0 ? (
            <p className="text-gray-500 text-lg text-center py-10">
              Your cart is empty 🛒
            </p>
          ) : (
            <div className="space-y-6">
              {products.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-xl shadow-sm"
                >
                  {/* Product Img */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                       src={item.img || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {item.qty > 1 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        {item.qty}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Qty Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(i)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.qty}</span>
                    <button
                      onClick={() => handleIncrease(i)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            📦 Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{products.reduce((acc, item) => acc + item.qty, 0)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
           onClick={handleCheckout}
          
           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <RecommendedSlider />
    </div>
  );
}
