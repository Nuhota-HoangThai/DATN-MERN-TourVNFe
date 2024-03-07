import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TourContext } from "../../context/TourContext";

import { ImProfile } from "react-icons/im";
import { CgUserAdd } from "react-icons/cg";

const SidebarProfile = () => {
  const { logout, getTotalCartItems } = useContext(TourContext);
  return (
    <div className="mt-4  pt-8 h-[100vh]  bg-white ">
      <Link to={"/profileUser"} className="no-underline">
        <div className="flex items-center my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
          <ImProfile />
          <p className="pl-2">Thông tin cá nhân </p>
        </div>
      </Link>

      <Link to={"/userOrder"} className="no-underline">
        <div className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
          <CgUserAdd />
          <p className="pl-2">Lịch sử đặt tour</p>
        </div>
      </Link>
      <Link
        to="/cart"
        className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100"
      >
        So sánh
        <div className="flex ml-2  text-white border rounded-full px-1.5 border-red-700 bg-red-700">
          {getTotalCartItems()}
        </div>
      </Link>
      <div className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100">
        <button className="" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
