import React, { useEffect, useState } from "react";
import "./user-order.css";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewTour/Rate";
import { Link } from "react-router-dom";
import {
  translateStatus,
  getStatusStyle,
  paymentStatusMapping,
} from "../../utils/formatStatus";

import { toast } from "react-toastify";
const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [showReviewFormFor, setShowReviewFormFor] = useState(null); // Mã đặt tour hiện form đánh giá
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;
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

      // thêm hình ảnh vào formdata
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      // thêm video vào formdata
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
        toast("Đánh giá thành công!");
        setShowReviewFormFor(null);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast("Đánh giá không thành công. Vui lòng đánh giá lại!!!");
    }
  };

  const formatBookingId = (id) => {
    if (id.length <= 8) return id;

    return `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        toast("Người dùng chưa đăng nhập?");
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
        // console.log(
        //   "Lỗi khi tìm đơn hàng:",
        //   error.response ? error.response.data : error,
        // );
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
      toast("Người dùng chưa đăng nhập");
      return;
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/booking/${bookingId}/cancel`,
        {},
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
        toast("Hủy tour thành công");
      } else {
        toast("Quý khách không thể hủy tour");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="my-4 text-center font-bold text-gray-800">
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
                      <Link
                        to={`/booking-detail/${booking._id}`}
                        className="italic underline"
                      >
                        {formatBookingId(booking._id)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {booking.tour
                        ? booking.tour.nameTour
                        : "Không còn tour này"}
                    </td>
                    <td className="px-6 py-4 text-red-600">
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
                      {booking.status === "completed" && !booking.review && (
                        <button
                          className="font-medium text-blue-600 hover:text-blue-800"
                          onClick={() => toggleReviewForm(booking._id)}
                        >
                          Đánh giá
                        </button>
                      )}
                      {booking.status === "completed" && booking.review && (
                        <Link
                          to={`/review-details/${booking._id}`}
                          className="font-medium text-green-600 hover:text-green-800"
                        >
                          Xem đánh giá
                        </Link>
                      )}
                      {booking.status === "pending" && (
                        <button
                          className="font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-700"
                          onClick={() => cancelBooking(booking._id)}
                        >
                          Hủy tour
                        </button>
                      )}
                    </td>
                  </tr>
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
