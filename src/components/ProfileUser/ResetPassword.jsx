import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "./reset-password.css";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!token) {
      setMessage("Bạn cần đăng nhập để thực hiện thao tác này");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/user/reset/password`,
        { oldPassword, newPassword, confirmNewPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage(response.data.message);
      toast("Thay đổi mật khẩu thành công");
    } catch (error) {
      toast("Thay đổi mật khẩu thất bại");
      setMessage(
        error.response?.data.error || "Có lỗi xảy ra khi gửi yêu cầu.",
      );
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white px-4 py-8 shadow-md">
      <h2 className="mb-6 text-center text-lg font-semibold text-gray-800">
        Đặt Lại Mật Khẩu
      </h2>
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div className="input-group">
          <label className="block font-medium text-gray-700">Mật khẩu cũ</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="button-icon"
            >
              {showPassword ? (
                <FaEyeSlash size={"20px"} />
              ) : (
                <IoEyeSharp size={"20px"} />
              )}
            </button>
          </div>
        </div>
        <div className="input-group">
          <label className="block font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="button-icon"
            >
              {showPassword ? (
                <FaEyeSlash size={"20px"} />
              ) : (
                <IoEyeSharp size={"20px"} />
              )}
            </button>
          </div>
        </div>
        <div className="input-group">
          <label className="block font-medium text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="button-icon"
            >
              {showPassword ? (
                <FaEyeSlash size={"20px"} />
              ) : (
                <IoEyeSharp size={"20px"} />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-bold text-white shadow hover:bg-indigo-700"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
