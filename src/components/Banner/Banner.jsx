import React from "react";

import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px] md:h-[600px] text-white flex items-center justify-center  mx-24 rounded-3xl mb-5"
      style={{
        backgroundImage:
          "url('https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2017/10/26015647/dich-vu-thiet-ke-banner-du-lich-chuyen-nghiep-tai-ha-noi4.jpg')",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 rounded-3xl">
        <div className="py-[16%] pl-56">
          <h1 className="text-3xl font-bold text-white font-mono">
            Khám phá Việt Nam cùng{" "}
          </h1>
          <p className="font-bold text-5xl pt-3 text-white">ViVu 3 Miền</p>
          <div className="pt-6">
            <button className="shadow-2xl text-white  rounded-xl px-3 py-2 font-semibold bg-gradient-to-r from-yellow-600 to-orange-600">
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
