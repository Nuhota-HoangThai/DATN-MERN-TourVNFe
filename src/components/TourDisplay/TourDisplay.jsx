import { useContext } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TourContext } from "../../context/TourContext";

const TourDisplay = (props) => {
  const { tour } = props;
  const { addToCart } = useContext(TourContext);

  return (
    <div className="container mx-auto my-8 px-4 sm:px-0">
      <div className="bg-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
        <div>
          <h3 className="font-bold text-2xl">{tour.name}</h3>

          <div className="flex text-xl pt-3 items-center">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <CiStar className="text-gray-400" />
            <CiStar className="text-gray-400" />
            <p className="ml-2">(24)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-red-600 font-semibold text-xl">
              {tour.new_price} đ/khách
            </p>
            <p className="text-gray-500 font-medium line-through text-lg">
              {tour.old_price} đ/khách
            </p>
          </div>
          <div>
            <button className="bg-red-500 text-white w-full py-3 rounded mb-2 hover:bg-red-600 transition duration-300">
              Đặt ngay
            </button>
            <button className="bg-blue-400 text-white w-full py-3 rounded hover:bg-blue-500 transition duration-300">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 mt-8">
        <div className="col-span-6 ">
          <img
            className="max-w-full h-auto rounded-lg shadow-lg"
            src={tour.image}
            alt="Hình ảnh tour chính"
          />
        </div>
        <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-1 gap-4">
          <img
            className="w-full h-48 object-cover rounded-lg shadow"
            src={tour.image}
            alt="Hình ảnh tour phụ 1"
          />
          <img
            className="w-full h-48 object-cover rounded-lg shadow"
            src={tour.image}
            alt="Hình ảnh tour phụ 2"
          />
        </div>
        <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-1 gap-4">
          <img
            className="w-full h-48 object-cover rounded-lg shadow"
            src={tour.image}
            alt="Hình ảnh tour phụ 3"
          />
          <img
            className="w-full h-48 object-cover rounded-lg shadow"
            src={tour.image}
            alt="Hình ảnh tour phụ 4"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
        <div className="col-span-2">
          <p className="text-xl font-semibold">Thông tin chi tiết của tour</p>
          <h1 className="">
            <span>Chỗ còn trống: </span>
            {tour.maxGroupSize}
          </h1>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p>Người lớn (Từ 12 tuổi trở lên)</p>
              <p>Trẻ em (Từ 5 - 11 tuổi)</p>
              <p>Trẻ nhỏ (Từ 2 - 4 tuổi)</p>
              <p>Em bé (Dưới 2 tuổi)</p>
              <p>Phụ thu phòng đơn</p>
            </div>
            <div className="flex flex-col justify-between">
              <button
                onClick={() => addToCart(tour.id)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold">Lịch trình</h1>
        {/* Here you can add your itinerary details */}
      </div>
    </div>
  );
};

export default TourDisplay;
