import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import logoViVu3Mien from "../../assets/img/logoViVu3Mien.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => setMenu(!menu);
  const toggleTourMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setMenu("home");
    } else if (path === "/tours") {
      setMenu("tours");
    } else if (path === "/mn") {
      setMenu("mn");
    } else if (path === "/mt") {
      setMenu("mt");
    } else if (path === "/mb") {
      setMenu("mb");
    } else {
      setMenu("");
    }
  }, [location.pathname]);

  return (
    <>
      <div className="fixed top-0 z-50  flex w-full items-center justify-between bg-white px-24 py-2 shadow-lg shadow-gray-500/50 ">
        <Link to="/" className=" group flex items-center gap-1 ">
          <img src={logoViVu3Mien} alt="" className="w-20" />
          <div>
            <div className="vivu3mien-logo text-2xl font-bold text-cyan-500">
              ViVu3Mien
            </div>
            <div className="text-sm font-medium italic text-orange-400">
              Phục vụ tận tâm
            </div>
          </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-black" size={24} />
            ) : (
              <FaBars className="text-black" size={24} />
            )}
          </button>
        </div>
        <ul
          className={` absolute right-0 top-14 w-full text-center text-lg transition-transform duration-300 md:relative md:right-auto md:top-auto md:w-auto md:p-2 md:pl-10 ${isMenuOpen ? "block" : "hidden"} gap-14 font-semibold text-black md:flex`}
        >
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li
            className="relative "
            onMouseEnter={toggleTourMenu}
            onMouseLeave={toggleTourMenu}
          >
            <Link to="/tours">Tours</Link>
            {isMenuOpen && (
              <div className="absolute left-1/2 top-full  w-48 -translate-x-1/2 transform rounded-md bg-white shadow-lg">
                <Link to="/mn" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="font-normal hover:font-semibold">
                    Tour miền Nam
                  </span>
                </Link>
                <Link to="/mt" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="font-normal hover:font-semibold">
                    Tour miền Trung
                  </span>
                </Link>
                <Link to="/mb" className="block px-4 py-2 hover:bg-gray-100">
                  <span className="font-normal hover:font-semibold">
                    Tour miền Bắc
                  </span>
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link to="/">Tin tức</Link>
          </li>
          <li>
            <Link to="/">Liên hệ</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
        </ul>
        <div className="hidden items-center md:flex">
          {currentUser ? (
            <Link to={`/profile`} className="text-center">
              <span className="font-semibold">
                <span>Xin chào: </span>
                {currentUser.name}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-32 rounded-full border border-black px-4 py-2 text-center hover:bg-blue-800 hover:text-white"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      <style>{`
  @media (min-width: 768px) {
    .hamburger-menu {
      display: none;
    }
  }
`}</style>
    </>
  );
};

export default Navbar;
