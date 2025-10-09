import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'; // yeh import zaroor karna

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = products.slice();

      // filter by category
      productsCopy = productsCopy.filter((item) => item.category === category);

      // filter by subCategory
      productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center py-2 text-3xl'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6'>
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No related products found</p>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts
