import { useContext } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TourContext } from "../../context/TourContext";
import { FaOpencart } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BASE_URL } from "../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourDisplay = (props) => {
  const { tour } = props;
  const { addToCart } = useContext(TourContext);

  // Cấu hình cho slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };

  if (!tour) {
    return <div>Loading...</div>; // Hoặc một thông báo lỗi/phản hồi phù hợp
  }

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {Array.isArray(tour.image) && tour.image.length > 1 ? (
            <Slider {...settings}>
              {tour.image.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-full h-[400px] object-cover rounded-lg shadow"
                    src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                    alt={`Tour Image ${index}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              className="w-full h-[400px] object-cover rounded-lg shadow"
              src={`${BASE_URL}/${tour.image[0].replace(/\\/g, "/")}`}
              alt="Tour Image"
            />
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-2xl mb-2 text-indigo-900">
            {tour.nameTour}
          </h3>

          <p className="text-red-600 font-bold text-xl">
            {tour.price.toLocaleString()} đ
            <span className="text-indigo-800 text-base font-normal">
              /khách
            </span>
          </p>

          <div className="mt-4">
            <button
              onClick={() => addToCart(tour.id)}
              className="flex justify-center items-center bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded"
            >
              Thêm vào so sánh
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-semibold">Lịch trình</h1>
      </div>
    </div>
  );
};

export default TourDisplay;
