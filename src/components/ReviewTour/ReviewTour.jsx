import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

import Star from "../../assets/img/star.png";

import { formatDateVN } from "../../utils/formatDate";

const ReviewForm = ({ tour }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/review/${tour._id}`, {});
        setReviews(response.data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [tour]);

  const { avgRating } = calculateAvgRating(reviews);

  return (
    <div className="border-t-2 border-sky-900">
      <div className="w-full ">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold text-gray-800">Đánh giá</h1>
          <div className="mt-4 text-xl font-semibold text-indigo-600 md:mt-0">
            {avgRating ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{avgRating}</span>
                <img src={Star} alt="Sao" className="h-6 w-6" />
                <span>({reviews.length} đánh giá)</span>
              </div>
            ) : (
              "Chưa có đánh giá"
            )}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
          {isLoading ? (
            <p className="text-center text-gray-500">Đang tải...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-800">
                    {review.userId?.name || "Ẩn danh"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateVN(review.createdAt)}
                  </p>
                </div>

                <div className="mb-6 text-gray-600">{review.reviewText}</div>
                <div className="flex flex-wrap gap-5">
                  {/* Hiển thị tất cả hình ảnh */}
                  {review.image &&
                    review.image.length > 0 &&
                    review.image.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`${BASE_URL}/${img.replace(/\\/g, "/")}`}
                        alt={`review ${imgIndex}`}
                        className="h-auto w-48 rounded-md object-cover"
                      />
                    ))}
                  {/* Hiển thị tất cả video */}
                  {review.video &&
                    review.video.length > 0 &&
                    review.video.map((vid, vidIndex) => (
                      <video
                        key={vidIndex}
                        src={`${BASE_URL}/${vid.replace(/\\/g, "/")}`}
                        alt={`review ${vidIndex}`}
                        className="h-auto w-48 rounded-md"
                        controls
                        loop
                        muted
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
