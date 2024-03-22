const NewsLetter = () => {
  return (
    <div className="my-12 flex flex-col  items-center justify-center rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 p-8 md:mx-24 md:h-64">
      <div className="text-center text-white">
        <h1 className="mb-4 text-xl font-semibold md:text-2xl">
          Đăng ký Email để nhận ưu đãi và tin tức mới nhất!
        </h1>
        <p className="mb-6 text-sm md:text-base">
          Hãy là người đầu tiên biết về các chương trình khuyến mãi và sản phẩm
          mới của chúng tôi.
        </p>
      </div>

      <div className="flex w-full flex-col items-center md:w-auto md:flex-row">
        <input
          type="email"
          placeholder="Nhập Email của bạn"
          className="mb-4 w-full rounded-full border-2 border-gray-200 px-4 py-2 text-black shadow-xl md:mb-0 md:mr-4 md:w-96"
        />
        <button className="w-full rounded-full border-gray-200 bg-white px-6 py-2 font-semibold text-cyan-900 shadow-xl md:w-auto">
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
