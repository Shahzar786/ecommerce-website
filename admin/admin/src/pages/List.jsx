import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // ✅ Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch product list");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Remove product function (DELETE request)
     const removeProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/product/remove`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { id }, // DELETE request me body "data" ke andar jata hai
      }
    );

    if (response.data.success) {
      toast.success("🗑️ Product removed successfully!");
      fetchList();
    } else {
      toast.error(response.data.message || "Failed to remove product");
    }
  } catch (error) {
    console.error("❌ Remove Error:", error);
    toast.error(error.response?.data?.message || "Server error");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-3 text-gray-700">
        🛍️ All Products List
      </p>

      <div className="flex flex-col gap-2">
        {/* ----List Table Header---- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center py-2 px-4 border bg-gray-100 text-sm font-medium text-gray-700 rounded-md shadow-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----Product Rows---- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-2 py-2 px-4 border rounded-md hover:shadow-md transition-all duration-200 text-sm bg-white"
          >
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                className="w-12 h-12 object-cover rounded-md border"
                src={item.image[0]}
                alt={item.name}
              />
            </div>

            {/* Product Name */}
            <p className="font-medium text-gray-800 truncate">{item.name}</p>

            {/* Category */}
            <p className="text-gray-600 capitalize">{item.category}</p>

            {/* Price */}
            <p className="font-semibold text-gray-700">
              {currency}
              {item.price}
            </p>

            {/* Delete / Action */}
            <div
              onClick={() => removeProduct(item._id)}
              className="flex justify-center text-red-500 cursor-pointer hover:text-red-700 transition"
            >
              <X size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
