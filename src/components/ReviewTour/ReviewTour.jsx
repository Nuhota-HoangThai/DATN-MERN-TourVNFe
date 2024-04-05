import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Star from "../../assets/img/star.png";

const ReviewForm = ({ tour }) => {
  const { token } = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const formatVietnameseDate = (dateInput) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateInput),
    );
  };

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
    <div className="my-16 w-full px-4 md:px-8">
      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-3xl font-bold text-gray-800">Đánh giá</h1>
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
      <div className="space-y-4 rounded-2xl bg-slate-100 p-6 shadow-md">
        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : reviews.length > 0 ? (
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-800">
                    {review.userId?.name || "Ẩn danh"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatVietnameseDate(review.createdAt)}
                  </p>
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <img key={i} src={Star} alt="star" className="h-6 w-6" />
                  ))}
                  <span className="text-lg font-medium text-gray-700">
                    ({review.rating} Sao)
                  </span>
                </div>
                <p className="mb-6 text-gray-600">{review.reviewText}</p>
                <div className="grid grid-cols-2 gap-4">
                  {Array.isArray(review.image) && review.image.length > 0 ? (
                    <img
                      src={`${BASE_URL}/${review.image[0].replace(/\\/g, "/")}`}
                      alt="review"
                      className="h-auto w-48 rounded-md object-cover"
                    />
                  ) : typeof review.image === "string" ? (
                    <img
                      src={`${BASE_URL}/${review.image.replace(/\\/g, "/")}`}
                      alt="review"
                      className="h-auto w-48 rounded-md object-cover"
                    />
                  ) : (
                    <p className="col-span-2 text-center text-gray-500">
                      Không có hình ảnh
                    </p>
                  )}
                  {Array.isArray(review.video) && review.video.length > 0 ? (
                    <video
                      src={`${BASE_URL}/${review.video[0].replace(/\\/g, "/")}`}
                      alt="review"
                      className="h-auto w-48 rounded-md"
                      controls
                      autoPlay
                      loop
                      muted
                    />
                  ) : typeof review.video === "string" ? (
                    <video
                      src={`${BASE_URL}/${review.video.replace(/\\/g, "/")}`}
                      alt="review"
                      className="h-auto w-48 rounded-md"
                      controls
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <p className="col-span-2 text-center text-gray-500">
                      Không có video
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>

    // <div className="my-16 w-full px-4 md:px-0">
    //   <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
    //     <h1 className="text-2xl font-bold text-gray-800">Đánh giá</h1>
    //     <div className="mt-4 text-lg font-semibold text-indigo-600 md:mt-0">
    //       {avgRating ? (
    //         <div className="flex items-center space-x-2">
    //           <span>{avgRating}</span>
    //           <img src={Star} alt="Sao" className="h-5 w-5" />
    //           <span>({reviews.length} đánh giá)</span>
    //         </div>
    //       ) : (
    //         "Chưa có đánh giá"
    //       )}
    //     </div>
    //   </div>
    //   <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
    //     {isLoading ? (
    //       <p className="text-center text-gray-500">Đang tải...</p>
    //     ) : reviews.length > 0 ? (
    //       <Slider {...sliderSettings}>
    //         {reviews.map((review, index) => (
    //           <div key={index} className="rounded-lg bg-white px-4 py-6 shadow">
    //             <div className="mb-4 flex items-center justify-between">
    //               <p className="text-lg font-semibold text-gray-800">
    //                 {review.userId?.name || "Ẩn danh"}
    //               </p>
    //               <p className="text-sm text-gray-500">
    //                 {formatVietnameseDate(review.createdAt)}
    //               </p>
    //             </div>
    //             <div className="mb-4 flex items-center space-x-2">
    //               {Array.from({ length: review.rating }, (_, i) => (
    //                 <img key={i} src={Star} alt="star" className="h-5 w-5" />
    //               ))}
    //               <span className="text-md font-medium text-gray-700">
    //                 ({review.rating} Sao)
    //               </span>
    //             </div>
    //             <p className="mb-4 text-gray-600">{review.reviewText}</p>
    //             <div className="grid grid-cols-2 gap-4">
    //               {Array.isArray(review.image) && review.image.length > 0 ? (
    //                 <img
    //                   src={`${BASE_URL}/${review.image[0].replace(/\\/g, "/")}`}
    //                   alt="review"
    //                   className="w-40"
    //                 />
    //               ) : typeof review.image === "string" ? (
    //                 <img
    //                   src={`${BASE_URL}/${review.image.replace(/\\/g, "/")}`}
    //                   alt="review"
    //                   className="w-40"
    //                 />
    //               ) : (
    //                 <img src="" alt="Không có hình ảnh" className="w-40" />
    //               )}
    //               {Array.isArray(review.video) && review.video.length > 0 ? (
    //                 <video
    //                   src={`${BASE_URL}/${review.video[0].replace(/\\/g, "/")}`}
    //                   alt="review"
    //                   className="w-40"
    //                   controls // Cho phép người dùng tương tác với video.
    //                   autoPlay // Tự động chạy video khi component được render.
    //                   loop // Lặp lại video khi nó kết thúc.
    //                   muted // Tắt âm thanh để tránh vấn đề với chính sách tự động chạy của trình duyệt.
    //                 />
    //               ) : typeof review.video === "string" ? (
    //                 <video
    //                   src={`${BASE_URL}/${review.video.replace(/\\/g, "/")}`}
    //                   alt="review"
    //                   className="w-40"
    //                   controls // Cho phép người dùng tương tác với video.
    //                   autoPlay // Tự động chạy video khi component được render.
    //                   loop // Lặp lại video khi nó kết thúc.
    //                   muted // Tắt âm thanh để tránh vấn đề với chính sách tự động chạy của trình duyệt.
    //                 />
    //               ) : (
    //                 <video src="" alt="Không có video" className="w-40" />
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </Slider>
    //     ) : (
    //       <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default ReviewForm;
