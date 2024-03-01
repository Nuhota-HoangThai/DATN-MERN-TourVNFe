import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200  md:mx-24 rounded-lg flex flex-col items-center justify-center p-8 md:h-64 mb-4">
      <div className="text-center text-white">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          Đăng ký Email để nhận ưu đãi và tin tức mới nhất!
        </h1>
        <p className="mb-6 text-sm md:text-base">
          Hãy là người đầu tiên biết về các chương trình khuyến mãi và sản phẩm
          mới của chúng tôi.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
        <input
          type="email"
          placeholder="Nhập Email của bạn"
          className="w-full md:w-96 py-2 px-4 rounded-full border-2 border-gray-200 shadow-xl text-black mb-4 md:mb-0 md:mr-4"
        />
        <button className="w-full md:w-auto py-2 px-6 bg-white border-gray-200 shadow-xl text-cyan-900 rounded-full font-semibold">
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
