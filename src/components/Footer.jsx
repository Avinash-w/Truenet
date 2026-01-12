import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-[#0e0e0e] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="text-center sm:text-left">
          <img
            src="/logoblacki - Copy.jpeg"
            alt="Truenet Watches"
            className="w-36 mb-4 mx-auto sm:mx-0"
          />
          <p className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Discover premium watches crafted with precision, elegance, and
            timeless design. Your perfect timepiece awaits.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold tracking-wide mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["All Watches", "/products"],
              ["Men", "/men"],
              ["Women", "/women"],
              ["Premium Watches", "/premium-watches"],
            ].map(([label, link], i) => (
              <li key={i}>
                <Link
                  to={link}
                  className="hover:text-[#d1b307] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold tracking-wide mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Track Order", "/track-order"],
              ["Wishlist", "/wishlist"],
              ["My Cart", "/cart"],
              ["About Us", "/about"],
              ["Contact Us", "/contact"],
            ].map(([label, link], i) => (
              <li key={i}>
                <Link
                  to={link}
                  className="hover:text-[#d1b307] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold tracking-wide mb-4">
            Get in Touch
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-center sm:justify-start gap-2">
              <span>📍</span> New Delhi, India
            </li>
            <li className="flex justify-center sm:justify-start gap-2">
              <span>📞</span> +91 98765 43210
            </li>
            <li className="flex justify-center sm:justify-start gap-2">
              <span>✉️</span> support@truenet.com
            </li>
          </ul>

          {/* Social */}
          <div className="flex justify-center sm:justify-start gap-4 mt-5">
            {["facebook-f", "instagram", "twitter"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center 
                           rounded-full border border-gray-700
                           hover:border-[#d1b307] hover:text-[#d1b307]
                           transition"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Truenet Watches. All rights reserved.  
        <span className="block sm:inline sm:ml-2">
          Designed by{" "}
          <a
            href="https://braintechinfosolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d1b307] hover:underline"
          >
            BrainTech Info Solutions
          </a>
        </span>
      </div>
    </footer>
  );
}
