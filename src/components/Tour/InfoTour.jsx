import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PiBarcodeBold } from "react-icons/pi";

import { BASE_URL } from "../../utils/config";
import { formatDateVN, formatDateVNWithTime } from "../../utils/formatDate";
import { formatRegion } from "../../utils/formatRegion";
import calculateAvgRating from "../../utils/avgRating";
import { formatPrice } from "../../utils/formatPrice";

const DescriptionBox = ({ tour }) => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { avgRating } = calculateAvgRating(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/review/${tour._id}`);
        // console.log(response.data);
        setReviews(response.data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [tour]);

  const handleBooking = () => {
    navigate("/booking", { state: { tour } });
  };

  return (
    <div className="">
      <div className="space-y-6 bg-sky-50 px-4 py-4 shadow-xl sm:px-8 sm:py-8">
        <div className="flex justify-between border-b pb-4">
          <p className="flex items-center gap-3 text-base text-gray-700 sm:text-lg">
            <PiBarcodeBold className="text-xl" /> {tour._id}
          </p>
          <p>
            {avgRating >= 5 && (
              <h1 className="mt-3 w-20 rounded-br-2xl rounded-tl-2xl bg-yellow-500 p-3 text-center text-xl font-bold sm:text-2xl">
                {avgRating} điểm
              </h1>
            )}
          </p>
        </div>

        <h1 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
          {tour.nameTour}
        </h1>

        <div className="">
          <p className="text-lg sm:text-2xl">
            {tour.price !== tour.originalPrice && tour.promotion ? (
              <>
                <span className="font-bold text-red-500">
                  {formatPrice(tour.price)}
                </span>
                <span className="text-gray-500 line-through">
                  {formatPrice(tour.originalPrice)}
                </span>
              </>
            ) : (
              <span className="font-bold text-red-500">
                {formatPrice(tour.price)}
              </span>
            )}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-700 sm:text-base">
            Thời gian tập trung:{" "}
            <span className="font-medium">
              {formatDateVNWithTime(tour.convergeTime)}
            </span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Khu vực:{" "}
            <span className="font-medium">{formatRegion(tour.regions)}</span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Nơi khởi hành:{" "}
            <span className="font-medium">{tour.startingGate}</span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Phương tiện di chuyển:{" "}
            <span className="font-medium">{tour.transport}</span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Số chỗ còn:{" "}
            <span className="font-medium">{tour.maxParticipants}</span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Ngày khởi hành:{" "}
            <span className="font-medium">{formatDateVN(tour.startDate)}</span>
          </p>
          <p className="text-sm text-gray-700 sm:text-base">
            Ngày kết thúc:{" "}
            <span className="font-medium">{formatDateVN(tour.endDate)}</span>
          </p>
          <div className="mx-auto flex justify-start gap-5">
            <button
              onClick={handleBooking}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-gradient-to-bl sm:px-6 sm:py-3 sm:text-lg md:w-48"
            >
              Đặt ngay
            </button>
            <Link
              to="/contact"
              className="w-full rounded-lg border-2 border-blue-600 px-4 py-2 text-center text-base font-semibold text-blue-600 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white sm:px-6 sm:py-3 sm:text-lg md:w-48"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
