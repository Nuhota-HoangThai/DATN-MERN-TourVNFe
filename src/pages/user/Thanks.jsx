import {} from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <div className="rounded-lg bg-white p-6 shadow-xl md:p-12">
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-600 md:text-4xl">
          Cảm ơn bạn đã đặt tour!
        </h2>
        <p className="text-md mb-6 text-center text-gray-600 md:text-lg">
          Khi đơn hàng được xác nhận sẽ gửi thông tin qua email của bạn.
        </p>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
            alt="Thank you"
            className="h-40 w-40 md:h-48 md:w-48"
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="md:text-md inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
