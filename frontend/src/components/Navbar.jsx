import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
   const [visible, setVisible] = useState(false);
   
   const { setShowSearch, getCartCount } = useContext(ShopContext); // ✅ Capital S

   return (
     <div className="flex items-center justify-between py-5 font-medium">
       
       <Link to='/'> <img src={assets.logo} className="w-36" alt="" /> </Link>

       <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
       
           <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
         
         <NavLink to="/colllection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>


        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>


         <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
        </NavLink>

         {/* your nav links */}
       </ul>

       <div className="flex items-center gap-6">
           <img onClick={() =>setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

           <div className="group relative">
          <Link to='/login' > <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="" /> </Link> 
             <div className="group-hover:block absolute dropdown-menu right-0 pt-4">
                 {/* profile dropdown */}
             </div>
           </div>

           <Link to="/cart" className="relative">
             <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
             <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
           </Link>

           <img 
             onClick={() => setVisible(true)} 
             src={assets.menu_icon} 
             className="w-5 cursor-pointer sm:hidden" 
             alt="Menu" 
           />
       </div>

       {/* Mobile menu */}
       <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all overflow-hidden z-50 ${visible ? 'w-full' : 'w-0'}`}>
         <div className="flex justify-end p-4">
           <button onClick={() => setVisible(false)} className="text-black text-xl font-bold">X</button>
         </div>
         <ul className="flex flex-col gap-5 p-5 text-lg">
           <NavLink to="/" onClick={() => setVisible(false)} >HOME</NavLink>
           <NavLink to="/colllection" onClick={() => setVisible(false)} >COLLECTION  </NavLink>
           <NavLink to="/about" onClick={() => setVisible(false)}>ABOUT</NavLink>
           <NavLink to="/contact" onClick={() => setVisible(false)}>CONTACT</NavLink>
         </ul>
       </div>

     </div>
   );
};

export default Navbar;
