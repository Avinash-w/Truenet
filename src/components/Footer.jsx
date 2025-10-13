import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🧭 Logo + About */}
        <div>
          <img
            src="/logoblacki - Copy.jpeg"
            alt="Logo"
            className="w-32 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Truenet brings you premium-quality watches that blend timeless
            design with modern craftsmanship. Discover your next signature
            style today.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#d1b307] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#d1b307] transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/men" className="hover:text-[#d1b307] transition">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-[#d1b307] transition">
                Women
              </Link>
            </li>
            <li>
              <Link to="/premium-watches" className="hover:text-[#d1b307] transition">
                Premium Watches
              </Link>
            </li>
          </ul>
        </div>

        {/* 🛍️ Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/track-order" className="hover:text-[#d1b307] transition">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-[#d1b307] transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-[#d1b307] transition">
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#d1b307] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#d1b307] transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>
              📍 New Delhi, India
            </li>
            <li>
              📞 +91 9876543210
            </li>
            <li>
              ✉️ support@truenet.com
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#d1b307] transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-[#d1b307] transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-[#d1b307] transition">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Truenet. All rights reserved. | Designed by{" "}
        <a
          href="https://braintechinfosolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          braintechinfosolutions.com
        </a>
      </div>
    </footer>
  );
}
