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
    <div className="container mx-auto  bg-white p-4 px-10 shadow-2xl">
      <h1 className="mb-4 text-center text-2xl font-semibold">
        Danh sách tour so sánh
      </h1>
      <div className="">
        <table className="w-full table-auto">
          <thead className="bg-blue-900">
            <tr className=" text-left">
              <th className=" rounded-tl-lg px-6 py-3 text-white">Tên Tour</th>
              <th className="px-6 py-3 text-center text-white">
                Chỗ còn trống
              </th>
              <th className="px-6 py-3 text-center text-white">
                Giá (đ/khách)
              </th>
              <th className=" rounded-tr-lg px-6 py-3 text-center text-white">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {allTour.map((tour) => {
              const quantity = cartItems[tour._id];
              if (!quantity || quantity <= 0) return null;

              return (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={tour._id}
                >
                  <td className=" px-6 py-3 font-medium">{tour.nameTour}</td>
                  <td className="px-6 py-3 text-center text-black">
                    {tour.maxParticipants}
                  </td>
                  <td className="px-6 py-3 text-center text-black">
                    {tour.price.toLocaleString()} đ
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => removeFromCart(tour._id)}
                      className="mx-auo mb-2 rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
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
