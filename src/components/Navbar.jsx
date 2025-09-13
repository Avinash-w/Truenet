import { useState } from "react";
import { Link } from "react-router-dom";
import wishlistImg from "../assets/img/wishlist.png";
import cartImg from "../assets/img/shopping-cart.png";
import trackImg from "../assets/img/tracking.png";
import logo from "../assets/img/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white  sticky top-0 z-50 border-b-2 border-s-neutral-400 ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/cart">
                <img
                  src={logo}
                  alt="Cart"
                  className=" inline mr-1"
                />
              </Link>

          {/* Desktop Floating Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 pl-4  focus:outline-none   focus:border-[#776c18] transition bg-white"
              />
            </div>
          </div>

          {/* Desktop Menu Links */}
          <ul className=" flex items-center space-x-8 text-gray-700 font-medium">
            <li className="hover:text-blue-600 transition">
              <Link to="/wishlist">
                <img
                  src={wishlistImg}
                  alt="Wishlist"
                  className="w-10 h-10 inline mr-1"
                />
              </Link>
            </li>
            <li className="hover:text-blue-600 transition">
              <Link to="/cart">
                <img
                  src={cartImg}
                  alt="Cart"
                  className="w-10 h-10 inline mr-1"
                />
              </Link>
            </li>
            <li className="hover:text-blue-600 transition">
              <Link to="/track-order">
                <img
                  src={trackImg}
                  alt="Track Order"
                  className="w-10 h-10 inline mr-1"
                />
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl font-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "X" : "☰"}
          </button>
        </div>
      </nav>

      {/* Secondary Navbar (Desktop) */}
      
      <nav className="hidden md:block bg-white  ">
        <div className="w-full  px-6 py-6  ">
          <ul className="flex flex-wrap justify-center gap-10 text-[#776c18] font-medium text-center">
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/" className=" text-lg font-medium">Home</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/about" className="text-lg font-medium">About</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/products" className="text-lg font-medium">Products</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/men" className="text-lg font-medium">Men</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/women" className="text-lg font-medium">Women</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/premium-watches" className="text-lg font-medium">Premium Watches</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/watches" className="text-lg font-medium">Watches</Link>
            </li>
            <li className=" hover:border-b-2 hover:border-black border-b-2 border-white">
              <Link to="/sale" className="text-lg font-medium">Sale</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-500">
          <span className="text-white font-bold text-xl">Menu</span>
          <button
            className="text-white text-2xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-white font-medium">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          </li>
          <li>
            <Link to="/men" onClick={() => setIsOpen(false)}>Men</Link>
          </li>
          <li>
            <Link to="/women" onClick={() => setIsOpen(false)}>Women</Link>
          </li>
          <li>
            <Link to="/premium-watches" onClick={() => setIsOpen(false)}>Premium Watches</Link>
          </li>
          <li>
            <Link to="/watches" onClick={() => setIsOpen(false)}>Watches</Link>
          </li>
          <li>
            <Link to="/sale" onClick={() => setIsOpen(false)}>Sale</Link>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
