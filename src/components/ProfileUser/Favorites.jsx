import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../admin/src/utils/config"; // Update this path according to your project structure
import { Link } from "react-router-dom";

import { formatDateVN } from "../../utils/formatDate";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  useEffect(() => {
    if (currentUser?.id) {
      fetchFavorites(currentUser.id);
    }
  }, [currentUser?.id]);

  const fetchFavorites = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/favorites/userFavorites/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setFavorites(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch favorites:",
        error.response?.data?.message || error.message,
      );
    }
  };

  const removeFavorite = async (tourId) => {
    try {
      await axios.delete(`${BASE_URL}/favorites/removeFavorites`, {
        data: { userId: currentUser.id, tourId },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Xóa thành công, cập nhật lại danh sách favorites mà không cần reload trang
      setFavorites(
        favorites.filter((favorite) => favorite.tourId._id !== tourId),
      );
      alert("Đã xóa khỏi danh sách yêu thích!");
    } catch (error) {
      console.error(
        "Error removing from favorites:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xl font-bold">Tour yêu thích của tôi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Tên tour
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Ngày bắt đầu
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Hành động
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites?.map((favorite) => (
              <tr key={favorite._id}>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="whitespace-no-wrap text-gray-900">
                        {favorite.tourId?.nameTour || "Không còn tour này"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">
                    {formatDateVN(favorite.tourId?.startDate)}
                  </p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <Link
                    to={`/tour/${favorite.tourId?._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Xem chi tiết
                  </Link>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button
                    onClick={() => removeFavorite(favorite.tourId._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoritesList;
