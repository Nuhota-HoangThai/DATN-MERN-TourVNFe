import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { GiMountains } from "react-icons/gi";
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
      {/* fixed top-0 z-50 */}
      <div className="fixed top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-24 py-4 shadow-lg shadow-gray-500/50 ">
        <Link to="/">
          <div className="group flex items-center gap-1 font-bold">
            <GiMountains className="text-4xl text-blue-950" />
            <span className="text-3xl shadow-2xl">ViVu3Mien</span>
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
          className={`absolute right-0 top-14 w-full text-center transition-transform duration-300 md:relative md:right-auto md:top-auto md:w-auto md:p-2 md:pl-10 ${isMenuOpen ? "block" : "hidden"} gap-14 font-semibold text-black md:flex`}
        >
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li
            className="relative"
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
            <Link to="/">Giới thiệu</Link>
          </li>
        </ul>
        <div className="hidden items-center md:flex">
          {currentUser ? (
            <Link to={`/profile`} className="text-center">
              <span className="font-semibold">{currentUser.name}</span>
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
