import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import Item from "../Item/Item";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourPromotion = () => {
  const { promotionId } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  // const [selectedTourPromotionId, setSelectedTourPromotionId] = useState("");

  const fetchToursByPromotion = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tour/promotion/${promotionId}`,
      );
      // console.log(response.data.tours);
      setTours(response.data.tours);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/tourPromotion/getAllPromotion`,
      );
      setPromotions(response.data);
      // Tìm khuyến mãi dựa trên promotionId
      const promotion = response.data.find((p) => p._id === promotionId);
      setSelectedPromotion(promotion);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToursByPromotion();
    fetchPromotions();
  }, [promotionId]);

  const settings = {
    dots: false,
    infinite: tours.length > 4,
    speed: 500,
    slidesToShow: 4, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: tours.length > 4,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tours.length >= 3 ? 3 : tours.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: tours.length > 3,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: tours.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: tours.length > 1,
        },
      },
    ],
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="mx-24 my-10">
      {selectedPromotion ? (
        <>
          <div className="mb-8 flex items-center justify-center">
            <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
            <h1
              className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
            >
              {selectedPromotion.namePromotion}
            </h1>
            <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
          </div>
          <div className="my-4 rounded-lg bg-white px-4 py-2 shadow-lg">
            <p
              className="text-lg leading-relaxed"
              style={{
                color: "#4A90E2",
                textShadow: "1px 1px 5px rgba(0,0,0,0.3)",
                fontWeight: "bold",
              }}
            >
              {selectedPromotion.descriptionPromotion}
            </p>
          </div>
          {tours.length > 0 ? (
            <Slider {...settings}>
              {tours.map((item) => (
                <Item key={item._id} {...item} />
              ))}
            </Slider>
          ) : (
            <div className="mt-36 text-center">
              <p className="text-xl font-bold text-gray-800">
                Không có tour nào cho khuyến mãi này
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="mt-36 text-center text-xl font-bold text-gray-800">
          Vui lòng chọn một chương trình khuyến mãi khác!!!
        </p>
      )}
    </div>
  );
};

export default TourPromotion;
