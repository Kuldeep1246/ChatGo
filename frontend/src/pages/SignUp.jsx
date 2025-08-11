import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main"; // Make sure serverUrl is defined correctly
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const initialState = {
  username: "",
  email: "",
  password: ""
};

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isShowPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false); // optional loading state

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/auth/signup`, formData, {withCredentials:true});

      dispatch(setUserData(res.data))
      alert("Account created successfully!");
      setFormData(initialState);
      navigate("/profile");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-slate-200">
      <div className="flex flex-col gap-[30px] w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg">
        <div className="flex items-center justify-center shadow-gray-400 shadow-lg w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]">
          <h2 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">ChatGo</span>
          </h2>
        </div>

        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col items-center gap-[20px]"
        >
          <input
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
            type="text"
            placeholder="Username"
          />
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
            type="email"
            placeholder="Email"
          />
          <div className="relative w-[90%] h-[50px]">
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full h-full outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
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
            className="p-[15px] bg-[#20c7ff] rounded-2xl text-[18px] w-[200px] mt-[20px] font-semibold hover:shadow-inner shadow-gray-400 shadow-lg disabled:opacity-60"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-bold text-blue-400"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
