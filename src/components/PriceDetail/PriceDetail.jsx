const TourPriceDetail = ({ tour }) => {
  return (
    <div className="mt-16 w-1/2">
      <h2 className="mb-4 text-center text-2xl font-bold">Chi Tiết Giá</h2>
      <div className="rounded-xl bg-white p-4 shadow-md md:max-w-2xl">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700">
            Người lớn (lớn hơn 12 tuổi):
            <span className="font-semibold">
              {tour.price.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <p className="text-gray-700">
            Trẻ em (2-12 tuổi):{" "}
            <span className="font-semibold">
              {tour.priceForChildren.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <p className="text-gray-700">
            Trẻ em (dưới 2 tuổi):{" "}
            <span className="font-semibold">
              {tour.priceForInfants.toLocaleString("vi-VN")}₫
            </span>
          </p>
          <p className="text-gray-700">
            Phí phụ thu (phòng đơn):
            {tour.additionalFees.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourPriceDetail;
