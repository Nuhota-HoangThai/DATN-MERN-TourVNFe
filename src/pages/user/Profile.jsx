import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { jwtDecode } from "jwt-decode";
import { TourContext } from "../../context/TourContext";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const { logout } = useContext(TourContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        console.log("User not logged in");
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
          "Error fetching orders:",
          error.response ? error.response.data : error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Orders
        </h1>
        {orders.length > 0 ? (
          <div className="flex flex-col">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-6 mb-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Order ID: {order._id}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Tour:</span>{" "}
                    {order.tour.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Total Amount:</span>{" "}
                    {order.totalAmount.toLocaleString()} đ
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Status:</span>{" "}
                    {order.status}
                  </p>
                  {/* Add more details as needed */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no orders.</p>
        )}
      </div>
      <div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          onClick={logout} // Gọi hàm logout khi nút được nhấn
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
