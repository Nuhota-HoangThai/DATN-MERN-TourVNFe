import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

import Star from "../../assets/img/star.png";

const ReviewForm = ({ tour }) => {
  const { token } = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //console.log(reviews);
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/review/${tour._id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setReviews(response.data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [tour, token]);

  const { avgRating } = calculateAvgRating(reviews);

  // Format date to Vietnamese
  const formatVietnameseDate = (dateInput) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateInput),
    );
  };

  return (
    <div className="my-16 w-full">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Đánh giá</h1>
        <div className="text-lg font-semibold text-indigo-600">
          {avgRating ? (
            <div className="flex ">
              {avgRating} <img src={Star} alt="" className="w-7" /> (
              {reviews.length} đánh giá)
            </div>
          ) : (
            "Chưa có đánh giá"
          )}
        </div>
      </div>
      <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : (
          reviews?.map((review, index) => (
            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
              key={index}
            >
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-gray-800">
                  {review.userId?.name || "Ẩn danh"}
                </p>
                <p className="text-sm text-gray-500">
                  {formatVietnameseDate(review.createdAt)}
                </p>
              </div>
              <div className="mt-2 flex items-center">
                <span className="mr-1 flex">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <img key={i} src={Star} alt="" className="w-7" />
                  ))}
                </span>
                <span className="text-md font-medium text-gray-700">
                  ({review.rating} Sao)
                </span>
              </div>
              <p className="mt-3 text-gray-600">{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
