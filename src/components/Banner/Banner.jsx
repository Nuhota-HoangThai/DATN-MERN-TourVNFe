import React from "react";

import "./banner.css";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[400px] md:h-[500px] text-white flex items-center justify-center  mx-24 rounded-3xl mb-5"
      style={{
        backgroundImage:
          "url('https://thamhiemmekong.com/wp-content/uploads/2019/11/canh-dong-ta-pa-an-giang-1.jpg')",
      }}
    >
      <div className="absolute  bg-black bg-opacity-0 rounded-3xl ">
        <div className="py-[16%] ">
          <h1 className="text-3xl font-bold text-white text-center font">
            Hành trình mới, kỷ niệm mới
          </h1>
          <p className="font-bold text-5xl py-3 text-blue-950 text-center">
            <span className="text-white text-3xl font">cùng </span>ViVu 3 Miền
          </p>
          <h1 className="text-3xl  font-bold text-white font text-center">
            khám phá Việt Nam.
          </h1>
          <div className="pt-6  text-center ">
            <button className="shadow-2xl text-white  rounded-xl px-3 py-2 font-semibold font bg-gradient-to-r from-blue-800 to-blue-950">
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
