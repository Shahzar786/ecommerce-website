import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Input Handler
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Login Submit Handler
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/admin`, data);

      if (res.data.success) {
        // ✅ Store Token
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        toast.success("✅ Login Successful! Welcome Admin.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(res.data.message || "Unauthorized Access!", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Enter Admin Email"
          className="border w-full mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          placeholder="Enter Admin Password"
          className="border w-full mb-6 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Only authorized admin can access the dashboard.
        </p>
      </form>
    </div>
  );
};

export default Login;
