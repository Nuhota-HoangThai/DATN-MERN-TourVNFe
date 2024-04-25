import { Link } from "react-router-dom";
import "./navbar.css";
import logoViVu3Mien from "../../assets/img/logoViVu3Mien.jpg";
import { useSelector } from "react-redux";

import SearchNav from "./SearchNav";
import { useState } from "react";
import { BASE_URL } from "../../utils/config";

import icon from "../../assets/img/logoicon.png";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="top-0 flex w-full bg-white shadow-md">
        {/* Main row containing logo, navigation, and user info */}
        <div className="flex w-full items-center px-10 py-3">
          {/* Left side: Logo and hamburger menu */}
          <div className="flex items-center justify-between">
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
            <button className="ml-10 text-xl md:hidden" onClick={toggleMenu}>
              &#9776;
            </button>
          </div>
          {/* Center section: Navigation links and right section: user info/search - only visible on md screens and up */}
          <div className="hidden flex-grow items-center justify-between md:flex">
            <ul className="flex flex-grow justify-center gap-10 text-[17px] font-semibold">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="group relative">
                <Link to="/tours" className="flex items-center gap-1">
                  Tour du lịch
                </Link>
                <div className="absolute left-0 top-full hidden w-48 bg-white py-4 group-hover:block">
                  <Link to="/mn" className="block px-4 py-2 hover:bg-slate-100">
                    Tour miền Nam
                  </Link>
                  <Link to="/mt" className="block px-4 py-2 hover:bg-slate-100">
                    Tour miền Trung
                  </Link>
                  <Link to="/mb" className="block px-4 py-2 hover:bg-slate-100">
                    Tour miền Bắc
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/blog">Tin tức</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
              <li>
                <Link to="/about">Giới thiệu</Link>
              </li>
            </ul>
            <div className="flex items-center justify-start gap-10">
              <SearchNav />
              <div>
                {currentUser ? (
                  <Link
                    to={`/profile`}
                    className="text-sm font-semibold md:text-base"
                  >
                    {Array.isArray(currentUser.image) &&
                    currentUser.image.length > 0 ? (
                      <img
                        src={`${BASE_URL}/${currentUser.image[0].replace(/\\/g, "/")}`}
                        alt="currentUser"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : typeof currentUser.image === "string" ? (
                      <img
                        src={`${BASE_URL}/${currentUser.image.replace(/\\/g, "/")}`}
                        alt="currentUser"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <img
                        src={icon}
                        alt="Default"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-full border border-black px-3 py-2"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="absolute left-0 top-full z-10 flex w-full flex-col items-center justify-center bg-white md:hidden">
            <ul className="w-full">
              <li>
                <Link
                  to="/"
                  className="block border-b py-2 text-center"
                  onClick={toggleMenu}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className="block border-b py-2 text-center"
                  onClick={toggleMenu}
                >
                  Tour du lịch
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="block border-b py-2 text-center"
                  onClick={toggleMenu}
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block border-b py-2 text-center"
                  onClick={toggleMenu}
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 text-center"
                  onClick={toggleMenu}
                >
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
