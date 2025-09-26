import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

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
    <>
      {/* Top Navbar */}
      <nav className="bg-black sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src="/logoblacki - Copy.jpeg"
              alt="Logo"
              className="w-24 lg:w-40 md:w-32 object-contain"
            />
          </Link>

          {/* Search (Desktop Only) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-white rounded-lg border bg-black  px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#776c18] shadow-sm transition"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-5 ">
            <Link to="/wishlist" className=" hidden md:flex hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                  stroke-width="0.5"
                  stroke="#fff"
                />
              </svg>
            </Link>
            <Link to="/cart" className=" hidden md:flex hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M9 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m8-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-9.8-3.2v-.1l.9-1.7h7.4c.7 0 1.4-.4 1.7-1l3.9-7l-1.7-1l-3.9 7h-7L4.3 2H1v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1c0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2M12 9.3l-.6-.5C9.4 6.9 8 5.7 8 4.2C8 3 9 2 10.2 2c.7 0 1.4.3 1.8.8c.4-.5 1.1-.8 1.8-.8C15 2 16 2.9 16 4.2c0 1.5-1.4 2.7-3.4 4.6z"
                />
              </svg>
            </Link>
            <Link to="/track-order" className=" hidden md:flex hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M2.289 12.998q-.205 0-.343-.144t-.138-.357t.144-.356t.356-.143h3.48q.213 0 .357.144t.144.357t-.144.356t-.356.143zM7.502 19q-1.04 0-1.771-.73Q5 17.543 5 16.5H3.616q-.335 0-.535-.25t-.133-.571l.321-1.181h2.495q.838 0 1.417-.58t.579-1.42q0-.46-.2-.85t-.556-.646h1.815q.84 0 1.42-.58t.58-1.419t-.58-1.42t-1.42-.581H5.327l.304-1.1q.092-.393.39-.647Q6.316 5 6.734 5h10.054q.384 0 .627.308q.242.308.155.686L16.998 8.5h1.271q.384 0 .727.172q.344.171.566.474l1.797 2.398q.218.292.283.609q.066.316.01.664l-.598 3.037q-.056.292-.284.469t-.518.177h-.483q0 1.039-.728 1.77t-1.77.73t-1.771-.73q-.73-.728-.73-1.77H10q0 1.039-.728 1.77t-1.77.73M4.29 9.502q-.213 0-.357-.144t-.144-.357t.144-.356t.356-.143h4.5q.213 0 .357.144q.143.144.143.357t-.143.356t-.357.143zM7.5 18q.617 0 1.059-.441Q9 17.117 9 16.5t-.441-1.059T7.5 15t-1.059.441Q6 15.883 6 16.5t.441 1.059Q6.883 18 7.5 18m9.77 0q.617 0 1.058-.441q.441-.442.441-1.059t-.441-1.059T17.269 15t-1.058.441q-.442.442-.442 1.059t.441 1.059q.442.441 1.06.441m-1.384-4.75h4.653l.176-.89l-2.138-2.86h-1.818z"
                />
              </svg>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                // Close Icon (X)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#fff"
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
                  />
                </svg>
              ) : (
                // Hamburger Icon (☰)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 26 26"
                >
                  <g fill="none">
                    <defs>
                      <mask id="SVG1qNyQbyE">
                        <path fill="#fff" d="M0 0h26v26H0z" />
                        <path
                          fill="#000"
                          fill-rule="evenodd"
                          d="M5 11.5a.5.5 0 0 1 .5-.5h11.308a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h11.308a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5"
                          clip-rule="evenodd"
                        />
                      </mask>
                    </defs>
                    <circle
                      cx="13"
                      cy="13"
                      r="13"
                      fill="#fff"
                      mask="url(#SVG1qNyQbyE)"
                    />
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Navbar (Desktop Links) */}
      <nav className="hidden md:block bg-black ">
        <ul className="flex justify-center gap-10 py-4 text-white font-medium text-lg">
          {navItems.map((item) => (
            <li key={item.name} className="relative group cursor-pointer">
              <Link
                to={item.path}
                className="transition-colors hover:text-slate-400"
              >
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex bg-black justify-between items-center p-4 border-b">
          <img
              src="/logoblacki - Copy.jpeg"
              alt="Logo"
              className="w-32 object-contain"
            />
          <button
            className="text-2xl font-bold text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="block hover:text-[#776c18] transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-8">
          <Link to="/wishlist" className="  hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff89"
                  d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                  stroke-width="0.5"
                  stroke="#fff89"
                />
              </svg>
            </Link>
            <Link to="/cart" className=" hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff89"
                  d="M9 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m8-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-9.8-3.2v-.1l.9-1.7h7.4c.7 0 1.4-.4 1.7-1l3.9-7l-1.7-1l-3.9 7h-7L4.3 2H1v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1c0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2M12 9.3l-.6-.5C9.4 6.9 8 5.7 8 4.2C8 3 9 2 10.2 2c.7 0 1.4.3 1.8.8c.4-.5 1.1-.8 1.8-.8C15 2 16 2.9 16 4.2c0 1.5-1.4 2.7-3.4 4.6z"
                />
              </svg>
            </Link>
            <Link to="/track-order" className="  hover:scale-110 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff89"
                  d="M2.289 12.998q-.205 0-.343-.144t-.138-.357t.144-.356t.356-.143h3.48q.213 0 .357.144t.144.357t-.144.356t-.356.143zM7.502 19q-1.04 0-1.771-.73Q5 17.543 5 16.5H3.616q-.335 0-.535-.25t-.133-.571l.321-1.181h2.495q.838 0 1.417-.58t.579-1.42q0-.46-.2-.85t-.556-.646h1.815q.84 0 1.42-.58t.58-1.419t-.58-1.42t-1.42-.581H5.327l.304-1.1q.092-.393.39-.647Q6.316 5 6.734 5h10.054q.384 0 .627.308q.242.308.155.686L16.998 8.5h1.271q.384 0 .727.172q.344.171.566.474l1.797 2.398q.218.292.283.609q.066.316.01.664l-.598 3.037q-.056.292-.284.469t-.518.177h-.483q0 1.039-.728 1.77t-1.77.73t-1.771-.73q-.73-.728-.73-1.77H10q0 1.039-.728 1.77t-1.77.73M4.29 9.502q-.213 0-.357-.144t-.144-.357t.144-.356t.356-.143h4.5q.213 0 .357.144q.143.144.143.357t-.143.356t-.357.143zM7.5 18q.617 0 1.059-.441Q9 17.117 9 16.5t-.441-1.059T7.5 15t-1.059.441Q6 15.883 6 16.5t.441 1.059Q6.883 18 7.5 18m9.77 0q.617 0 1.058-.441q.441-.442.441-1.059t-.441-1.059T17.269 15t-1.058.441q-.442.442-.442 1.059t.441 1.059q.442.441 1.06.441m-1.384-4.75h4.653l.176-.89l-2.138-2.86h-1.818z"
                />
              </svg>
            </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
