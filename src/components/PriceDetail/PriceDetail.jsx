import { formatPrice } from "../../utils/formatPrice";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const TourPriceDetail = ({ tour }) => {
  return (
    <div className="my-4">
      <div className="bg-sky-50 px-8 py-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">Chi tiết giá</h2>
        <PerfectScrollbar>
          <div className="flex h-auto flex-col space-y-2">
            {tour.price != null && (
              <p className="text-gray-700">
                Giá khách (lớn hơn 16 tuổi):
                <span className="pl-5 font-semibold text-red-600">
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
            )}
            {tour.priceForChildren != null && (
              <p className="text-gray-700">
                Giá khách (6-16 tuổi):
                <span className="pl-5 font-semibold text-red-600">
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
            )}
            {tour.priceForYoungChildren != null && (
              <p className="text-gray-700">
                Giá khách dưới 6 tuổi:
                <span className="pl-5 font-semibold text-red-600">
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
            )}
            {tour.additionalFees != null && (
              <p className="text-gray-700">
                Phí phụ thu:
                <span className="pl-5 font-semibold text-red-600">
                  {formatPrice(tour.additionalFees)}
                </span>
              </p>
            )}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default TourPriceDetail;
