import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarProfile = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");

    navigate("/login");
  };

  return (
    <div className="mt-4  h-[100vh] bg-gray-100 pl-16 pt-24 font-bold">
      <Link to={"/profile"} className="no-underline">
        <div className="mx-5 my-3 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
          <p className="pl-2">Thông tin cá nhân </p>
        </div>
      </Link>

      <Link to={"/userOrder"} className="no-underline">
        <div className="mx-5 my-3  flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
          <p className="pl-2">Lịch sử đặt tour</p>
        </div>
      </Link>

      <Link to={"/cart"} className="no-underline">
        <div className="mx-5 my-3  flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
          <p className="pl-2">So sánh tour</p>
        </div>
      </Link>

      <div className="mx-5 my-3  flex items-center rounded-lg bg-slate-100 py-2 pl-8">
        <button className="pl-2" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
