import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarProfile = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");

    navigate("/login");
  };

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

      <Link to={"/comparison"} className="no-underline">
        <div className="flex items-center  my-3 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
          <p className="pl-2">So sánh tour</p>
        </div>
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
