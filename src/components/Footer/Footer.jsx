import React from "react";
import { Link } from "react-router-dom";
import { GiMountains } from "react-icons/gi";
import { FaInstagramSquare, FaFacebook, FaTelegram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-800 text-black shadow-2xl">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <GiMountains className="text-4xl " />
            <span className="text-3xl font-bold  ml-1">ViVu3Mien</span>
            <p className="mt-2 text-gray-900">
              Trải nghiệm những chuyến đi tuyệt vời nhất cùng VietVoyageHub.
              Khám phá và tận hưởng!
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-6">Khám Phá</h5>
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
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-6">Theo Dõi Chúng Tôi</h5>
            <div className="flex mb-4">
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
            <h5 className="uppercase font-bold mb-4">Nhận Tin Tức Mới</h5>
            <div className="flex mt-2">
              <input
                type="text"
                className="p-2 rounded-l-md focus:outline-none focus:ring-2 border border-blue-400 focus:ring-blue-700"
                placeholder="Email của bạn"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-700">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-700 text-center py-3">
        <p className="text-white">
          Copyright @ 2024 - Bản quyền thuộc về VietVoyageHub
        </p>
      </div>
    </footer>
  );
};

export default Footer;
