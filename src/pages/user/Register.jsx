import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

import "../styles/register.css";
import LoginGoogle from "../../components/LoginGG/LoginGoogle";

import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cccd: "",
    sex: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, cccd, sex, phone, dob, password, confirmPassword } =
      formData;

    // Check if all fields are filled
    if (
      !name ||
      !email ||
      !cccd ||
      !sex ||
      !phone ||
      !dob ||
      !password ||
      !confirmPassword
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Validate email pattern (basic example)
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Địa chỉ email không hợp lệ.");
      return;
    }

    // Check password length and special character
    if (
      password.length < 8 ||
      !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
    ) {
      alert(
        "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một ký tự đặc biệt.",
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // All validations passed
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/user/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }

      setLoading(false);
      setError(null);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="form-container w-full max-w-2xl rounded-xl bg-white px-4 py-2 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">Đăng Ký</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="cccd"
                className="block text-sm font-medium text-gray-700"
              >
                Căn cước công dân
              </label>
              <input
                type="number"
                placeholder="Căn cước công dân"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="cccd"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Giới tính
              </label>
              <input
                type="text"
                placeholder="Giới tính"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="sex"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="phone"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                placeholder="Ngày sinh"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="dob"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
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
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="confirmPassword"
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
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        <LoginGoogle />
        <div className="mt-6 text-center text-sm">
          <p>Đã có tài khoản?</p>
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng nhập
          </Link>
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

export default Register;
