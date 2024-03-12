import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourDisplay = ({ tour }) => {
  // const [tour, setTour] = useState(null);
  const navigate = useNavigate();

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

  // add comparisons
  const addComparison = async (tourId) => {
    if (localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN)) {
      fetch(`${BASE_URL}/cart/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          [import.meta.env.VITE_AUTH_TOKEN]: localStorage.getItem(
            import.meta.env.VITE_AUTH_TOKEN
          ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: tourId,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          const contentType = response.headers.get(
            import.meta.env.VITE_CONTENT_TYPE
          );
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
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
    <div className="container mx-auto my-4 px-4 sm:px-6 lg:px-8 py-10 ">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {Array.isArray(tour.image) && tour.image.length > 0 ? (
            tour.image.length > 1 ? (
              <Slider {...settings}>
                {tour.image.map((image, index) => (
                  <div key={index}>
                    <img
                      className="w-full h-[400px] object-cover rounded-lg shadow"
                      src={`${BASE_URL}/${image.replace(/\\/g, "/")}`}
                      alt={`Tour Image ${index}`}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                className="w-full h-[400px] object-cover rounded-lg shadow"
                src={`${BASE_URL}/${tour.image[0].replace(/\\/g, "/")}`}
                alt="Tour Image"
              />
            )
          ) : (
            <div>No Image Available</div>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-2xl mb-2 text-indigo-900">
            {tour.nameTour}
          </h3>

          <p className="text-red-600 font-bold text-xl">
            {tour.price} đ
            <span className="text-indigo-800 text-base font-normal">
              /khách
            </span>
          </p>

          <div className="mt-4  flex gap-5 items-center ">
            <button
              onClick={() => addComparison(tour._id)}
              className=" w-40 bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2 px-4 rounded"
            >
              Thêm vào so sánh
            </button>
            <button
              onClick={handleBooking}
              className="text-center w-40 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-2 px-4 rounded"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
