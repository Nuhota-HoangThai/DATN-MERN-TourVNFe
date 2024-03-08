import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { GiMountains } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { TourContext } from "../../context/TourContext";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

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
      {/* fixed top-0 z-50 */}
      <div className="fixed top-0 z-50 w-full py-4 px-24 flex justify-between items-center shadow-lg shadow-gray-500/50 mb-5 bg-white ">
        <Link to="/">
          <div className="flex items-center gap-1 font-bold  group">
            <GiMountains className="text-blue-950 text-4xl transition duration-300 ease-in-out transform group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-3xl transition duration-300 ease-in-out shadow-2xl group-hover:text-blue-900 group-hover:shadow-lg">
              ViVu3Mien
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
          className={`absolute text-center text-black md:relative top-14 rounded-full right-0 md:top-auto md:right-auto  w-full md:w-auto md:p-2 md:pl-10 transition-transform duration-300 ${
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
          {isLoggedIn ? (
            <li className="md:hidden">
              <Link to="/profile">Tài khoản</Link>
            </li>
          ) : (
            <li className="md:hidden">
              <Link to="/login">Đăng nhập</Link>
            </li>
          )}
        </ul>
        <div className="hidden md:flex items-center font-semibold">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className=" px-4 w-32 text-center py-2 border rounded-full border-black  hover:bg-blue-900 hover:text-white"
            >
              Tài khoản
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 w-32 text-center border border-black rounded-full hover:bg-blue-800 hover:text-white"
            >
              Đăng nhập
            </Link>
          )}
          {/* <Link
            to="/cart"
            className="border ml-3 w-32 px-4 py-2 flex justify-center items-center rounded-full border-black hover:bg-blue-900 hover:text-white"
          >
            So sánh
            <div className="flex ml-2  text-white border rounded-full px-1.5 border-red-700 bg-red-700">
              {getTotalCartItems()}
            </div>
          </Link> */}
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
