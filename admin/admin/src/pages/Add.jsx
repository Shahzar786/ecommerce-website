import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, num) => {
    setImages((prev) => ({
      ...prev,
      [`image${num}`]: e.target.files[0],
    }));
  };

  const getPreview = (img) => (img ? URL.createObjectURL(img) : assets.upload_area);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending token:", token);
      console.log("POST URL:", `${backendUrl}/api/product/add`);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Product Added Response:", response.data);
      alert(response.data.message || "Product added successfully!");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Upload Images */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className="w-20 h-20 object-cover border border-gray-300 rounded-md"
                src={getPreview(images[`image${num}`])}
                alt={`preview-${num}`}
              />
              <input
                type="file"
                id={`image${num}`}
                hidden
                onChange={(e) => handleImageChange(e, num)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
          placeholder="Type here"
          required
        />
      </div>

      {/* Category & Price */}
      <div className="flex flex-col sm:flex-row gap-5 w-full sm:gap-8">
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded-md sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`px-3 py-1 rounded-md cursor-pointer border transition-all ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-gray-700 border-gray-300"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-3">
        <input
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-5 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
