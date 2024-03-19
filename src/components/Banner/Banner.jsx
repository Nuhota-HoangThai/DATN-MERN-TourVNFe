import {} from "react";

import "./banner.css";

const Banner = () => {
  return (
    <div
      className="relative mx-24 mb-5 mt-28 flex h-[600px] items-center justify-center rounded-3xl bg-cover  bg-center text-white "
      style={{
        backgroundImage:
          "url('https://thamhiemmekong.com/wp-content/uploads/2019/11/canh-dong-ta-pa-an-giang-1.jpg')",
      }}
    >
      <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
        <div className="py-[16%] ">
          <h1 className="font text-center text-3xl font-bold text-white">
            Hành trình mới, kỷ niệm mới
          </h1>
          <p className="py-3 text-center text-5xl font-bold text-blue-950">
            <span className="font text-3xl text-white">cùng </span>ViVu 3 Miền
          </p>
          <h1 className="font  text-center text-3xl font-bold text-white">
            khám phá Việt Nam.
          </h1>
          <div className="pt-6  text-center ">
            <button className="font rounded-xl  bg-gradient-to-r from-blue-800 to-blue-950 px-3 py-2 font-semibold text-white shadow-2xl">
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
