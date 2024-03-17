import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import { useSelector } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const TourDisplay = ({ tour }) => {
  // const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.currentUser);
  // Cấu hình cho slider
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

  // add comparisons
  const addComparison = async (tourId) => {
    if (token) {
      axios
        .post(
          `${BASE_URL}/cart/addToCart`,
          {
            itemId: tourId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        )
        .then((response) => {
          console.log(response);

          // const contentType = response.headers.get(
          //   import.meta.env.VITE_CONTENT_TYPE,
          // );
          // if (contentType && contentType.includes("application/json")) {
          //   return response;
          // } else {
          //   return response;
          // }
        })
        .then(() => {
          alert("Thêm vào so sánh thành công");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleBooking = () => {
    navigate("/booking", { state: { tour: tour } });
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          {Array.isArray(tour.image) && tour.image.length > 0 ? (
            tour.image.length > 1 ? (
              <Slider {...settings}>
                {tour.image.map((image, index) => (
                  <div key={index}>
                    <img
                      className="h-[400px] w-full rounded-lg object-cover shadow"
                      src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                      alt={`Tour Image ${index}`}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                className="h-[400px] w-full rounded-lg object-cover shadow"
                src={`${BASE_URL}/${tour.image[0].replace(/\\/g, "/")}`}
                alt="Tour Image"
              />
            )
          ) : (
            <div>Không có hình ảnh</div>
          )}
        </div>

        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
          <div className="px-6 pb-16 pt-4 ">
            <p className="mb-3 line-clamp-2 overflow-hidden text-xl font-semibold transition-colors hover:text-gray-600">
              {tour.nameTour}
            </p>
            <p className="mb-1 text-lg font-medium text-red-600">
              {tour.price.toLocaleString()} đ
            </p>
            <p className="mb-1">
              <span>Khu vực: </span>
              <span className="font-medium">{formatRegion(tour.regions)}</span>
            </p>
            <p className="mb-1">
              <span>Chỗ trống: </span>
              <span className="font-medium">{tour.maxParticipants}</span>
            </p>
            <p className="mb-1">
              <span>Ngày khởi hành: </span>
              <span className="font-medium">
                {formatDateVN(tour.startDate)}
              </span>
            </p>
            <p className="mb-1">
              <span>Ngày kết thúc: </span>
              <span className="font-medium">{formatDateVN(tour.endDate)}</span>
            </p>

            <div className="mt-8  flex items-center gap-5 ">
              <button
                onClick={() => addComparison(tour._id)}
                className=" w-40 rounded bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-center text-white"
              >
                Thêm vào so sánh
              </button>
              <button
                onClick={handleBooking}
                className="w-40 rounded bg-gradient-to-r from-blue-800 to-blue-950 px-4 py-2 text-center text-white"
              >
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
