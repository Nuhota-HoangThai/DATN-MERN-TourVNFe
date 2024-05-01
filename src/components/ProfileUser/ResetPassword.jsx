import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

function ResetPasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!token) {
      setMessage("Bạn cần đăng nhập để thực hiện thao tác này.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/reset/password`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data.error || "Có lỗi xảy ra khi gửi yêu cầu.",
      );
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white px-4 py-8 shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Đặt Lại Mật Khẩu
      </h2>
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">
            Mật khẩu cũ:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Mật khẩu mới:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Xác nhận mật khẩu mới:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-bold text-white shadow hover:bg-indigo-700"
        >
          Đặt lại mật khẩu
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}

export default ResetPasswordForm;
