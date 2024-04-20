import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlide";
import axios from "axios";

import { toast } from "react-toastify";

import LoginGoogle from "../../components/LoginGG/LoginGoogle";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPassword = async () => {
    try {
      // Ensure there's an email to send the reset link to
      if (!formData.email) {
        toast("Vui lòng nhập địa chỉ email của bạn.");
        return;
      }
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
        email: formData.email,
      });
      toast(response.data.message); // Assuming your backend sends back a message
    } catch (error) {
      toast("Error sending reset email");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const { data } = await axios.post(`${BASE_URL}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.error));
        toast(data.error);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="form-container w-full max-w-md rounded-xl bg-white px-8 py-10 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Đăng nhập
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none"
            id="email"
            onChange={handleChange}
          />
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="show-hide-button"
            >
              {showPassword ? (
                <FaEyeSlash size={"20px"} />
              ) : (
                <IoEyeSharp size={"20px"} />
              )}
            </button>
          </div>{" "}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="underline"
          >
            Quên mật khẩu?
          </button>
          <button
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
          >
            {loading ? "Đang tải..." : "Đăng nhập"}
          </button>
        </form>
        <LoginGoogle />
        <div className="mt-6 text-center">
          <p className="text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      {/* Thêm sóng ở đây */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};
export default Login;
