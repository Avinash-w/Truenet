import { useState } from "react";
import { Link } from "react-router-dom";
import wishlistImg from "../assets/img/wishlist.png";
import cartImg from "../assets/img/shopping-cart.png";
import trackImg from "../assets/img/tracking.png";

export default function Topnav() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Premium Watches", path: "/premium-watches" },
    { name: "Watches", path: "/watches" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/logoblacki - Copy.jpeg"
              alt="Logo"
              className="w-28 md:w-36 lg:w-44 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center max-w-md px-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#776c18] shadow-sm transition bg-white"
          />
        </div>

        {/* Icons + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="hover:scale-110 transition">
            <img src={wishlistImg} alt="Wishlist" className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <Link to="/cart" className="hover:scale-110 transition">
            <img src={cartImg} alt="Cart" className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <Link to="/track-order" className="hover:scale-110 transition">
            <img src={trackImg} alt="Track Order" className="w-6 h-6 md:w-7 md:h-7" />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none ml-2"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#776c18] shadow-sm transition bg-white"
        />
      </div>

      {/* Navigation Menu */}
      <nav
        className={`${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        } md:max-h-full overflow-hidden transition-all duration-300 bg-black md:bg-black`}
      >
        <ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 py-4 md:py-5 text-[#776c18] font-medium text-lg tracking-wide">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className="hover:text-white transition block"
                onClick={() => setMenuOpen(false)} // close on click mobile
              >
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
