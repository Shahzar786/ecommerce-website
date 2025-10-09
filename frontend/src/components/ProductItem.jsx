import React , { useContext }  from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
  const { currency } = useContext(ShopContext); 
     
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`} >
       <div className='overflow-hidden'>
           <img 
             className='hover:scale-110 transition ease-in-out w-full h-40 object-contain  rounded-md' 
             src={image[0]}   // ✅ ab yaha hi [0] rakho
             alt={name} 
           />
       </div>
       <p className='pt-3 pb-1 text-sm ml-5'>{name}</p>
       <p className='text-sm font-medium  ml-25'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
