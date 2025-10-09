import React from "react";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
