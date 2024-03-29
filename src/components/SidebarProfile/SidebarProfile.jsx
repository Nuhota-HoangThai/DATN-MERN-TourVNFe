import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlide";

const SidebarProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  return (
    <div className="mt-24 flex  w-full max-w-xs flex-col rounded-2xl bg-white p-4 shadow-2xl ">
      <div className="pt-24">
        <Link
          to={`/profile`}
          className="block rounded-lg p-3 transition-colors hover:bg-slate-200"
        >
          <div className="flex items-center space-x-2">
            <p>Thông tin cá nhân</p>
          </div>
        </Link>

        <Link
          to={"/userOrder"}
          className="block rounded-lg p-3 transition-colors hover:bg-slate-200"
        >
          <div className="flex items-center space-x-2">
            <p>Lịch sử đặt tour</p>
          </div>
        </Link>

        <Link
          to={`/cart`}
          className="block rounded-lg p-3 transition-colors hover:bg-slate-200"
        >
          <div className="flex items-center space-x-2">
            <p>So sánh tour</p>
          </div>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-200"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default SidebarProfile;
