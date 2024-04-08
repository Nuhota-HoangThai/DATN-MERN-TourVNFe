import {} from "react";

const DescriptionBox = (props) => {
  const { tour } = props;
  return (
    <div className="mb-6 mt-16 w-1/2 rounded-xl bg-gray-100 p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Hướng dẫn viên
      </h1>
      <div className="space-y-3">
        <div className="text-lg text-gray-700">
          <span className="font-semibold">Tên:</span>
          {tour.userGuide.name ? (
            <span> {tour.userGuide.name}</span>
          ) : (
            " Đang cập nhật"
          )}
        </div>
        <div className="text-lg text-gray-700">
          <span className="font-semibold">Điện thoại:</span>
          {tour.userGuide.phone ? (
            <span> {tour.userGuide.phone}</span>
          ) : (
            " Đang cập nhật"
          )}
        </div>
        <div className="text-lg text-gray-700">
          <span className="font-semibold">Địa chỉ:</span>
          {tour.userGuide.address ? (
            <span> {tour.userGuide.address}</span>
          ) : (
            " Đang cập nhật"
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
