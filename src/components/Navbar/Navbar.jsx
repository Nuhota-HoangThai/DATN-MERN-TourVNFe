import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { GiMountains } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth-token") !== null,
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("auth-token"));
    };

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

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
      <div className="fixed top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-24 py-4 shadow-lg shadow-gray-500/50 ">
        <Link to="/">
          <div className="group flex items-center gap-1  font-bold">
            <GiMountains className="transform text-4xl text-blue-950 transition duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-3xl shadow-2xl transition duration-300 ease-in-out group-hover:text-blue-900 group-hover:shadow-lg">
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
          className={`absolute right-0 top-14 w-full rounded-full text-center text-black transition-transform duration-300  md:relative md:right-auto md:top-auto md:w-auto md:p-2 md:pl-10 ${
            isMenuOpen ? "block" : "hidden"
          } gap-9 font-semibold text-black md:flex `}
        >
          <li
            tabIndex="0"
            onClick={() => {
              setMenu("tour");
            }}
          >
            <Link to="/">Du lịch</Link>
            {menu === "tour" ? (
              <hr className="mx-auto w-2/3 border-b-2 border-red-700" />
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
              <hr className="mx-auto w-2/3 border-b-2 border-red-700" />
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
              <hr className="mx-auto w-2/3 border-b-2 border-red-700" />
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
              <hr className="mx-auto w-2/3 border-b-2 border-red-700" />
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
        <div className="hidden items-center font-semibold md:flex">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className=" w-32 rounded-full border border-black px-4 py-2 text-center  hover:bg-blue-900 hover:text-white"
            >
              Tài khoản
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
