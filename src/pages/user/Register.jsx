import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, formData);
      setSuccessMessage("Bạn đã đăng ký thành công.");
      setTimeout(() => {
        navigate("/login");
      }, 4000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error during registration:", error.response.data);
    }
  };

  // chap nhan dieu khoan nguoi dung
  const handleTermsChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-red-700">ĐĂNG KÝ</h1>
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Họ tên"
              onChange={changeHandler}
              value={formData.name}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              onChange={changeHandler}
              value={formData.phone}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={changeHandler}
              value={formData.password}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name=""
              id=""
              checked={acceptedTerms}
              onChange={handleTermsChange}
            />
            <p className="pl-2">Chấp nhận điều khoản người dùng.</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p>Đã có tài khoản </p>{" "}
            <Link to="/login" className="text-indigo-900 underline">
              Đăng nhập
            </Link>
          </div>
          <button
            type="submit"
            disabled={!acceptedTerms}
            className="w-full rounded-md bg-red-700 p-2 text-white hover:bg-red-600 focus:border-blue-300 focus:outline-none focus:ring"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
