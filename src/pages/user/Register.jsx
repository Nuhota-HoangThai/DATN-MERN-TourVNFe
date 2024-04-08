import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/user/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.success) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="mt-16 flex min-h-screen items-center justify-center bg-gray-50">
      <div className="form-container w-full max-w-2xl rounded-xl bg-white px-8 py-10 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Đăng Ký</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {" "}
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Căn cước công dân"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="cccd"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Giới tính"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="sex"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="phone"
              onChange={handleChange}
            />
            <input
              type="date"
              placeholder="Ngày sinh"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="dob"
              onChange={handleChange}
            />
          </div>
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="password"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="confirmPassword"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
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
