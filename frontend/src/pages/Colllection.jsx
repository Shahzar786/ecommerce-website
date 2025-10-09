import React, { useEffect, useState, useContext } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { backendUrl } = useContext(ShopContext); // ✅ from context (http://localhost:4000/api)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/product/list`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
          setFilteredProducts(data.products || []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  // ✅ Category Toggle
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  // ✅ SubCategory Toggle
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  // ✅ Apply Filters + Sorting
  useEffect(() => {
    let filtered = [...products];

    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortOption === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [category, subCategory, sortOption, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* LEFT FILTER PANEL */}
      <div className="min-w-[200px] flex flex-col gap-6">
        {/* FILTER HEADER */}
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src="/dropdown-icon.svg"
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 rounded-lg shadow-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  className="mr-2 accent-black"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 rounded-lg shadow-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <h3 className="font-semibold mb-2">Type</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub}>
                <input
                  type="checkbox"
                  className="mr-2 accent-black"
                  value={sub}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PRODUCT GRID */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 items-center">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by: Relevant</option>
            <option value="price-low-high">Sort by: Low to High</option>
            <option value="price-high-low">Sort by: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
