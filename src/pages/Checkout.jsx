// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! 🎉 Cash on delivery only.");
    // Here you can also clear the cart or call an API
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[#776c18] text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>

          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email Address", type: "email" },
            { name: "address", placeholder: "Address", type: "text" },
            { name: "city", placeholder: "City", type: "text" },
            { name: "postalCode", placeholder: "Postal Code", type: "text" },
            { name: "country", placeholder: "Country", type: "text" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#776c18] transition"
              required
            />
          ))}

          <div className="text-sm text-gray-600 mb-2">
            Payment Method: <span className="font-semibold text-green-600">Cash on Delivery</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#776c18] text-white py-3 rounded-xl font-semibold hover:bg-[#5e5310] transition shadow-md"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty.{" "}
              <Link to="/products" className="text-[#776c18] underline font-medium">
                Shop now
              </Link>
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-3">
                    {item.img && <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md object-cover" />}
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}

              <div className="flex justify-between font-semibold text-lg mt-4 pt-2 border-t border-gray-200">
                <p>Total</p>
                <p>₹{totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
