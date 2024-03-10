import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TourContext } from "../../context/TourContext";

const SidebarProfile = () => {
  const { logout, getTotalCartItems } = useContext(TourContext);
  return (
    <div className="mt-4  pt-24 h-[100vh] bg-gray-100 pl-16 font-bold">
      <Link to={"/profile"} className="no-underline">
        <div className="flex items-center my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
          <p className="pl-2">Thông tin cá nhân </p>
        </div>
      </Link>

      <Link to={"/userOrder"} className="no-underline">
        <div className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
          <p className="pl-2">Lịch sử đặt tour</p>
        </div>
      </Link>
      <Link
        to="/cart"
        className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100"
      >
        <p className="pl-2">So sánh</p>
        <div className="flex ml-2  px-1.5  ">({getTotalCartItems()})</div>
      </Link>
      <div className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100">
        <button className="pl-2" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
