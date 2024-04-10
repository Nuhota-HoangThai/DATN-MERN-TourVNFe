import { formatPrice } from "../../utils/formatPrice";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const TourPriceDetail = ({ tour }) => {
  return (
    <div className="my-6 w-1/2">
      <div className="rounded-xl bg-white px-8 py-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">Chi tiết giá</h2>
        <PerfectScrollbar>
          <div className="flex h-80  flex-col space-y-2">
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
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default TourPriceDetail;
