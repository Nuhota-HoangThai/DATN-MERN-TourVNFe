import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

const CartItems = () => {
  const [cartItems, setCartItems] = useState({});
  const [allTour, setAllTour] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN);

    if (authToken) {
      fetch(`${BASE_URL}/tour/getAllTours`)
        .then((response) => response.json())
        .then((data) => {
          setAllTour(data);
        });

      fetch(`${BASE_URL}/cart/getCart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          [import.meta.env.VITE_AUTH_TOKEN]: authToken,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    } else {
      console.error("Error");
    }
  }, []);

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN)) {
      fetch(`${BASE_URL}/cart/removeFromCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          [import.meta.env.VITE_AUTH_TOKEN]: localStorage.getItem(
            import.meta.env.VITE_AUTH_TOKEN,
          ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="container mx-auto my-5 p-4 px-10">
      <h1 className="text-xl font-semibold underline">
        Danh sách tour so sánh
      </h1>
      <div className="text-black">
        <div className=" mx-auto py-5">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                  <th className="px-6 py-3 text-left">Tên Tour</th>
                  <th className="px-6 py-3 text-left">Chỗ còn trống</th>
                  <th className="px-6 py-3 text-center">Giá (đ/khách)</th>
                  <th className="px-6 py-3 text-center">Hành Động</th>
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
                      <td className="whitespace-nowrap px-6 py-3 text-left">
                        <div className="font-medium">{tour.nameTour}</div>
                      </td>
                      <td className="px-6 py-3 text-left">
                        <div className="font-medium">
                          {tour.maxParticipants}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="rounded-full  bg-red-500 px-3 py-1 text-white ">
                          {tour.price} đ
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => removeFromCart(tour._id)}
                          className="rounded bg-red-500 px-4 py-1 text-white transition duration-200 ease-in hover:bg-red-700 focus:outline-none"
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
      </div>
    </div>
  );
};
export default CartItems;
