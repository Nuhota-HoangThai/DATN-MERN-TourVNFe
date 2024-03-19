import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiBarcodeBold } from "react-icons/pi";

const TourDisplay = ({ tour }) => {
  const navigate = useNavigate();

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

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatRegion = (region) => {
    switch (region) {
      case "mn":
        return "miền Nam";
      case "mb":
        return "miền Bắc";
      case "mt":
        return "miền Trung";
      default:
        return "Không xác định";
    }
  };

  const formatDateVNWithTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleBooking = () => {
    navigate("/booking", { state: { tour: tour } });
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-full">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <div className="slider-container w-full" style={{ minHeight: "600px" }}>
          {Array.isArray(tour.image) && tour.image.length > 0 ? (
            tour.image.length > 1 ? (
              <Slider {...settings}>
                {tour.image.map((image, index) => (
                  <div
                    key={index}
                    className="h-full w-full overflow-hidden rounded-lg shadow-lg"
                    style={{ minHeight: "600px" }} // Ensure minimum height for the slider item
                  >
                    <img
                      className="h-full w-full object-cover" // Adjust here to ensure aspect ratio is maintained
                      src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                      alt={`Tour Image ${index}`}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div
                style={{ minHeight: "600px" }}
                className="h-full w-full overflow-hidden rounded-lg shadow"
              >
                <img
                  className="h-full w-full object-cover"
                  src={`${BASE_URL}/${tour.image[0].replace(/\\/g, "/")}`}
                  alt="Tour Image"
                />
              </div>
            )
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{ minHeight: "600px" }}
            >
              Không có hình ảnh
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
          <p className="flex items-center gap-3 text-sm text-gray-700 md:text-base">
            <PiBarcodeBold className="text-xl" /> {tour._id}
          </p>
          <p className="text-xl font-semibold text-gray-800">{tour.nameTour}</p>
          <p className="text-lg font-medium text-red-600">
            {tour.price.toLocaleString()} đ
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              Thời gian tập trung:{" "}
              <span className="font-medium">
                {formatDateVNWithTime(tour.convergeTime)}
              </span>
            </p>
            <p className="text-gray-700">
              Khu vực:{" "}
              <span className="font-medium">{formatRegion(tour.regions)}</span>
            </p>
            <p className="text-gray-700">
              Nơi khởi hành:{" "}
              <span className="font-medium">{tour.startingGate}</span>
            </p>
            <p className="text-gray-700">
              Số chỗ còn:{" "}
              <span className="font-medium">{tour.maxParticipants}</span>
            </p>
            <p className="text-gray-700">
              Ngày khởi hành:{" "}
              <span className="font-medium">
                {formatDateVN(tour.startDate)}
              </span>
            </p>
            <p className="text-gray-700">
              Ngày kết thúc:{" "}
              <span className="font-medium">{formatDateVN(tour.endDate)}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBooking}
              className="flex-1 rounded bg-gradient-to-r from-blue-500 to-blue-700 py-3 text-center font-semibold text-white hover:bg-blue-600"
            >
              Đặt ngay
            </button>
            <Link
              to="/contact"
              className="flex-1 rounded border border-blue-500 py-3 text-center font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
