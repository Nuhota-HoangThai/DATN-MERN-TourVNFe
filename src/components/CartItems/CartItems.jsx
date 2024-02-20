import { useContext, useState } from "react";
import { TourContext } from "../../context/TourContext";
import { MdOutlineClear } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { jwtDecode } from "jwt-decode";

const CartItems = () => {
  const { allTour, cartItems, clearCart, removeFromCart } =
    useContext(TourContext);
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    children: 0,
    adults: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prevState) => ({
      ...prevState,
      [name]:
        name === "children" || name === "adults"
          ? Math.max(0, parseInt(value, 10) || 0)
          : value,
    }));
  };

  const validateForm = () => {
    const { name, phone, email, address, children, adults } = orderInfo;
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      children < 0 ||
      adults < 0 ||
      children + adults === 0
    ) {
      setError(
        "Please fill all the fields correctly, with at least one adult or child."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("auth-token");
    // Assume you've stored the user ID at login/signup
    if (!token) {
      console.error("Authentication required");
      navigate("/login"); // Redirecting user to login page if not authenticated
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.id;

    const totalAmount = calculateTotal();
    const tourId = allTour.length > 0 ? allTour[0]._id : null;
    if (!tourId) {
      console.error("No tour selected");
      return;
    }

    const orderPayload = {
      ...orderInfo,
      user: userId,
      tour: tourId,
      totalAmount,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/order/createOrders`,
        orderPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Order placed successfully!");
      clearCart();
      navigate("/thanks");
    } catch (error) {
      console.error(
        "Failed to place order: ",
        error.response ? error.response.data : error
      );
      alert("Failed to place the order.");
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const additionalFee = subtotal * 0.05;
    return subtotal + additionalFee;
  };

  const calculateSubtotal = () => {
    let total = 0;

    allTour.forEach((tour) => {
      if (cartItems[tour.id]) {
        const quantity = cartItems[tour.id]; // Số lượng mua cho mỗi tour
        const adultPrice = tour.new_price; // Giá người lớn
        const childrenPrice = tour.new_price * 0.8; // Giá trẻ em (giảm 20%)

        // Tính tổng tiền dựa trên số lượng người lớn và trẻ em
        total +=
          (orderInfo.adults * adultPrice + orderInfo.children * childrenPrice) *
          quantity;
      }
    });

    return total;
  };

  return (
    <div className="container mx-auto px-10 p-4 my-5">
      <div className="grid grid-cols-5 justify-items-center gap-6 font-bold">
        <p>Tour</p>
        <p className="col-span-2">Tên tour</p>
        <p className="pl-16">Giá/khách</p>
        <p>Xóa</p>
      </div>
      <hr className="my-4" />
      {allTour.map((tour) => {
        const quantity = cartItems[tour.id];
        if (!quantity || quantity <= 0) return null;

        return (
          <div key={tour.id}>
            <div className="grid grid-cols-5 justify-items-center gap-4 items-center my-4">
              <img
                src={tour.image}
                alt={tour.name}
                className="w-20 h-20 object-cover"
              />
              <p className="col-span-2 font-bold">{tour.name}</p>
              <p className="pl-16 text-red-500 font-medium">
                {tour.new_price} đ
              </p>
              <MdOutlineClear
                className="cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => removeFromCart(tour.id)}
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="flex flex-col lg:flex-row justify-between mt-8 gap-6">
        <form onSubmit={handleSubmit} className="flex gap-4 w-full">
          <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin đặt hàng</h2>
            {["name", "phone", "email", "address", "children", "adults"].map(
              (field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={orderInfo[field]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              )
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đặt hàng
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
        </form>
        <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tổng cộng</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal:</span>
            <span>{calculateSubtotal().toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Additional Fee (5%):</span>
            <span>{(calculateSubtotal() * 0.05).toLocaleString()} đ</span>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {calculateTotal().toLocaleString()} đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
