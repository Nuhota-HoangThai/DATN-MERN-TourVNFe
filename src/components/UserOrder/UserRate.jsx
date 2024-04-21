import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const UserReviews = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/review/reviewUser/allReviewOfUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setReviews(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token]); // Dependency array includes `token` to re-fetch when token changes

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/review/deleteReview/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        toast("Xóa đánh giá thành công.");
      }
    } catch (err) {
      toast("Không thể xóa đánh giá");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length > 0 ? (
        <div className=" shadow-md sm:rounded-lg">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên tour
                </th>
                <th scope="col" className="px-6 py-3">
                  Nội dung
                </th>
                <th scope="col" className="px-6 py-3">
                  Điểm
                </th>
                <th scope="col" className="px-6 py-3">
                  Xem
                </th>
                <th scope="col" className="px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((review) => (
                <tr key={review._id} className="border-b bg-white ">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 ">
                    {review.tourId?.nameTour}
                  </td>
                  <td className="px-6 py-4">{review?.reviewText}</td>
                  <td className="px-6 py-4">{review?.rating}/10</td>
                  <td className="w-40 px-6 py-4">
                    <button
                      className="italic text-blue-800 underline "
                      onClick={() => navigate(`/review-details/${review._id}`)}
                    >
                      Chi tiết
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <div>
                      <button
                        className="text-red-600"
                        onClick={() => deleteReview(review._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default UserReviews;
