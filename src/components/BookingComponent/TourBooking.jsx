import {} from "react";
import { useLocation } from "react-router-dom";

const TourBooking = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className=" rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Thông tin tour
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <tbody>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Tên tour
                </th>
                <td className="px-6 py-4">{tour?.nameTour}</td>
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
                <td className="px-6 py-4">{tour?.price?.toLocaleString()} đ</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá khách (6-16 tuổi)
                </th>
                <td className="px-6 py-4">
                  {tour?.priceForChildren
                    ? `${tour.priceForChildren.toLocaleString()} đ`
                    : "Được miễn phí"}
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá khách (3-6 tuổi)
                </th>
                <td className="px-6 py-4">
                  {tour?.priceForYoungChildren
                    ? `${tour.priceForYoungChildren.toLocaleString()} đ`
                    : "Được miễn phí"}
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá khách (dưới 3 tuổi)
                </th>
                <td className="px-6 py-4">
                  {tour?.priceForInfants
                    ? `${tour?.priceForInfants?.toLocaleString()} đ`
                    : "Được miễn phí"}
                </td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Phí phụ thu
                </th>
                <td className="px-6 py-4">
                  {tour?.additionalFees
                    ? `${tour?.additionalFees?.toLocaleString()} đ`
                    : "Được miễn phí"}
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
