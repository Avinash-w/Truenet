import { useState, useEffect } from "react";
import Watch from "../components/Watch";
import FilterSection from "../components/FilterSection";
import trackImg from "../assets/img/tracking.png";

export default function Products() {
  const [filters, setFilters] = useState({
    price: [0, 10000],
    gender: [],
    strapMaterial: [],
    strapColor: [],
    dialType: [],
    dialColor: [],
  });

  const [showFilter, setShowFilter] = useState(false);

  // close filter when clicking outside (only mobile)
  useEffect(() => {
    if (!showFilter) return;
    const handleClick = (e) => {
      if (!e.target.closest("#filterSidebar") && !e.target.closest("#filterButton")) {
        setShowFilter(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showFilter]);

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          id="filterButton"
          className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm text-blue-600"
          onClick={() => setShowFilter(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000" d="M20.536 20.536C22 19.07 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465" opacity="0.5"/><path fill="#000" d="M11.255 11.445a.75.75 0 0 1-1.01 1.11l-2.75-2.5a.75.75 0 0 1 0-1.11l2.75-2.5a.75.75 0 0 1 1.01 1.11L9.94 8.75H16a.75.75 0 0 1 0 1.5H9.94z"/><path fill="#000" d="M12.746 16.445a.75.75 0 1 0 1.008 1.11l2.75-2.5a.75.75 0 0 0 0-1.11l-2.75-2.5a.75.75 0 1 0-1.008 1.11l1.314 1.195H8a.75.75 0 0 0 0 1.5h6.06z"/></svg>
          {/* Filters */}
        </button>
      </div>

      {/* Sidebar Filter */}
      <div
        id="filterSidebar"
        className={`fixed   inset-y-20 left-0 w-72  shadow-lg p-4 transform transition-transform duration-300 z-50
        ${showFilter ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:col-span-1 md:block`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          {/* <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setShowFilter(false)} className="text-gray-600">
            ✖
          </button> */}
        </div>

         <div className="sticky top-20 lg:top-44">
    <FilterSection filters={filters} setFilters={setFilters} />
  </div>
      </div>

      {/* Product List */}
      <div className="md:col-span-3">
        <h1 className="text-center text-2xl font-bold mb-8 text-black-600">
          
Fashion Hues Watches

        </h1>
        <Watch filters={filters} />
      </div>
    </div>
  );
}
