import React from "react";
import "./Banner.css"; // Đảm bảo bạn đã tạo file CSS này
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px] md:h-[600px] text-white flex items-center justify-center mb-8"
      style={{
        backgroundImage:
          "url('https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2017/10/26015647/dich-vu-thiet-ke-banner-du-lich-chuyen-nghiep-tai-ha-noi4.jpg')",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"></div>
    </div>
  );
};

export default Banner;
