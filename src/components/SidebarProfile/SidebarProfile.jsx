import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlide";
import {
  FaUser,
  FaShoppingCart,
  FaStar,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

import { FaHeart } from "react-icons/fa6";

const SidebarProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full max-w-xs flex-col bg-white p-4 shadow-xl">
      <div className="mt-10 flex-1 space-y-2">
        <Link
          to="/profile"
          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-slate-100"
        >
          <FaUser className="text-lg" />
          <span>Thông tin cá nhân</span>
        </Link>

        <Link
          to="/userOrder"
          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-slate-100"
        >
          <FaHistory className="text-lg" />
          <span>Lịch sử đặt tour</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-slate-100"
        >
          <FaShoppingCart className="text-lg" />
          <span>So sánh tour</span>
        </Link>

        <Link
          to="/favorites"
          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-slate-100"
        >
          <FaHeart className="text-lg" />
          <span>Tour yêu thích</span>
        </Link>

        <Link
          to="/reviewUser"
          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-slate-100"
        >
          <FaStar className="text-lg" />
          <span>Đánh giá của bạn</span>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 flex w-full items-center space-x-3 rounded-lg bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default SidebarProfile;
