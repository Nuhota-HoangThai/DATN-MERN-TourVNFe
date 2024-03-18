import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const UserOrder = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useSelector((state) => state.user.currentUser);

  const formatOrderId = (id) => {
    if (id.length <= 8) return id;
    // Lấy 5 ký tự đầu và 3 ký tự cuối
    return `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.log("Người dùng chưa đăng nhập");
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

  const translateStatus = (status) => {
    const statusTranslations = {
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    };
    return statusTranslations[status] || "N/A";
  };

  // tình trạng đơn hàng
  const getStatusStyle = (status) => {
    switch (status) {
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  const cancelOrder = async (orderId) => {
    if (!token) {
      console.log("Người dùng chưa đăng nhập");
      return;
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/booking/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (response.status === 200) {
        const updatedOrders = bookings.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order,
        );
        setBookings(updatedOrders);
      } else {
        throw new Error("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto my-16 bg-white px-4 py-8 shadow-2xl">
        <h1 className="mb-6 text-2xl  font-semibold">Lịch sử đặt tour</h1>
        {bookings.length > 0 ? (
          <div className="flex flex-col">
            {bookings.map((order) => (
              <div
                key={order._id}
                className="mb-6 rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-xl font-semibold">
                  Id đặt tour: {formatOrderId(order._id)}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <p className="text-gray-600">
                    <span className="font-semibold">Tour: </span>
                    {order.tour ? order.tour.nameTour : "Không còn tour này"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Tổng tiền: </span>
                    {order.totalAmount.toLocaleString()} đ
                  </p>
                  <p className={`px-4 py-2 ${getStatusStyle(order.status)}`}>
                    <span className="font-semibold">Trạng thái đơn hàng: </span>
                    {translateStatus(order.status)}
                  </p>
                  <p>
                    {order.status !== "completed" &&
                      order.status !== "confirmed" &&
                      order.status !== "cancelled" && (
                        <button
                          className="rounded bg-red-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-red-700"
                          onClick={() => cancelOrder(order._id)}
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no bookings.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
