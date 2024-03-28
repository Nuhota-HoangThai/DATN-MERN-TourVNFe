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
      console.log(response.data.tours);
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
    dots: true,
    infinite: tours.length > 3,
    speed: 500,
    slidesToShow: 3, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: tours.length > 3,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tours.length >= 3 ? 3 : tours.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: tours.length > 3,
          dots: true,
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
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="mx-24 mb-10 mt-28">
      {selectedPromotion ? (
        <>
          <h2 className="my-1 text-center text-3xl font-bold">
            {selectedPromotion.namePromotion}
          </h2>{" "}
          <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>{" "}
          {tours.length > 0 ? (
            <Slider {...settings}>
              {tours.map((item) => (
                <Item key={item._id} {...item} />
              ))}
            </Slider>
          ) : (
            <p>No tours available for this promotion.</p>
          )}
        </>
      ) : (
        <p>Không tìm thấy khuyến mãi.</p>
      )}
    </div>
  );
};

export default TourPromotion;
