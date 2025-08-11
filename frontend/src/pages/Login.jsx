import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const initialState = {
  email: "",
  password: ""
};

function Login() {
  const navigate = useNavigate();
  const [isShowPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [error, setError] = useState(""); // ✅ Error state
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email or password is missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, form, {
        withCredentials: true
      });
      setForm(initialState);
      dispatch(setUserData(res.data))
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-slate-200">
      <div className="flex flex-col gap-[30px] w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg">
        <div className="flex items-center justify-center shadow-gray-400 shadow-lg w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]">
          <h2 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">ChatGo</span>
          </h2>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center gap-[20px]"
        >
          {/* ✅ Show error if exists */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <input
            className="w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setError(""); // Clear error on typing
            }}
          />

          <div className="relative w-[90%] h-[50px]">
            <input
              className="w-full h-full outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setError(""); // Clear error on typing
              }}
            />
            <span
              onClick={() => setShowPassword(!isShowPassword)}
              className="cursor-pointer absolute top-[10px] right-[20px] text-[15px] font-semibold text-blue-400"
            >
              {isShowPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-[15px] bg-[#20c7ff] rounded-2xl text-[18px] w-[200px] mt-[20px] font-semibold shadow-lg shadow-gray-400 hover:shadow-inner disabled:opacity-60`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer font-bold text-blue-400"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
