import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Colllection from "./pages/Colllection";
import Productt from "./pages/Productt";
import Cartx from "./pages/Cartx";
import Contact from "./pages/Contact";
import Placeorder from "./pages/Placeorder";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
console.log("✅ Backend URL:", backendUrl);
export const currency = "$";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colllection" element={<Colllection />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Productt />} />
        <Route path="/cart" element={<Cartx />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
