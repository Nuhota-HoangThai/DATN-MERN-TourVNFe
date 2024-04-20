import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

import Slider from "react-slick";

const HighRate = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/review/reviews/getAllHightRate/high-rated-reviews`,
        );
        //console.log(data);
        setReviews(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <p>Đang tải trang...</p>;

  return (
    <div className="bg-sky-200 px-20 py-10">
      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="p-4">
              <div className="rounded-lg bg-white shadow-lg">
                <div className="px-6 py-4">
                  <div className="mb-2 text-xl font-bold">
                    {review.userId.name}
                  </div>
                  <p className="text-base font-semibold text-gray-700">
                    {review.rating} điểm
                  </p>
                  <p className="text-sm text-gray-600">{review.reviewText}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Không tìm thấy đánh giá được xếp hạng cao.</p>
      )}
    </div>
  );
};

export default HighRate;
