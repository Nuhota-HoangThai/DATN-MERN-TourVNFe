import { BASE_URL } from "../../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import "./tour-display.css";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const TourDisplay = ({ tour }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/booking", { state: { tour: tour } });
  };

  const formatPrice = (price) => {
    return <span className="text-red-600">{price?.toLocaleString()} đ</span>;
  };

  if (!tour) {
    return <div>Đang tải...</div>;
  }

  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];
  const displayVideos = Array.isArray(tour.video) ? tour.video.slice(0, 2) : [];

  return (
    <div className="flex flex-col space-y-8 rounded-lg  p-6">
      {/* Đầu trang */}
      <div className="rounded-lg bg-white p-8 shadow-xl md:flex md:items-center md:justify-between">
        <div className="mb-4 flex-1 md:mb-0">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            {tour.nameTour}
          </h1>
          <p className="mt-2 text-xl font-medium  md:mt-4">
            {tour.price !== tour.originalPrice && tour.promotion ? (
              <>
                <span className="text-xl font-semibold text-red-600">
                  {formatPrice(tour.price)}{" "}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(tour.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold">
                {formatPrice(tour.price)}
              </span>
            )}
          </p>
        </div>

        <div className="mx-5 space-y-4">
          <button
            onClick={handleBooking}
            className="mr-5 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-gradient-to-bl md:w-48"
          >
            Đặt ngay
          </button>
          <Link
            to="/contact"
            className="w-full rounded-lg border-2 border-blue-600 px-6 py-3 text-lg font-semibold text-blue-600 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white md:w-48"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </div>

      {/* Giữa trang: Hình ảnh và Video */}
      <div
        className="md:grid md:gap-6"
        style={{
          gridTemplateColumns: displayVideos.length > 0 ? "1fr 1fr" : "1fr",
        }}
      >
        {/* Video */}
        {displayVideos.length > 0 && (
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
        )}

        {/* Hình ảnh */}
        <div
          className={`overflow-hidden ${displayVideos.length > 0 ? "" : "md:col-span-2"}`}
        >
          <div className="grid grid-cols-2 gap-4">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`overflow-hidden ${index % 2 === 0 ? "row-span-3" : "row-span-2"}`}
              >
                <img
                  className="mx-auto h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                  alt={`Tour Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
