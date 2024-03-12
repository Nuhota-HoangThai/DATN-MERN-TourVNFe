import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { jwtDecode } from "jwt-decode";

import { MdOutlineClear } from "react-icons/md";
import { FcNext } from "react-icons/fc";

import CartMan from "../../../assets/img/cart-man.png";
import TourNone from "../../../assets/img/dulichCart.png";

import TourComparison from "../../CartComponent/TourComparison/TourComparison";
import CartSummary from "../CartSummary/CartSummary";

const CartItems = () => {
  const [cartItems, setCartItems] = useState({});
  const [allTour, setAllTour] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [orderInfo, setOrderInfo] = useState({
    children: 0,
    adults: 0,
  });

  // Thay đổi: lấy dữ liệu giỏ hàng và tour từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Giả sử URL lấy giỏ hàng hiện tại của người dùng
        const cartResponse = await axios.get(`${BASE_URL}/cart/getCart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });
        setCartItems(cartResponse.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchAllTours = async () => {
      try {
        const toursResponse = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setAllTour(toursResponse.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchCartItems();
    fetchAllTours();
  }, []);

  // Bổ sung: Xóa item khỏi giỏ hàng
  const removeFromCart = async (tourId) => {
    try {
      // Giả sử có API xóa một item khỏi giỏ hàng
      await axios.delete(`${BASE_URL}/cart/removeFromCart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      });
      // Cập nhật state sau khi xóa
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[tourId];
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Bổ sung: Xóa toàn bộ giỏ hàng
  // const clearCart = async () => {
  //   try {
  //     // Giả sử có API xóa toàn bộ giỏ hàng
  //     await axios.delete(`${BASE_URL}/cart/removeFromCart`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
  //       },
  //     });
  //     setCartItems({});
  //   } catch (error) {
  //     console.error("Error clearing cart:", error);
  //   }
  // };

  // Kiểm tra số lượng sản phẩm trong giỏ hàng
  const hasProducts =
    Object.values(cartItems).reduce((acc, cur) => acc + cur, 0) > 0;

  //console.log(cartItems);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prevState) => ({
      ...prevState,
      [name]: Math.max(0, parseInt(value, 10) || 0),
    }));
  };

  const validateForm = () => {
    const { children, adults } = orderInfo;
    if (children < 0 || adults < 0 || children + adults === 0) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error("Yêu cầu xác thực người dùng.");
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.id;

    const totalAmount = calculateTotal();
    const tourId = allTour.length > 0 ? allTour[0]._id : null;
    if (!tourId) {
      console.error("Không có tour nào được chọn.");
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
      //console.log(response.data);
      alert("Tour đã được đặt thành công!");
      // clearCart();
      navigate("/thanks");
    } catch (error) {
      console.error(
        "Không thể đặt tour: ",
        error.response ? error.response.data : error
      );
      alert("Đặt tour không thành công.");
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const additionalFee = subtotal * 0.05;
    return subtotal + additionalFee;
  };

  // Hàm tính giá người lớn
  const calculateAdultPrice = () => {
    let totalAdultPrice = 0;
    allTour.forEach((tour) => {
      if (cartItems[tour.id]) {
        const quantity = cartItems[tour._id]; // Số lượng mua cho mỗi tour
        const adultPrice = tour.price; // Giá người lớn

        // Tính tổng tiền dựa trên số lượng người lớn
        totalAdultPrice += orderInfo.adults * adultPrice * quantity;
      }
    });
    return totalAdultPrice;
  };

  // Hàm tính giá trẻ em
  const calculateChildrenPrice = () => {
    let totalChildrenPrice = 0;
    allTour.forEach((tour) => {
      if (cartItems[tour._id]) {
        const quantity = cartItems[tour._id]; // Số lượng mua cho mỗi tour
        const childrenPrice = tour.price * 0.8; // Giá trẻ em (giảm 20%)

        // Tính tổng tiền dựa trên số lượng trẻ em
        totalChildrenPrice += orderInfo.children * childrenPrice * quantity;
      }
    });
    return totalChildrenPrice;
  };

  // Hàm tính tổng tiền
  const calculateSubtotal = () => {
    const totalAdultPrice = calculateAdultPrice();
    const totalChildrenPrice = calculateChildrenPrice();
    return totalAdultPrice + totalChildrenPrice;
  };

  if (!hasProducts) {
    return (
      <div className="container mx-auto px-10 p-4 mb-5 mt-24 flex   relative">
        <img src={TourNone} alt="" className="rounded-2xl w-1/2 mx-auto" />
        <p className="absolute  flex pt-20 pl-96 font-semibold text-2xl font-mono  rounded-2xl">
          Hãy lựa cho cho mình
          <br />
          chuyến du lịch
          <br />
          hoàn hảo nào!!!
        </p>
        <Link
          to="/"
          className="absolute flex mt-52 cursor-pointer hover:bg-white ml-96 font-semibold text-xl font-mono border px-3 border-blue-950 py-1 rounded-2xl"
        >
          <div className="flex items-center ">
            Chọn tour <FcNext className="ml-2 text-blue-950" />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 p-4 my-5">
      <TourComparison />
      <div className="grid grid-cols-5 justify-items-center gap-6 font-bold">
        <p>Tour</p>
        <p className="col-span-2">Tên tour</p>
        <p className="pl-16">Giá/khách</p>
        <p>Xóa</p>
      </div>
      <hr className="my-4" />
      {allTour.map((tour) => {
        const quantity = cartItems[tour._id];
        if (!quantity || quantity <= 0) return null;

        return (
          <div key={tour._id}>
            <div className="grid grid-cols-5 justify-items-center gap-4 items-center my-4">
              {Array.isArray(tour.image) ? (
                <img
                  src={BASE_URL + "/" + tour.image[0].replace(/\\/g, "/")}
                  alt=""
                />
              ) : (
                <img
                  src={BASE_URL + "/" + tour.image.replace(/\\/g, "/")}
                  alt=""
                />
              )}
              <p className="col-span-2 font-bold">{tour.nameTour}</p>
              <p className="pl-16 text-red-500 font-medium">{tour.price} đ</p>
              <MdOutlineClear
                className="cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => removeFromCart(tour._id)}
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="flex flex-col lg:flex-row gap-6 justify-between mt-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white shadow-lg rounded-lg p-6 lg:w-2/3 gap-4"
        >
          <div className="mb-4">
            <label
              htmlFor="children"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số trẻ em
            </label>
            <input
              type="number"
              id="children"
              name="children"
              value={orderInfo.children}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập số trẻ em"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="adults"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số người lớn
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              value={orderInfo.adults}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập số người lớn"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Đặt tour
          </button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
        <CartSummary
          calculateAdultPrice={calculateAdultPrice}
          calculateChildrenPrice={calculateChildrenPrice}
          calculateSubtotal={calculateSubtotal}
          calculateTotal={calculateTotal}
        />
        <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
          <img src={CartMan} alt="" />
        </div>
      </div>
    </div>
  );
};
export default CartItems;
