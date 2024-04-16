import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

import { formatDateVN } from "../../utils/formatDate";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  // Cài đặt Slider
  const settings = {
    dots: false,
    infinite: reviews.length > 1, // Nếu chỉ có 1 review thì không lặp
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: reviews.length > 1, // Tự động chuyển slide chỉ khi có nhiều hơn 1 review
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="my-4">
      <div className="space-y-4  bg-sky-50 p-6 shadow-md">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold text-gray-800">Đánh giá</h1>
          <div className=" text-xl font-semibold text-indigo-600 ">
            {avgRating ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{avgRating} điểm</span>
                <span>({reviews.length} đánh giá)</span>
              </div>
            ) : (
              <span className="text-sm"> Chưa có đánh giá</span>
            )}
          </div>
        </div>{" "}
        <Slider {...settings}>
          {reviews.map((review, index) => (
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
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewForm;
