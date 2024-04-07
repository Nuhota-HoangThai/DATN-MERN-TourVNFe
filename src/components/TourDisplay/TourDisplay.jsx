import { BASE_URL } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import "./tour-display.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  const formatPrice = (price) => {
    return <span className="text-red-600">{price?.toLocaleString()} đ</span>;
  };

  if (!tour) {
    return <div>Đang tải...</div>;
  }

  const displayImages = Array.isArray(tour.image) ? tour.image.slice(0, 6) : [];
  const displayVideos = Array.isArray(tour.video) ? tour.video.slice(0, 2) : [];

  // const sliderSettings = {
  //   dots: false,
  //   // infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   infinite: displayImages.length > 1,
  //   autoplay: displayImages.length > 1,
  //   autoplaySpeed: 1500,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: false,
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="flex flex-col space-y-8 rounded-lg bg-gray-100 p-6">
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
      <div className="md:grid md:grid-cols-2 md:gap-6">
        {/* Video */}
        <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg shadow-xl md:mb-0">
          {Array.isArray(displayVideos) && displayVideos.length > 0 && (
            <video
              className="h-full w-full object-cover"
              controls
              autoPlay
              loop
              muted
              src={`${BASE_URL}/${displayVideos[0].replace(/\\/g, "/")}`}
              alt="Tour Main Video"
            />
          )}
        </div>

        {/* Hình ảnh */}
        <div className="overflow-hidden ">
          <div className="grid grid-cols-2 gap-4 ">
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

      {/* Dưới trang: Thông tin tour */}
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

export default TourDisplay;

{
  /* <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-xl">
          <div className="space-y-4">
          
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              {Array.isArray(displayVideos) && displayVideos.length > 0 && (
                <video
                  className="h-full w-full object-cover"
                  controls // Cho phép người dùng tương tác với video.
                  autoPlay // Tự động chạy video khi component được render.
                  loop // Lặp lại video khi nó kết thúc.
                  muted // Tắt âm thanh để tránh vấn đề với chính sách tự động chạy của trình duyệt.
                  src={`${BASE_URL}/${displayVideos[0].replace(/\\/g, "/")}`}
                  alt="Tour Main Video"
                />
              )}
            </div>
          
            <div className="h-full overflow-hidden rounded-lg">
              {displayImages.length === 1 ? (
                <div className="image-grid-item">
                  <img
                    className="mx-auto h-[300px]"
                    src={`${BASE_URL}/${displayImages[0].replace(/\\/g, "/")}`}
                    alt="Tour Image"
                  />
                </div>
              ) : displayImages.length > 1 ? (
                <Slider {...sliderSettings} className="">
                  {displayImages.map((image, index) => (
                    <div key={index} className="image-grid-item">
                      <img
                        className="mx-auto h-[300px]"
                        src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                        alt={`Tour Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="col-span-2 flex h-full items-center justify-center">
                  Không có hình ảnh
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-xl">
          <p className="flex items-center gap-3 text-sm text-gray-700 md:text-base">
            <PiBarcodeBold className="text-xl" /> {tour._id}
          </p>
          <p className="text-xl font-semibold text-gray-800">{tour.nameTour}</p>
           <p>{tour?.promotion?.discountPercentage}%</p> 
          <p className="text-lg font-medium text-red-600">
            {tour.price !== tour.originalPrice && tour.promotion ? (
              <>
                <span className="text-red-600">{formatPrice(tour.price)} </span>
                <span className="text-base text-gray-500 line-through">
                  {formatPrice(tour.originalPrice)}
                </span>
              </>
            ) : (
              formatPrice(tour.price)
            )}
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
      </div> */
}
