import { useState, useEffect } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Star from "../../assets/img/star.png";

import { formatDateVN } from "../../utils/formatDate";

const ReviewForm = ({ tour }) => {
  // const { token } = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/review/${tour._id}`, {
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
        });
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

  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: reviews.length > 1,
    autoplay: reviews.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: reviews.length > 1,
          autoplay: reviews.length > 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

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
