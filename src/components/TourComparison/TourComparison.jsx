import React, { useContext } from "react";
import { TourContext } from "../../context/TourContext";

const TourComparison = () => {
  const { allTour, cartItems } = useContext(TourContext);

  // Lọc ra các tour trong giỏ hàng từ allTour dựa vào cartItems
  const toursInCart = allTour.filter((tour) => cartItems[tour._id]);
  // Chọn ra 2 tour đầu tiên trong giỏ hàng để so sánh
  const toursToCompare = toursInCart.slice(0, 2);

  //định dạng ngày tháng năm
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="my-10">
      {toursToCompare.length >= 2 && (
        <div className="compare-section max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">So sánh Tour</h2>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left ">Thông tin</th>
                  <th className="py-3 px-6 text-left">Tour 1</th>
                  <th className="py-3 px-6 text-left">Tour 2</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-ligh t">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                    Tên
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="py-3 px-6 text-left">
                      {tour.nameTour}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                    Giá
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="py-3 px-6 text-left">
                      {tour.price.toLocaleString()} đ/khách
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                    Ngày khởi hành
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="py-3 px-6 text-left">
                      {formatDateVN(tour.startDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                    Ngày kết thúc
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="py-3 px-6 text-left">
                      {formatDateVN(tour.endDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                    Chỗ còn trống
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="py-3 px-6 text-left">
                      {tour.maxParticipants}
                    </td>
                  ))}
                </tr>
                {/* Thêm các dòng thông tin khác ở đây */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourComparison;
