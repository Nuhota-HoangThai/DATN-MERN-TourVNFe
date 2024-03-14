import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, formData);
      const { token } = response.data;

      // Lưu trữ token vào localStorage và chuyển hướng người dùng
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, token);
      navigate("/");
    } catch (error) {
      setLoginError("Đăng nhập thất bại: Email hoặc mật khẩu không đúng.");
      console.error("Lỗi đăng nhập", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-red-700">ĐĂNG NHẬP</h1>{" "}
        {loginError && <div className="mb-4 text-red-500">{loginError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 transition duration-200 focus:border-red-500 focus:ring focus:ring-red-200" // Adjusted colors for better contrast
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
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 transition duration-200 focus:border-red-500 focus:ring focus:ring-red-200" // Adjusted colors for better contrast
            />
          </div>

          <div className="mb-4 flex items-center text-gray-800">
            <input
              type="checkbox"
              name=""
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe" className="pl-2">
              Lưu đăng nhập
            </label>
          </div>
          <div className="mb-4 flex justify-between text-gray-800">
            <p>Chưa có tài khoản?</p>
            <Link to="/register" className="underline hover:text-gray-500">
              Đăng ký
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-red-700 p-2 text-white transition duration-200 hover:bg-red-600 focus:border-red-500 focus:outline-none focus:ring" // Adjusted button colors
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
