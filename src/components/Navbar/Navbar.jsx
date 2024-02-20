import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { SiYourtraveldottv } from "react-icons/si";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

import { TourContext } from "../../context/TourContext";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(TourContext);

  const location = useLocation(); // ẩn thẻ hr

  const { isLoggedIn, logout } = useContext(TourContext);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setMenu("tour");
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
      <div className="py-4 px-14 flex justify-between items-center bg-transparent shadow-lg shadow-gray-500/50">
        <Link to="/">
          <div className="flex items-center gap-1 font-bold text-red-500 group">
            <SiYourtraveldottv className="text-4xl transition duration-300 ease-in-out transform group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-3xl transition duration-300 ease-in-out shadow-2xl group-hover:text-red-400 group-hover:shadow-lg">
              VietVoyageHub
            </span>
          </div>
        </Link>
        <div className="md:hidden ">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes className="text-black" size={24} />
            ) : (
              <FaBars className="text-black" size={24} />
            )}
          </button>
        </div>
        <ul
          className={`absolute text-center text-black md:relative top-14 rounded-full right-0 md:top-auto md:right-auto bg-gradient-to-r from-gray-100 to-gray-200 w-full md:w-auto md:p-2 md:pl-10 transition-transform duration-300 ${
            isMenuOpen ? "block" : "hidden"
          } md:flex gap-9 font-semibold text-black `}
        >
          <li
            tabIndex="0"
            onClick={() => {
              setMenu("tour");
            }}
          >
            <Link to="/">Tour</Link>
            {menu === "tour" ? (
              <hr className="border-red-700 border-b-2 w-2/3 mx-auto" />
            ) : (
              <></>
            )}
          </li>
          <li
            tabIndex="0"
            onClick={() => {
              setMenu("mn");
            }}
          >
            <Link to="/mn">Miền Nam</Link>
            {menu === "mn" ? (
              <hr className="border-red-700 border-b-2 w-2/3 mx-auto" />
            ) : (
              <></>
            )}
          </li>
          <li
            tabIndex="0"
            onClick={() => {
              setMenu("mt");
            }}
          >
            <Link to="/mt">Miền Trung</Link>
            {menu === "mt" ? (
              <hr className="border-red-700 border-b-2 w-2/3 mx-auto" />
            ) : (
              <></>
            )}
          </li>
          <li
            tabIndex="0"
            onClick={() => {
              setMenu("mb");
            }}
          >
            <Link to="/mb"> Miền Bắc</Link>
            {menu === "mb" ? (
              <hr className="border-red-700 border-b-2 w-2/3 mx-auto" />
            ) : (
              <></>
            )}
          </li>
          <hr />
          {/* Responsive login/account and cart items */}
          {isLoggedIn ? (
            <li className="md:hidden">
              <Link to="/profile">Tài khoản</Link>
            </li>
          ) : (
            <li className="md:hidden">
              <Link to="/login">Đăng nhập</Link>
            </li>
          )}
          <li className="md:hidden flex justify-center py-5">
            <Link to="/cart">
              <MdOutlineShoppingCartCheckout className="text-3xl ml-5 text-black" />
            </Link>
            <div className="flex w-5 mb-5 mt-[-15px] ml-[-10px] text-white border rounded-full px-1.5 border-red-700 bg-red-700">
              {getTotalCartItems()}
            </div>
          </li>
        </ul>
        {/* Login and Cart for desktop view */}
        <div className="hidden md:flex items-center font-semibold">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className=" px-4 py-2 border rounded-full border-black  hover:bg-blue-700 hover:text-white"
            >
              Tài khoản
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border border-black rounded hover:bg-blue-700 hover:text-white"
            >
              Đăng nhập
            </Link>
          )}
          <Link to="/cart">
            <MdOutlineShoppingCartCheckout className="text-3xl ml-5 text-black" />
          </Link>
          <div className="flex mt-[-20px] ml-[-10px] text-white border rounded-full px-1.5 border-red-700 bg-red-700">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
      {/* Additional styles for the menu toggle */}
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
