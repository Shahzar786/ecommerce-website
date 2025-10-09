import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // ✅ Filter products with bestseller true
      const bestProduct = products.filter((item) => item.bestseller === true);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Check out the most loved and frequently bought products by our
          customers. Trusted by thousands, these are our top picks for you!
        </p>
      </div>

      {/* ✅ Render Only When Data Available */}
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Loading best sellers...
        </p>
      )}
    </div>
  );
};

export default BestSeller;
