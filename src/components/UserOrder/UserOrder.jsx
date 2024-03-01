import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { jwtDecode } from "jwt-decode";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);

  const formatOrderId = (id) => {
    // Kiểm tra nếu id không đủ dài, trả về nguyên vẹn
    if (id.length <= 8) return id;
    // Lấy 5 ký tự đầu và 3 ký tự cuối
    return `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        console.log("Người dùng chưa đăng nhập");
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;
      try {
        const response = await axios.get(`${BASE_URL}/order/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.log(
          "Lỗi khi tìm đơn hàng:",
          error.response ? error.response.data : error
        );
      }
    };

    fetchOrders();
  }, []);

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
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.log("Người dùng chưa đăng nhập");
      return;
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/order/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        );
        setOrders(updatedOrders);
      } else {
        throw new Error("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Lịch sử đặt tour
        </h1>
        {orders.length > 0 ? (
          <div className="flex flex-col">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-6 mb-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Id đặt tour: {formatOrderId(order._id)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Tour:</span>
                    {order.tour ? order.tour.nameTour : "Không còn tour này"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Tổng tiền:</span>
                    {order.totalAmount.toLocaleString()} đ
                  </p>
                  <p className={`px-4 py-2 ${getStatusStyle(order.status)}`}>
                    <span className="font-semibold">Trạng thái đơn hàng:</span>
                    {order.status}
                  </p>
                  <p>
                    {order.status !== "completed" &&
                      order.status !== "confirmed" &&
                      order.status !== "cancelled" && (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out"
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
          <p className="text-gray-600">You have no orders.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
