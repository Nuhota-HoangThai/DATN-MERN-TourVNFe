import {} from "react";
import { PiBarcodeBold } from "react-icons/pi";

import { formatDateVN, formatDateVNWithTime } from "../../utils/formatDate";
import { formatRegion } from "../../utils/formatRegion";

const DescriptionBox = (props) => {
  const { tour } = props;

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
