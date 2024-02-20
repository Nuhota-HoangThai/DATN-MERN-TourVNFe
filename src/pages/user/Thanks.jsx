import React from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center">
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-xl">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-600 mb-4">
          Cảm ơn bạn đã đặt tour!
        </h2>
        <p className="text-md md:text-lg text-gray-600 text-center mb-6">
          Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư của bạn.
        </p>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
            alt="Thank you"
            className="w-40 h-40 md:w-48 md:h-48"
          />
        </div>
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold text-sm md:text-md hover:bg-blue-700 transition-colors"
          >
            Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
