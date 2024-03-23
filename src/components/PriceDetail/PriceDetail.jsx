const TourPriceDetail = ({ tour }) => {
  return (
    <div className="mt-16 w-1/2  ">
      <h2 className="mb-4 text-center text-2xl font-bold">Chi Tiết Giá</h2>
      <div className="h-80 overflow-y-auto rounded-xl bg-white p-8 shadow-2xl md:max-w-2xl">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700">
            Người lớn (lớn hơn 12 tuổi):
            <span className="pl-5 font-semibold">
              {tour.price?.toLocaleString() || 0}₫
            </span>
          </p>
          <p className="text-gray-700">
            Trẻ khách (2-12 tuổi):{" "}
            <span className="pl-5 font-semibold">
              {tour.priceForChildren?.toLocaleString() || 0}₫
            </span>
          </p>
          <p className="text-gray-700">
            Trẻ khách (dưới 2 tuổi):{" "}
            <span className="pl-5 font-semibold">
              {tour.priceForInfants?.toLocaleString() || 0}₫
            </span>
          </p>
          <p className="text-gray-700">
            Phí phụ thu:
            <span className="pl-5 font-semibold">
              {tour.additionalFees?.toLocaleString() || 0}đ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourPriceDetail;
