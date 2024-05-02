// BookingDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

import { formatDateVN } from "../../utils/formatDate";

import {
  translateStatus,
  paymentStatusMethod,
  paymentStatusMapping,
} from "../../utils/formatStatus";

const BookingDetail = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const { bookingId } = useParams();
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/booking/bookings/${bookingId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        setBookingDetail(data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchBookingDetail();
  }, [bookingId]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="mx-auto my-4 h-[700px] max-w-6xl rounded-xl bg-white p-4">
      <h1 className="mb-4 font-bold text-gray-800">
        Chi tiết đơn đặt tour - {bookingDetail?._id}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-slate-50 p-4">
          <h2 className="mb-3 text-lg font-bold">Thông tin khách hàng</h2>
          <p>
            <strong>Người đặt:</strong> {bookingDetail?.user?.name || "N/A"}
          </p>
          <p>
            <strong>Số căn cước công dân:</strong>{" "}
            {bookingDetail?.user?.cccd || "N/A"}
          </p>
          <p>
            <strong>Số điện thoại:</strong>{" "}
            {bookingDetail?.user?.phone || "N/A"}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {bookingDetail?.user?.address || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {bookingDetail?.user?.email || "N/A"}
          </p>
        </div>
        <div className="bg-slate-50 p-4">
          <h2 className="mb-3 text-lg font-bold">Thông tin tour</h2>
          <p>
            <strong>Mã tour:</strong> {bookingDetail?.tour?._id || "N/A"}
          </p>
          <p>
            <strong>Tour:</strong> {bookingDetail?.tour?.nameTour || "N/A"}
          </p>
          <p>
            <strong>Giá khách (trên 16 tuổi):</strong>{" "}
            {bookingDetail?.adultPrice?.toLocaleString() || 0} đ
          </p>
          <p>
            <strong>Giá khách (6-16 tuổi):</strong>{" "}
            {bookingDetail?.childPrice?.toLocaleString() || 0} đ
          </p>
          <p>
            <strong>Giá khách (3-6 tuổi):</strong>{" "}
            {bookingDetail?.youngChildrenPrice?.toLocaleString() || 0} đ
          </p>
          <p>
            <strong>Giá khách (dưới 3 tuổi):</strong>{" "}
            {bookingDetail?.infantPrice?.toLocaleString() || 0} đ
          </p>
        </div>
      </div>
      <div className="my-5 bg-slate-50 p-4">
        <h2 className="mb-3 text-lg font-bold">Chi tiết đặt tour</h2>
        <p>
          <strong>Ngày đặt:</strong>{" "}
          {formatDateVN(bookingDetail?.bookingDate) || "N/A"}
        </p>
        <p>
          <strong>Số lượng khách (trên 16):</strong>{" "}
          {bookingDetail?.numberOfAdults || 0}
        </p>
        <p>
          <strong>Số lượng khách (6-16 tuổi):</strong>{" "}
          {bookingDetail?.numberOfChildren || 0}
        </p>
        <p>
          <strong>Số lượng khách dưới 6 tuổi:</strong>{" "}
          {bookingDetail?.numberOfYoungChildren || 0}
        </p>
        <p>
          <strong>Phương tiện di chuyển:</strong> {bookingDetail?.transport}
        </p>
        <p>
          <strong>Số lượng phòng đơn:</strong>{" "}
          {bookingDetail?.singleRoomNumber || 0} phòng
        </p>
        <p>
          <strong>Phí phụ thu (phòng đơn):</strong>{" "}
          {bookingDetail?.surcharge?.toLocaleString() || 0} đ
        </p>
        <p>
          <strong>Tổng tiền:</strong>{" "}
          {bookingDetail?.totalAmount.toLocaleString()} đ
        </p>
        <p>
          <strong>Trạng thái đặt tour:</strong>{" "}
          {translateStatus(bookingDetail?.status)}
        </p>
        <p>
          <strong>Trạng thái thanh toán:</strong>{" "}
          {paymentStatusMapping(bookingDetail?.paymentStatus)}
        </p>
        <p>
          <strong>Phương thức thanh toán:</strong>{" "}
          {paymentStatusMethod(bookingDetail?.paymentMethod)}
        </p>
        <p>
          <strong>Thông tin thêm:</strong>{" "}
          {bookingDetail?.additionalInformation}
        </p>
      </div>
    </div>
  );
};

export default BookingDetail;
