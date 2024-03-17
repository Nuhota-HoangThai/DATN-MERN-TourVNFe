import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { useSelector } from "react-redux";

const CartItems = ({ cartItems, setCartItems, allTour }) => {
  const { token } = useSelector((state) => state.user.currentUser);

  const removeFromCart = (itemId) => {
    if (token) {
      axios
        .delete(`${BASE_URL}/cart/removeFromCart/${itemId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="container mx-auto my-5 overflow-x-auto p-4 px-10 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Danh sách tour so sánh</h1>
      <div className="w-full text-gray-800">
        <table className="w-full ">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600">
              <th className=" px-6 py-3">Tên Tour</th>
              <th className="px-6 py-3">Chỗ còn trống</th>
              <th className="px-6 py-3 text-center">Giá (đ/khách)</th>
              <th className="px-6 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {allTour.map((tour) => {
              const quantity = cartItems[tour._id];
              if (!quantity || quantity <= 0) return null;

              return (
                <tr
                  className="border-b last:border-b-0 hover:bg-gray-100"
                  key={tour._id}
                >
                  <td className="whitespace-nowrap px-6 py-3">
                    <div className="font-medium">{tour.nameTour}</div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="font-medium">{tour.maxParticipants}</div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="rounded-full px-5 py-1">
                      {tour.price} đ
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => removeFromCart(tour._id)}
                      className="rounded px-4 py-1 transition duration-200 ease-in-out hover:bg-red-600 focus:outline-none"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItems;
