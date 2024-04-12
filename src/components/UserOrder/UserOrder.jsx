import React, { useEffect, useState } from "react";
import "./user-order.css";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewTour/Rate";

import {
  translateStatus,
  getStatusStyle,
  paymentStatusMapping,
} from "../../utils/formatStatus";

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [showReviewFormFor, setShowReviewFormFor] = useState(null); // Mã đặt tour hiện form đánh giá
  const { token } = useSelector((state) => state.user.currentUser);
  //////////////////////////////////////////
  const submitReview = async ({
    bookingId,
    tourId,
    reviewText,
    rating,
    image,
    video,
  }) => {
    try {
      const formData = new FormData();
      formData.append("bookingId", bookingId);
      formData.append("reviewText", reviewText);
      formData.append("rating", rating);

      // Append images
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      // Append video
      for (let i = 0; i < video.length; i++) {
        formData.append("video", video[i]);
      }

      const response = await axios.post(
        `${BASE_URL}/review/${tourId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        alert("Đánh giá thành công!");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Đánh giá không thành công. Vui lòng đánh giá lại!!!");
    }
  };

  const formatBookingId = (id) => {
    if (id.length <= 8) return id;

    return `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.log("Người dùng chưa đăng nhập?");
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/booking/user`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.log(
          "Lỗi khi tìm đơn hàng:",
          error.response ? error.response.data : error,
        );
      }
    };

    fetchOrders();
  }, []);

  const toggleReviewForm = (bookingId) => {
    if (showReviewFormFor === bookingId) {
      setShowReviewFormFor(null); // Ẩn form nếu nó đã hiển thị
    } else {
      setShowReviewFormFor(bookingId); // Hiển thị form cho đặt tour cụ thể
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!token) {
      //console.log("Người dùng chưa đăng nhập");
      return;
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/booking/${bookingId}/cancel`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (response.status === 200) {
        const updatedOrders = bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        );
        setBookings(updatedOrders);
      } else {
        throw new Error("Failed to cancel the booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="container mx-auto mt-6 rounded-lg bg-white px-4 py-4 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
        Lịch sử đặt tour
      </h1>
      {bookings.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã đặt
                </th>
                <th scope="col" className="px-6 py-3">
                  Tour
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <React.Fragment key={booking._id}>
                  <tr className="border-b bg-white hover:bg-gray-50 ">
                    <td className="px-6 py-4">
                      {formatBookingId(booking._id)}
                    </td>
                    <td className="px-6 py-4">
                      {booking.tour
                        ? booking.tour.nameTour
                        : "Không còn tour này"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.totalAmount.toLocaleString()} đ
                    </td>
                    <td className="px-6 py-4">
                      {paymentStatusMapping(booking?.paymentStatus)}
                    </td>
                    <td
                      className={`px-6 py-4 font-medium ${getStatusStyle(booking.status)}`}
                    >
                      {translateStatus(booking.status)}
                    </td>
                    <td className="flex justify-end space-x-4 px-6 py-4">
                      {booking.status === "completed" && (
                        <button
                          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
                          onClick={() => toggleReviewForm(booking._id)}
                        >
                          Đánh giá
                        </button>
                      )}
                      {(booking.status === "pending" ||
                        booking.status === "confirmed") && (
                        <button
                          className="font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-700"
                          onClick={() => cancelBooking(booking._id)}
                        >
                          Hủy tour
                        </button>
                      )}
                    </td>
                  </tr>
                  {/* {showReviewFormFor === booking._id && (
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <td colSpan="6" className="px-6 py-4">
                        <ReviewForm
                          bookingId={booking._id}
                          tourId={booking.tour._id}
                          onSubmit={submitReview}
                        />
                      </td>
                    </tr>
                  )} */}
                  {showReviewFormFor === booking._id && (
                    <div
                      className="backdrop"
                      onClick={() => setShowReviewFormFor(null)}
                    >
                      <div
                        className="reviewFormContainer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ReviewForm
                          bookingId={booking._id}
                          tourId={booking.tour._id}
                          onSubmit={submitReview}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Bạn chưa đặt tour nào.</p>
      )}
    </div>
  );
};

export default UserBooking;
