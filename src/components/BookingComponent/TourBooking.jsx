import {} from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

import { formatDateVN } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";

const TourBooking = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];

  return (
    <div>
      <div className=" rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Thông tin tour
        </h1>

        <div className="overflow-x-auto">
          <div>
            {displayImages.length > 0 ? (
              // Chỉ hiển thị hình ảnh đầu tiên từ mảng displayImages
              <div className="image-grid-item">
                <img
                  src={`${BASE_URL}/${displayImages[0].replace(/\\/g, "/")}`}
                  alt="Tour Image 1"
                  className="w-full object-cover"
                />
              </div>
            ) : (
              <div className="col-span-2 flex h-full items-center justify-center">
                Không có hình ảnh
              </div>
            )}
          </div>
          <table className="w-full text-left text-sm text-gray-500">
            <tbody>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Loại tour
                </th>
                <td className="px-6 py-4">{tour?.tourType.typeName}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Danh mục tour
                </th>
                <td className="px-6 py-4">
                  {tour?.tourDirectory.directoryName}
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Tên tour
                </th>
                <td className="px-6 py-4">{tour?.nameTour}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Phương tiện di chuyển
                </th>
                <td className="px-6 py-4">{tour?.transport}</td>
              </tr>

              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Số chỗ trống
                </th>
                <td className="px-6 py-4">{tour?.maxParticipants}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Ngày bắt đầu
                </th>
                <td className="px-6 py-4">{formatDateVN(tour?.startDate)}</td>
              </tr>
              <tr className="bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Ngày kết thúc
                </th>
                <td className="px-6 py-4">{formatDateVN(tour?.endDate)}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá
                </th>
                <td className="px-6 py-4 text-red-600">
                  <span className="font-semibold text-red-600">
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
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá khách (6-16 tuổi)
                </th>
                <td className="px-6 py-4 text-red-600">
                  <span className=" font-semibold text-red-600">
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
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá khách dưới 6 tuổi
                </th>
                <td className="px-6 py-4 text-red-600">
                  <span className="font-semibold text-red-600">
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
                </td>
              </tr>

              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Phí phụ thu
                </th>
                <td className="px-6 py-4 text-red-600">
                  {formatPrice(tour?.additionalFees)
                    ? `${formatPrice(tour?.additionalFees)}`
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;
