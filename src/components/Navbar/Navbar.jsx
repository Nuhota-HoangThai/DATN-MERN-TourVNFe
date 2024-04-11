import { Link } from "react-router-dom";
import "./navbar.css";
import logoViVu3Mien from "../../assets/img/logoViVu3Mien.jpg";
import { useSelector } from "react-redux";

import SearchNav from "./SearchNav";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="top-0 w-full bg-white shadow-md">
        {/* Hàng đầu tiên: Logo, tìm kiếm, thông tin người dùng */}
        <div className="flex items-center justify-between px-10">
          <div className="flex items-center justify-between gap-10  py-1">
            {/* Logo */}
            <div className="vivu3mien-logo">
              <Link to="/" className="flex items-center gap-1">
                <img src={logoViVu3Mien} alt="Logo" className="w-8 md:w-16" />
                <div>
                  <div className="text-xl font-bold text-cyan-500 md:text-xl">
                    VIVU3Mien
                  </div>
                  <div className="text-xs font-medium italic text-orange-400 md:text-sm">
                    Phục vụ tận tâm
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <ul className="flex items-center justify-center gap-10 font-medium ">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="group relative">
                  <Link to="/tours" className="flex items-center gap-1">
                    Tour du lịch
                  </Link>
                  {/* Submenu */}
                  <div className=" absolute left-0 top-full hidden w-48 bg-white py-4 group-hover:block">
                    <div className="px-4 py-2 hover:bg-slate-100">
                      <Link to="/mn" className="">
                        Tour miền Nam
                      </Link>
                    </div>
                    <div className="px-4 py-2 hover:bg-slate-100">
                      <Link to="/mt" className="">
                        Tour miền Trung
                      </Link>
                    </div>
                    <div className="px-4 py-2 hover:bg-slate-100">
                      <Link to="/mb" className="">
                        Tour miền Bắc
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/">Tin tức</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ</Link>
                </li>
                <li>
                  <Link to="/about">Giới thiệu</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Thanh tìm kiếm và thông tin người dùng trên desktop */}
          <div className="w-1/5">
            <SearchNav />
          </div>
          <div>
            {currentUser ? (
              <Link
                to={`/profile`}
                className="text-sm font-semibold md:text-base"
              >
                Xin chào: {currentUser.name || currentUser.email}
              </Link>
            ) : (
              <Link
                to="/login"
                className="w-32 rounded-full border border-black px-4 py-2 text-center text-sm transition-colors hover:bg-blue-800 hover:text-white md:text-base"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* Hàng thứ hai: Menu */}
      </div>
    </>
  );
};

export default Navbar;
