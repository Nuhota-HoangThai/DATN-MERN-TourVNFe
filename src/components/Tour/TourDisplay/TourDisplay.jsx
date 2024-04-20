import { BASE_URL } from "../../../utils/config";
import Slider from "react-slick";
import ImageZoom from "react-medium-image-zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./tour-display.css";
import "react-medium-image-zoom/dist/styles.css";

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
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: displayImages.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: displayImages.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: displayImages.length > 1,
        },
      },
    ],
  };

  return (
    <div className="space-y-6 bg-sky-50 px-8 py-6 shadow-xl md:grid md:grid-cols-1 md:gap-6">
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
          <ImageZoom>
            <img
              alt="Tour Main Image"
              src={`${BASE_URL}/${displayImages[0].replace(/\\/g, "/")}`}
              className="h-full w-full object-cover"
            />
          </ImageZoom>
        </div>
      ) : null}

      <div className="">
        <Slider {...settings}>
          {displayImages.map((image, index) => (
            <div key={index} className="p-2">
              <ImageZoom>
                <img
                  alt={`Tour Image ${index + 1}`}
                  src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                  className="h-28 w-40 object-cover"
                />
              </ImageZoom>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TourDisplay;
