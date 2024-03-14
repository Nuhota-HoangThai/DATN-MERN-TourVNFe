import {} from "react";
import { Link } from "react-router-dom";
import { GiMountains } from "react-icons/gi";
import { FaInstagramSquare, FaFacebook, FaTelegram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <footer className=" border-t-2 border-gray-800 bg-white text-black shadow-2xl">
      <div className="container mx-auto px-6 pb-6 pt-10">
        <div className="flex flex-wrap justify-between">
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <GiMountains className="text-4xl " />
            <span className="ml-1 text-3xl  font-bold">ViVu3Mien</span>
            <p className="mt-2 text-gray-900">
              Trải nghiệm những chuyến đi tuyệt vời nhất cùng ViVu3Mien. Khám
              phá và tận hưởng!
            </p>
          </div>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h5 className="mb-6 font-bold uppercase">Khám Phá</h5>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/company">Công ty</Link>
              </li>
              <li className="mb-2">
                <Link to="/tours">Tour</Link>
              </li>
              <li className="mb-2">
                <Link to="/offices">Văn phòng</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h5 className="mb-6 font-bold uppercase">Theo Dõi Chúng Tôi</h5>
            <div className="mb-4 flex">
              <Link to="/instagram" className=" mr-6 ">
                <FaInstagramSquare className="text-2xl" />
              </Link>
              <Link to="/facebook" className=" mr-6 ">
                <FaFacebook className="text-2xl" />
              </Link>
              <Link to="/zalo" className=" mr-6 ">
                <SiZalo className="text-2xl" />
              </Link>
              <Link to="/telegram" className=" ">
                <FaTelegram className="text-2xl" />
              </Link>
            </div>
            <h5 className="mb-4 font-bold uppercase">Nhận Tin Tức Mới</h5>
            <div className="mt-2 flex">
              <input
                type="text"
                className="rounded-l-md border border-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                placeholder="Email của bạn"
              />
              <button className="rounded-r-md bg-blue-500 px-4 text-white hover:bg-blue-700">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-700 py-3 text-center">
        <p className="text-white">
          Copyright @ 2024 - Bản quyền thuộc về VietVoyageHub
        </p>
      </div>
    </footer>
  );
};

export default Footer;
