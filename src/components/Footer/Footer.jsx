import {} from "react";
import { Link } from "react-router-dom";
import { FaInstagramSquare, FaFacebook, FaTelegram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import logoViVu3Mien from "../../assets/img/logoViVu3Mien.jpg";

const Footer = () => {
  return (
    <footer className="border-t-2 border-sky-500 bg-white text-gray-700 shadow">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div>
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
            <p className="mt-4 text-gray-600">
              Trải nghiệm những chuyến đi tuyệt vời nhất cùng ViVu3Mien. Khám
              phá và tận hưởng!
            </p>
          </div>
          <div>
            <h5 className="text-xl font-semibold uppercase">Khám Phá</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/company"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Công ty
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/offices"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Văn phòng
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold uppercase">Dịch Vụ</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/booking"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Đặt Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/custom-tour"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Tour Theo Yêu Cầu
                </Link>
              </li>
              <li>
                <Link
                  to="/insurance"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Bảo Hiểm Du Lịch
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="transition-colors duration-300 hover:text-blue-500"
                >
                  Hỗ Trợ Khách Hàng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-semibold uppercase">
              Theo Dõi Chúng Tôi
            </h5>
            <div className="mt-4 flex space-x-4">
              <Link
                to="/instagram"
                className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
              >
                <FaInstagramSquare className="text-2xl" />
              </Link>
              <Link
                to="/facebook"
                className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link
                to="/zalo"
                className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
              >
                <SiZalo className="text-2xl" />
              </Link>
              <Link
                to="/telegram"
                className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
              >
                <FaTelegram className="text-2xl" />
              </Link>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-semibold uppercase">
              Nhận Tin Tức Mới
            </h5>
            <div className="mt-4 flex">
              <input
                type="text"
                className="flex-1 rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email của bạn"
              />
              <button className="rounded-r-md bg-blue-500 px-4 text-white transition-colors duration-300 hover:bg-blue-600">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-sky-100 py-4">
        <p className="text-center ">
          Copyright @ 2024 - Bản quyền thuộc về ViVu3Mien
        </p>
      </div>
    </footer>
  );
};

export default Footer;
