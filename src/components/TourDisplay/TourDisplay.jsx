import { useContext } from "react";
import { TourContext } from "../../context/TourContext";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourDisplay = (props) => {
  const { tour } = props;
  const { addToCart, allTour } = useContext(TourContext);
  const navigate = useNavigate();

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
    arrows: false,
  };

  const handleBooking = () => {
    const tourData = allTour.find((tour) => tour._id === tour._id);

    navigate("/booking", { state: { tour: tourData } });
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-4 px-4 sm:px-6 lg:px-8 py-10 ">
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

          <div className="mt-4  flex gap-5 items-center ">
            <button
              onClick={() => addToCart(tour._id)}
              className=" w-40 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2 px-4 rounded"
            >
              Thêm vào so sánh
            </button>
            <button
              onClick={handleBooking}
              className="text-center w-40 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-2 px-4 rounded"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
