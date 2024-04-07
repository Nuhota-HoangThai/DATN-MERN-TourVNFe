const TourPriceDetail = ({ tour }) => {
  const formatPrice = (price) => {
    return <span style={{ color: "red" }}>{price?.toLocaleString()} đ</span>;
  };

  return (
    <div className="mt-16 w-1/2  ">
      <h2 className="mb-4 text-center text-2xl font-bold">Chi Tiết Giá</h2>
      <div className="h-80 overflow-y-auto rounded-xl bg-white p-8 shadow md:max-w-2xl">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700">
            Giá khách (lớn hơn 16 tuổi):
            <span className="pl-5 font-semibold">
              {tour.price !== tour.originalPrice && tour.promotion ? (
                <>
                  <span className="text-red-600">
                    {formatPrice(tour.price)}
                  </span>{" "}
                  <span className="text-base text-gray-500 line-through">
                    {formatPrice(tour.originalPrice)}
                  </span>
                </>
              ) : (
                formatPrice(tour.price)
              )}
            </span>
          </p>
          <p className="text-gray-700">
            Giá khách (6-16 tuổi):{" "}
            <span className="pl-5 font-semibold">
              {tour.priceForChildren !== tour.originalPriceForChildren &&
              tour.promotion ? (
                <>
                  <span className="text-red-600">
                    {formatPrice(tour.priceForChildren)}
                  </span>{" "}
                  <span className="text-base text-gray-500 line-through">
                    {formatPrice(tour.originalPriceForChildren)}
                  </span>
                </>
              ) : (
                formatPrice(tour.priceForChildren)
              )}
            </span>
          </p>
          <p className="text-gray-700">
            Giá khách (3-6 tuổi):{" "}
            <span className="pl-5 font-semibold">
              {tour.priceForYoungChildren !==
                tour.originalPriceForYoungChildren && tour.promotion ? (
                <>
                  <span className="text-red-600">
                    {formatPrice(tour.priceForYoungChildren)}
                  </span>{" "}
                  <span className="text-base text-gray-500 line-through">
                    {formatPrice(tour.originalPriceForYoungChildren)}
                  </span>
                </>
              ) : (
                formatPrice(tour.priceForYoungChildren)
              )}
            </span>
          </p>
          <p className="text-gray-700">
            Giá khách (dưới 3 tuổi):{" "}
            <span className="pl-5 font-semibold">
              {tour.priceForInfants !== tour.originalPriceForInfants &&
              tour.promotion ? (
                <>
                  <span className="text-red-600">
                    {formatPrice(tour.priceForInfants)}
                  </span>{" "}
                  <span className="text-base text-gray-500 line-through">
                    {formatPrice(tour.originalPriceForInfants)}
                  </span>
                </>
              ) : (
                formatPrice(tour.priceForInfants)
              )}
            </span>
          </p>
          <p className="text-gray-700">
            Phí phụ thu:
            <span className="pl-5 font-semibold text-red-600">
              {tour.additionalFees?.toLocaleString() || 0}đ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourPriceDetail;
