import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import "./tour-display.css";

import { PiBarcodeBold } from "react-icons/pi";

const TourDisplay = ({ tour }) => {
  const navigate = useNavigate();

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
    return `${hours}:${minutes} ngày ${day}/${month}/${year} `;
  };

  const handleBooking = () => {
    navigate("/booking", { state: { tour: tour } });
  };

  if (!tour) {
    return <div>Đang tải...</div>;
  }

  // Selecting up to first 4 images to display
  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];

  return (
    <div className="mx-auto max-h-[600px] w-full">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <div className="image-grid-container min-h-[600px] w-full rounded-lg bg-white shadow-2xl">
          {displayImages.length > 0 ? (
            displayImages.map((image, index) => (
              <div key={index} className="image-grid-item">
                <img
                  src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                  alt={`Tour Image ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 flex h-full items-center justify-center">
              Không có hình ảnh
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg bg-white p-6 shadow-2xl">
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
