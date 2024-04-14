import { BASE_URL } from "../../../utils/config";
import "./tour-display.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourDisplay = ({ tour }) => {
  if (!tour) {
    return <div>Đang tải...</div>;
  }

  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];
  const displayVideos = Array.isArray(tour.video) ? tour.video.slice(0, 2) : [];

  const settings = {
    dots: false,
    slidesToShow: 5,
    infinite: displayImages.length > 5,
    speed: 500,
    slidesToScroll: 1,
    autoplay: displayImages.length > 5,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: displayImages.length >= 3 ? 3 : displayImages.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: displayImages.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: displayImages.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: displayImages.length > 1,
        },
      },
    ],
  };

  return (
    <div className="w-1/2 space-y-6 rounded-xl bg-sky-50 px-8 py-6 shadow-xl md:grid md:grid-cols-1 md:gap-6">
      {/* Kiểm tra nếu có video hoặc không */}
      {displayVideos.length > 0 ? (
        <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg shadow-xl md:mb-0">
          <video
            className="h-full w-full object-cover"
            controls
            autoPlay
            loop
            muted
            src={`${BASE_URL}/${displayVideos[0].replace(/\\/g, "/")}`}
            alt="Tour Main Video"
          />
        </div>
      ) : displayImages.length > 0 ? (
        <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg shadow-xl md:mb-0">
          <img
            className="h-full w-full object-cover"
            src={`${BASE_URL}/${displayImages[0].replace(/\\/g, "/")}`}
            alt="Tour Main Image"
          />
        </div>
      ) : null}

      {/* Hình ảnh */}

      <div className="overflow-hidden rounded-lg">
        {displayImages.length > 6 ? (
          <Slider {...settings}>
            {displayImages.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  className="mx-auto h-full w-full object-cover"
                  src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                  alt={`Tour Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {displayImages.map((image, index) => (
              <img
                key={index}
                className="h-full w-full object-cover"
                src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                alt={`Tour Image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDisplay;
