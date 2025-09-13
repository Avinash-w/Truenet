// src/components/FilterSection.jsx
import { useState } from "react";

export default function FilterSection({ filters, setFilters }) {
  const [open, setOpen] = useState({
    price: true,
    gender: true,
    strapMaterial: false,
    strapColor: false,
    dialType: false,
    dialColor: false,
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
  setFilters({
    price: [0, 10000], // default min and max
    gender: [],
    strapMaterial: [],
    strapColor: [],
    dialType: [],
    dialColor: [],
  });
};
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newValues };
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      {/* Price Range */}
      <button
  onClick={clearAllFilters}
  className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
>
  Clear All Filters
</button>
      <div>
        <button
          onClick={() => toggle("price")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Price Range
          <span>{open.price ? "−" : "+"}</span>
        </button>
        {open.price && (
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={filters.price[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: [0, Number(e.target.value)],
                }))
              }
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">
              Up to ₹{filters.price[1]}
            </p>
          </div>
        )}
      </div>

      {/* Gender */}
      <div>
        <button
          onClick={() => toggle("gender")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Gender
          <span>{open.gender ? "−" : "+"}</span>
        </button>
        {open.gender && (
          <div className="mt-2 space-y-1">
            {["Men", "Women", "Couples", "Kids"].map((g) => (
              <label key={g} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => handleCheckboxChange("gender", g)}
                  className="mr-2"
                />
                {g}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Strap Material */}
      <div>
        <button
          onClick={() => toggle("strapMaterial")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Strap Material
          <span>{open.strapMaterial ? "−" : "+"}</span>
        </button>
        {open.strapMaterial && (
          <div className="mt-2 space-y-1">
            {["Chain", "Cloths"].map((s) => (
              <label key={s} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.strapMaterial.includes(s)}
                  onChange={() => handleCheckboxChange("strapMaterial", s)}
                  className="mr-2"
                />
                {s}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Strap Color */}
      <div>
        <button
          onClick={() => toggle("strapColor")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Strap Color
          <span>{open.strapColor ? "−" : "+"}</span>
        </button>
        {open.strapColor && (
          <div className="mt-2 space-y-1">
            {["Black", "Golden", "White", "Gray"].map((c) => (
              <label key={c} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.strapColor.includes(c)}
                  onChange={() => handleCheckboxChange("strapColor", c)}
                  className="mr-2"
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Dial Type */}
      <div>
        <button
          onClick={() => toggle("dialType")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Dial Type
          <span>{open.dialType ? "−" : "+"}</span>
        </button>
        {open.dialType && (
          <div className="mt-2 space-y-1">
            {["Normal", "DTD"].map((d) => (
              <label key={d} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.dialType.includes(d)}
                  onChange={() => handleCheckboxChange("dialType", d)}
                  className="mr-2"
                />
                {d}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Dial Color */}
      <div>
        <button
          onClick={() => toggle("dialColor")}
          className="w-full text-left font-semibold text-lg flex justify-between"
        >
          Dial Color
          <span>{open.dialColor ? "−" : "+"}</span>
        </button>
        {open.dialColor && (
          <div className="mt-2 space-y-1">
            {["Black", "Golden", "White", "Gray"].map((c) => (
              <label key={c} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.dialColor.includes(c)}
                  onChange={() => handleCheckboxChange("dialColor", c)}
                  className="mr-2"
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
