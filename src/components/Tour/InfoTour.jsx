import {} from "react";
import { PiBarcodeBold } from "react-icons/pi";

const DescriptionBox = (props) => {
  const { tour } = props;

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

  return (
    <div className=" mb-6 mt-16 w-1/2">
      {/*  Dưới trang: Thông tin tour */}
      <div className="space-y-6 rounded-lg bg-white px-8 py-6 shadow-xl">
        <div className="border-b pb-4">
          <p className="flex items-center gap-3 text-lg text-gray-700">
            <PiBarcodeBold className="text-xl" /> {tour._id}
          </p>
        </div>
        <div className="space-y-4">
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
            <span className="font-medium">{formatDateVN(tour.startDate)}</span>
          </p>
          <p className="text-gray-700">
            Ngày kết thúc:{" "}
            <span className="font-medium">{formatDateVN(tour.endDate)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
