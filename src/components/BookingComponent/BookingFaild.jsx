import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="payment-failure mx-auto mt-20 max-w-lg rounded-lg bg-red-100 p-5 text-center shadow-md">
      <h1 className="text-xl font-bold text-red-600">Thanh toán thất bại</h1>
      <p className="my-4 text-gray-700">
        Quá trình thanh toán không thành công.
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => navigate("/")}
        >
          Trở về Trang chủ
        </button>
      </div>
    </div>
  );
}

export default PaymentFailure;
