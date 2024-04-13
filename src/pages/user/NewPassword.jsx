// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/config";
// import { useNavigate, useParams } from "react-router-dom";

// const NewPassword = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [passwords, setPasswords] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPasswords((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     //console.log(passwords);
//     e.preventDefault();
//     if (passwords.password !== passwords.confirmPassword) {
//       setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/user/login/reset-password/${userId}`,
//         passwords,
//       );

//       if (response.status === 200) {
//         setSuccess("Mật khẩu đã được cập nhật thành công.");
//         setPasswords({ password: "", confirmPassword: "" });
//         navigate("/login");
//       }
//     } catch (err) {
//       setError(err.response?.data || "Có lỗi xảy ra khi cập nhật mật khẩu.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Tạo Mật Khẩu Mới
//         </h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-500">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Mật khẩu mới
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               required
//               className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               value={passwords.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Xác nhận mật khẩu mới
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               id="confirmPassword"
//               required
//               className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               value={passwords.confirmPassword}
//               onChange={handleChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Tạo mật khẩu
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewPassword;

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const { token } = useParams(); // Lấy token từ URL thay vì userId
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/user/login/reset-password/${token}`, // Gửi token trong URL
        passwords, // Không cần gửi confirmPassword lên server
      );

      if (response.status === 200) {
        setSuccess("Mật khẩu đã được cập nhật thành công.");
        setPasswords({ password: "", confirmPassword: "" });
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Tạo Mật Khẩu Mới
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={passwords.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tạo mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
