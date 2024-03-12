import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const TourComparison = () => {
  const [allTour, setAllTour] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setAllTour(response.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cart/getCart`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchTours();
    fetchCartItems();
  }, []);

  // Lọc ra các tour trong giỏ hàng từ allTour dựa vào cartItems
  const toursInCart = allTour.filter((tour) => cartItems[tour._id]);

  // Chọn ra 2 tour đầu tiên trong giỏ hàng để so sánh
  const toursToCompare = toursInCart.slice(0, 2);

  //định dạng ngày tháng năm
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
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
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourComparison;
